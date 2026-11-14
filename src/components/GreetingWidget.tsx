import { useMemo } from "react";
import birthdays from "../../data/birthdays.json";

export function GreetingCard() {
  const today = new Date();

  const greeting = useMemo(() => {
    const hour = today.getHours();

    if (hour < 10) return "God morgon";
    if (hour < 18) return "God dag";

    return "God kväll";
  }, []);

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat("sv-SE", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(today);
  }, []);

  const todayKey = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const birthdaysToday = birthdays.filter(
    (birthday) => birthday.date === todayKey
  );

  const isBirthday = birthdaysToday.length > 0;

  return (
    <section
      className={`relative overflow-hidden border border-white/10 p-6 shadow-sm ${
        isBirthday
          ? "bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"
          : "bg-[#B80000]"
      }`}
    >
      <div className="grid md:grid-cols-3">
        <div className="flex flex-col-reverse justify-between md:flex-col">
          <div>
            <p className="mt-2 text-sm text-white">
              {formattedDate}
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {greeting} 👋
            </h1>

            {isBirthday && (
              <div className="mt-5">
                <p className="text-2xl font-bold text-white">
                  🎉 Hurra!
                </p>

                <p className="mt-1 text-lg text-white">
                  Idag fyller {birthdaysToday.map((b) => b.name).join(" och ")} år!
                </p>

              </div>
            )}
          </div>
        </div>
      </div>

      {isBirthday && (
        <div className="pointer-events-none absolute right-6 top-4 text-5xl opacity-80">
          🎂
        </div>
      )}
    </section>
  );
}