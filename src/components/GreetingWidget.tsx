import { useMemo } from "react";
import WorldCupHero from "./WorldCupHero";

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
    <section className="border border-white/10 bg-[#030730] p-6 shadow-sm ">
      <div className="grid md:grid-cols-3">
        
      <div className="flex flex-col-reverse md:flex-col justify-between">  
        <div>
            <h1 className="mt-2 text-2xl font-black text-yellow-700"> FIFA WORLD CUP - 2026 </h1>
        </div>
      <div>
        <p className="text-sm text-white mt-2 ">
          {formattedDate}
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
          {greeting} 👋
        </h1>
      </div>
      </div>
      <div className="col-span-2">
         <WorldCupHero></WorldCupHero>
         </div>
</div>
   
    </section>
  );
}