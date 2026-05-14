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

      body: "grant_type=client_credentials",
    }
  );

  const data = await response.json();

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

app.listen(3001, () => {
  console.log(
    "Västtrafik server running on :3001"
  );
});