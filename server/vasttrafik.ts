import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

const CLIENT_ID =
  process.env.VASTTRAFIK_CLIENT_ID!;

const CLIENT_SECRET =
  process.env.VASTTRAFIK_CLIENT_SECRET!;


async function getAccessToken() {
  const response = await fetch(
  "https://ext-api.vasttrafik.se/token",
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/x-www-form-urlencoded",

      Authorization:
        "Basic " +
        Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64"),
    },

    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  }
);
const data = await response.json();

console.log(data);

return data.access_token;
}

app.get("/departures", async (_, res) => {
  try {
    const token = await getAccessToken();

   const stopId = "9021014005110000";

    const response = await fetch(
      `https://ext-api.vasttrafik.se/pr/v4/stop-areas/${stopId}/departures?limit=6`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Kunde inte hämta avgångar",
    });
  }
});

app.get("/api/arsenal/match", async (_, res) => {
  try {
    const response = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=133604"
    );

    const data = await response.json();

    res.json(data.events[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Could not fetch match",
    });
  }
});
app.get(
  "/api/arsenal/last-match",
  async (_, res) => {
    try {
      const response = await fetch(
        "https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=133604"
      );

      const data =
        await response.json();

      const match =
        data.results?.[0];

      if (!match) {
        return res.json(null);
      }

      res.json(match);
    } catch (error) {
      console.error(error);

      res.status(500).json(null);
    }
  }
);

function getPremierLeagueSeason() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();

  // Augusti = ny säsong
  if (month >= 7) {
    return `${year}-${year + 1}`;
  }

  return `${year - 1}-${year}`;
}

const season =
  getPremierLeagueSeason();

app.get(
  "/api/premier-league/table",
  async (_, res) => {
    try {
      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=${season}`
      );

      const data =
        await response.json();

      res.json(data.table);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error:
          "Could not fetch table",
      });
    }
  }
);

app.get("/api/pga-tour", async (_, res) => {
  try {
    const response = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard"
    );

    const data = await response.json();

    const tournament =
      data.events?.[0];

    if (!tournament) {
      return res.status(404).json({
        error: "No tournament found",
      });
    }

    const competitors =
      tournament.competitions?.[0]
        ?.competitors || [];

    const top5 =
      competitors.slice(0, 3);

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
  competitors.filter((player: any) => {
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
  });

    res.json({
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
});

app.listen(3001, () => {
  console.log(
    "Västtrafik server running on :3001"
  );
});