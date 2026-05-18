import { useEffect, useState } from "react";

type Player = {
  athlete: {
    displayName: string;
  };

  score: string;
  status: {
    type: {
      shortDetail: string;
    };
  };
};

type PGAData = {
  tournament: string;

  top5: Player[];

  swedes: Player[];
};

export default function PGATourWidget() {
  const [data, setData] =
    useState<PGAData | null>(null);

  async function fetchPGA() {
    try {
      const response = await fetch(
        "http://localhost:3001/api/pga-tour"
      );

      const data = await response.json();

      console.log(data);

      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPGA();
  }, []);

  if (!data) {
    return (
      <div className="rounded-3xl bg-zinc-900 p-6 text-white">
        Loading PGA...
      </div>
    );
  }

  return (
    <div className="rounded-3xl  bg-white p-6 text-[#7c9a92] shadow-2xl">
      {/* HEADER */}
      <div className="">
        <p className="text-sm text-[#7c9a92]">
          {data.tournament}
        </p>
        <h2 className="text-2xl mt-2 font-bold">
          PGA TOUR
        </h2>
      </div>

      {/* TOP 5 */}
      <div className="mt-2">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#7c9a92]">
          Top 5
        </h3>

        <div className="space-y-1">
          {data.top5.map(
            (player, index) => (
              <div
                key={`${player.athlete.displayName}-${index}`}
                className="flex items-center justify-between rounded-2xl bg-[#7c9a92]/10 px-4 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 text-zinc-500">
                    {index + 1}
                  </span>

                  <span className="font-medium text-sm">
                    {
                      player.athlete
                        .displayName
                    }
                  </span>
                </div>

                <span className="text-sm font-bold">
                  {player.score}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* SWEDES */}
      <div>
        <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-yellow-500">
          Svenska spelare
        </h3>

        <div className="space-y-2">
          {data.swedes.map(
            (player, index) => (
              <div
                key={`${player.athlete.displayName}-${index}`}
                className="flex items-center justify-between rounded-2xl bg-yellow-500/10 px-4 py-3 ring-1 ring-yellow-500/20 mt-2"
              >
                <span className="font-medium text-sm">
                  {
                    player.athlete
                      .displayName
                  }
                </span>

                <span className="text-sm font-bold">
                  {player.score}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}