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
    <section className="border border-white/10 bg-[#B80000] p-6 shadow-sm ">
      <div className="grid md:grid-cols-3">
        
      <div className="flex flex-col-reverse md:flex-col justify-between">  
      <div>
        <p className="text-sm text-white mt-2 ">
          {formattedDate}
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
          {greeting} 👋
        </h1>
      </div>
      </div>
   </div>
    </section>
  );
}