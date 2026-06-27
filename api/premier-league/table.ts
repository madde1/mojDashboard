import type { VercelRequest, VercelResponse } from "@vercel/node";

function getSeason() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();

  return month >= 7
    ? `${year}-${year + 1}`
    : `${year - 1}-${year}`;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const season = getSeason();

    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=${season}`
    );

    const data = await response.json();

    res.status(200).json(data.table);
  } catch {
    res.status(500).json({
      error: "Could not fetch table",
    });
  }
}