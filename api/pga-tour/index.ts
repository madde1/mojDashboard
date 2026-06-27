import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const response = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard"
    );

    const data =
      await response.json();

    const tournament =
      data.events?.[0];

    if (!tournament) {
      return res.status(404).json({
        error:
          "No tournament found",
      });
    }

    const competitors =
      tournament.competitions?.[0]
        ?.competitors || [];

    const top5 =
      competitors.slice(0, 5);

    const swedishPlayers = [
      "Ludvig Åberg",
      "Alex Noren",
      "Jesper Svensson",
      "Henrik Norlander",
      "Mikael Lindberg",
      "Vincent Norrman",
      "David Lingmerth",
      "Henrik Stenson",
    ];

    const swedes =
      competitors.filter(
        (player: any) => {
          const name =
            player.athlete
              ?.displayName || "";

          return swedishPlayers.some(
            (swede) =>
              name
                .toLowerCase()
                .includes(
                  swede.toLowerCase()
                )
          );
        }
      );

    res.status(200).json({
      tournament:
        tournament.name,
      top5,
      swedes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error:
        "Could not fetch PGA data",
    });
  }
}