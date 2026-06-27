import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const response = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=133604"
    );

    const data = await response.json();

    res.status(200).json(data.results?.[0] ?? null);
  } catch {
    res.status(500).json(null);
  }
}