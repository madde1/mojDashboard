import { CalendarDays, Plus } from "lucide-react";

const events = [
  {
    time: "10:00",
    title: "BVC",
  },
  {
    time: "13:00",
    title: "Handla",
  },
  {
    time: "17:30",
    title: "Middag hos mamma",
  },
];

export function TodayWidget() {
  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
        ring-1
        ring-black/5
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#7c9a92]">
            Kalender
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#7c9a92]">
            Idag
          </h2>
        </div>

        <div className="rounded-2xl bg-stone-100 p-3">
          <CalendarDays className="h-6 w-6 text-[#7c9a92]" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {events.map((event) => (
          <div
            key={event.time}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              bg-stone-50
              px-4
              py-3
            "
          >
            <span className="text-sm text-[#7c9a92]">
              {event.time}
            </span>

            <span className="font-medium text-zinc-700">
              {event.title}
            </span>
          </div>
        ))}
      </div>

      <button
        className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-stone-100
          py-3
          text-sm
          font-medium
          text-[#7c9a92]
          transition-colors
          hover:bg-stone-200
        "
      >
        <Plus className="h-4 w-4" />
        Lägg till aktivitet
      </button>
    </section>
  );
}