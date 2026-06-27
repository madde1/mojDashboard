import type { VercelRequest, VercelResponse } from "@vercel/node";

const CLIENT_ID = process.env.VASTTRAFIK_CLIENT_ID!;
const CLIENT_SECRET = process.env.VASTTRAFIK_CLIENT_SECRET!;

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

  return data.access_token;
}

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const token = await getAccessToken();

    const response = await fetch(
      "https://ext-api.vasttrafik.se/pr/v4/stop-areas/9021014005110000/departures?limit=5",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch {
    res.status(500).json({
      error: "Could not fetch departures",
    });
  }
}