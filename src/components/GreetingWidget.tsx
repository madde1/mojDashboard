
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
  const isChristmas = today.getMonth() === 11;

  return (
    <section
      className={`relative overflow-hidden  p-7 shadow-sm ${
        isBirthday
          ? "border-pink-300/30 bg-gradient-to-br from-[#7c245e] via-[#733b91] to-[#30265f]"
          : isChristmas
            ? "border-amber-200/20 bg-gradient-to-br from-[#102f29] via-[#174438] to-[#092b25]"
            : "border-white/10 bg-[#B80000]"
      }`}
    >
      {/* Dekorativt sken */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      {isChristmas && !isBirthday && (
        <>
          <div className="pointer-events-none absolute right-8 top-6 text-2xl text-amber-100/70">
            ✦
          </div>
          <div className="pointer-events-none absolute right-28 top-12 text-sm text-white/60">
            ❄
          </div>
          <div className="pointer-events-none absolute bottom-6 right-8 text-5xl opacity-80">
            🎄
          </div>
          <div className="pointer-events-none absolute bottom-8 right-28 text-xl text-amber-200/70">
            ✨
          </div>
        </>
      )}

      {isBirthday && (
        <div className="pointer-events-none absolute bottom-5 right-8 text-5xl">
          🎂
        </div>
      )}

      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-amber-300/70" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
            {isBirthday ? "En speciell dag" : isChristmas ? "Julstämning" : "Välkommen hem"}
          </p>
        </div>

        <p className="mt-5 text-sm font-medium capitalize text-white/70">
          {formattedDate}
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {greeting} <span className="text-amber-200">👋</span>
        </h1>

        {isBirthday ? (
          <div className="mt-5">
            <p className="text-2xl font-bold text-white">
              🎉 Hurra!
            </p>
            <p className="mt-1 text-lg text-white/90">
              Idag fyller {birthdaysToday.map((b) => b.name).join(" och ")} år!
            </p>
            <p className="mt-2 text-sm text-white/70">
              Vi hoppas på en fantastisk födelsedag!
            </p>
          </div>
        ) : isChristmas ? (
          <div className="mt-5">
            <p className="text-lg font-medium text-white">
              Julen närmar sig
            </p>
            <p className="mt-1 text-sm text-amber-100/70">
              Ta en kopp glögg och njut av december ✨
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-white/70">
            Ha en riktigt fin dag!
          </p>
        )}

        {isChristmas && !isBirthday && (
          <div className="mt-6 flex items-center gap-2">
            <div className="h-1 w-10 rounded-full bg-amber-300/80" />
            <div className="h-1 w-3 rounded-full bg-white/30" />
            <div className="h-1 w-3 rounded-full bg-white/30" />
          </div>
        )}
      </div>
    </section>
  );
}
