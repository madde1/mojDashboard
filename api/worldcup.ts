import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const worldCupStart = new Date("2026-06-11");
    const now = new Date();

    // Före VM - visa kommande matcher
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

    // Under VM - visa dagens matcher
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${today}&s=Soccer`
    );

    const data = await response.json();

    const worldCupMatches =
      data.events?.filter(
        (match: any) =>
          match.idLeague === "4429"
      ) || [];

    return res.status(200).json({
      mode: "today",
      matches: worldCupMatches,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Could not fetch World Cup",
    });
  }
}