import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const response = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=133604"
    );

    const data = await response.json();

    res.status(200).json(data.events[0]);
  } catch (error) {
    res.status(500).json({
      error: "Could not fetch match",
    });
  }
}