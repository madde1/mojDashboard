import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const worldCupStart = new Date("2026-06-11");
    const now = new Date();

    // Före VM
    if (now < worldCupStart) {
      const response = await fetch(
        "https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4429"
      );

      const data = await response.json();

      return res.status(200).json({
        mode: "next",
        matches: data.events?.slice(0, 5) || [],
      });
    }

    // Svenskt datum
    const today = now
      .toLocaleDateString("sv-SE")
      .replaceAll("/", "-");

    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${today}&s=Soccer`
    );

    const data = await response.json();

    // Bara VM-matcher
    let matches =
      data.events?.filter(
        (match: any) =>
          match.idLeague === "4429"
      ) || [];

    // Visa bara matcher som inte startat ännu
    matches = matches.filter(
      (match: any) =>
        new Date(match.strTimestamp) > now
    );

    // Om dagens matcher är slut -> visa morgondagens
    if (matches.length === 0) {
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);

      const tomorrowString = tomorrow
        .toLocaleDateString("sv-SE")
        .replaceAll("/", "-");

      const tomorrowResponse =
        await fetch(
          `https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${tomorrowString}&s=Soccer`
        );

      const tomorrowData =
        await tomorrowResponse.json();

      matches =
        tomorrowData.events?.filter(
          (match: any) =>
            match.idLeague === "4429"
        ) || [];
    }

    return res.status(200).json({
      mode: "today",
      matches,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error:
        "Could not fetch World Cup",
    });
  }
}