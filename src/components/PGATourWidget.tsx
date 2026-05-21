import { useEffect, useState } from "react";

type Player = {
  athlete: {
    displayName: string;
  };

  score: string;

  linescores?: {
    value: number;
  }[];

  curatedRank?: {
    current: number;
  };

  status?: {
    type?: {
      shortDetail?: string;
    };
  };

  statistics?: {
    displayValue: string;
  }[];
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

 function getPosition(player: any) {
  if (
    player.curatedRank?.current
  ) {
    return `${player.curatedRank.current}`;
  }

  if (player.rank) {
    return `${player.rank}`;
  }

  if (player.order) {
    return `${player.order}`;
  }

  return "—";
}

function getRoundScore(player: Player) {
  return (
    player.linescores?.[
      player.linescores.length - 1
    ]?.value ?? "-"
  );
}

function getThru(player: Player) {
  return (
    player.status?.type
      ?.shortDetail || "-"
  );
}

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
                className="grid grid-cols-[40px_1fr_50px_50px_50px] items-center rounded-2xl bg-[#7c9a92]/10 px-4 py-2"
              >
                <div className="font-bold text-zinc-500">
                    {getPosition(player)}
                    </div>

                    <div className="font-medium">
                    {player.athlete.displayName}
                    </div>

                    <div className="text-center text-sm text-zinc-400">
                    R{getRoundScore(player)}
                    </div>

                    <div className="text-center text-sm text-zinc-400">
                    {getThru(player)}
                    </div>

                    <div className="text-right text-sm font-black">
                    {player.score}
                    </div>
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
                className="grid grid-cols-[40px_1fr_50px_50px_50px] items-center rounded-2xl bg-yellow-500/10 px-4 py-3 ring-1 ring-yellow-500/20 mt-2"
              >
                 <div className="font-bold text-yellow-500">
                    {getPosition(player)}
                </div>

                <div className="font-medium text-sm">
                    {player.athlete.displayName}
                </div>

                <div className="text-center text-sm text-zinc-300">
                    R{getRoundScore(player)}
                </div>

                <div className="text-center text-sm text-zinc-300">
                    {getThru(player)}
                </div>

                <div className="text-right text-sm font-black">
                    {player.score}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}