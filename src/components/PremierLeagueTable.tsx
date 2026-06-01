import { useEffect, useState } from "react";
import { FaFutbol } from "react-icons/fa";

type Team = {
  idTeam: string;

  strTeam: string;
  strBadge: string;

  intPlayed: string;
  intGoalDifference: string;
  intWin: string;

  intPoints: string;
};

export default function PremierLeagueTableWidget() {
    const currentSeason =
  new Date().getMonth() >= 7
    ? `${new Date().getFullYear()} / ${
        new Date().getFullYear() + 1
      }`
    : `${new Date().getFullYear() - 1} / ${
        new Date().getFullYear()
      }`;
  const [table, setTable] = useState<
    Team[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  async function fetchTable() {
    try {
      const response = await fetch(
        "http://localhost:3001/api/premier-league/table"
      );

      const data = await response.json();

      console.log(data);

      setTable(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  fetchTable();

  const interval = setInterval(() => {
    fetchTable();
  }, 1000 * 60 * 15);

  return () => clearInterval(interval);
}, []);

  if (loading) {
    return (
      <div className="rounded-3xl border p-6 text-[#7c9a92]">
        Loading table...
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 text-[#7c9a92] shadow-2xl">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
        <p className="text-sm text-[#7c9a92]">
           Säsong {currentSeason}
          </p>
          <h2 className="text-2xl font-bold mt-2">
            Premier League
          </h2>
          
        </div>
        <div className="rounded-2xl bg-stone-100 p-3">
          <FaFutbol size={24} />
       </div>
      </div>

      {/* TABLE HEADER */}
      <div className="mb-2 grid grid-cols-[40px_1fr_40px_40px_40px_50px] items-center border-b border-zinc-800 pb-2 text-xs uppercase tracking-wide text-zinc-500">
        <div>#</div>

        <div>Team</div>

        <div className="text-center">
          P
        </div>

        <div className="text-center">
          GD
        </div>

        <div className="text-center">
          W
        </div>

        <div className="text-center">
          PTS
        </div>
      </div>

      {/* TEAMS */}
      <div className="space-y-2">
        {table.map((team, index) => {
          const isArsenal =
            team.strTeam === "Arsenal";

          return (
            <div
            key={`${team.strTeam}-${index}`}
              className={`grid grid-cols-[40px_1fr_40px_40px_40px_50px] items-center rounded-2xl px-3 py-3 transition-all ${
                isArsenal
                  ? "bg-red-500/15 ring-1 ring-red-500/30"
                  : "bg-[#7c9a92]/50"
              }`}
            >
              {/* POSITION */}
              <div className="font-bold text-[#7c9a92]">
                {index + 1}
              </div>

              {/* TEAM */}
              <div className="flex items-center gap-3">
                {team.strBadge && (
                  <img
                    src={team.strBadge}
                    alt={team.strTeam}
                    className="h-7 w-7 object-contain"
                  />
                )}

                <span
                  className={`font-medium text-sm ${
                    isArsenal
                      ? "text-red-400"
                      : "text-zinc-700"
                  }`}
                >
                  {team.strTeam}
                </span>
              </div>

              {/* PLAYED */}
              <div className="text-center text-sm text-zinc-700">
                {team.intPlayed}
              </div>

              {/* GOAL DIFF */}
              <div className="text-center text-sm text-zinc-700">
                {team.intGoalDifference}
              </div>

              {/* WINS */}
              <div className="text-center text-sm text-zinc-700">
                {team.intWin}
              </div>

              {/* POINTS */}
              <div className="text-center text-lg font-bold">
                {team.intPoints}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}