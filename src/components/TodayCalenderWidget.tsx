import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";


export function TodayWidget() {
  const [events, setEvents] = useState([
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
]);

const [isOpen, setIsOpen] = useState(false);
const [title, setTitle] = useState("");
const [time, setTime] = useState("");

function addEvent() {
  if (!title || !time) return;

  const newEvent = {
    id: Date.now(),
    title,
    time,
  };

  setEvents((prev) => [...prev, newEvent]);

  setTitle("");
  setTime("");
  setIsOpen(false);
}
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
            className=" flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
            <span className="text-sm text-[#7c9a92]">
              {event.time}
            </span>

            <span className="font-medium text-zinc-700 capitalize">
              {event.title}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={()=> setIsOpen(true)}
        className="cursor-pointer mt-6 flex w-full items-center justify-center gap-2 rounded-2xlbg-stone-100 py-3 text-sm font-medium rounded-full text-white bg-[#7c9a92] transition-colors hover:bg-stone-200 ">
        <Plus className="h-4 w-4" />
        Lägg till aktivitet
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 items-center justify-center flex bg-black/50">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6">
            <h2 className="text-xl font-semibold text-[#7c9a92]">Ny aktivitet</h2>
            <div className="mt-6 space-y-4">
              <input type="text" placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-2xl bg-stone-100 px-4 py-3 outline-none" />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-2xl bg-stone-100 px-4 py-3 outline-none" />
              <div className="flex justify-end gap-4">
                <button onClick={() => setIsOpen(false)} className="cursor-pointer px-4 py-2 text-sm text-gray-500 bg-stone-100 rounded-full">Avbryt</button>
                <button onClick={addEvent} className="cursor-pointer rounded-2xl bg-[#7c9a92] px-4 py-2 text-sm text-white">Lägg till</button>
              </div>
              </div>
              </div>
            </div>)}
    </section>
  );
}