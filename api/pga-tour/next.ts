import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const response = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/golf/pga/summary"
    );

    const data =
      await response.json();

    res.status(200).json({
      name:
        data?.header?.season?.type
          ?.name ||
        "Next Tournament",

      date:
        data?.header
          ?.competitions?.[0]
          ?.date || null,

      venue:
        data?.header
          ?.competitions?.[0]
          ?.venue
          ?.fullName || "",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json(null);
  }
}