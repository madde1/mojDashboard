import { useMemo } from "react";

export function GreetingCard() {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 10) return "God morgon";
    if (hour < 18) return "God dag";

    return "God kväll";
  }, []);

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat("sv-SE", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date());
  }, []);

  return (
    <section className="mt-10 border border-white/10 bg-white p-6 shadow-sm ">
      <p className="text-sm text-zinc-700">
        {formattedDate}
      </p>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#7c9a92]">
        {greeting} 👋
      </h1>
    </section>
  );
}