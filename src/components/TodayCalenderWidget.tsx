import { useState, useEffect } from "react";
import { CalendarDays, Plus, Trash2 } from "lucide-react";
type Event = {
  id: number;
  title: string;
  time: string;
  allDay?: boolean;
  date: string;
  category?: string;
};

export function TodayWidget() {
  const [allDay, setAllDay] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [category, setCategory] = useState("Familj");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem("events");
      return savedEvents
      ? JSON.parse(savedEvents)
      : [];
      }
    );

useEffect(() => {
  localStorage.setItem("events", JSON.stringify(events));
}, [events]);



function addEvent() {
if (!title || (!allDay && !time)) return;

  const newEvent = {
    id: Date.now(),
    title,
    time,
    allDay,
    date,
    category,
  };

  setEvents((prev) => [...prev, newEvent]);

  setTitle("");
  setTime("");
  setAllDay(false);
  setIsOpen(false);


}

function handleEdit(event: Event) {
  setEditingEvent(event);

  setTitle(event.title);

  setTime(event.time);
  
  setDate(event.date);

  setAllDay(event.allDay || false);
  
  setCategory(event.category || "Familj");

  setIsOpen(true);
}

function updateEvent() {
  if (!title) return;

  if (!allDay && !time) return;

  setEvents((prev) =>
    prev.map((event) =>
      event.id === editingEvent?.id
        ? {
            ...event,
            title,
            time,
            allDay,
            date,
            category,
          }
        : event
    )
  );

  resetForm();
}

function resetForm() {
  setTitle("");

  setTime("");

  setAllDay(false);

  setDate(selectedDate);

  setEditingEvent(null);

  setCategory("Familj");

  setIsOpen(false);
}

function deleteEvent(id: number) {
  setEvents((prev) =>
    prev.filter((event) => event.id !== id)
  );
}

const filteredEvents = events.filter(
  (event) => event.date === selectedDate
);

const sortedEvents = [...filteredEvents].sort(
  (a, b) => {
    if (a.allDay && !b.allDay) return -1;
    if (!a.allDay && b.allDay) return 1;

    return a.time.localeCompare(b.time);
  }
);

const upcomingEvents = [...events]
  .filter((event) => {
    return event.date >= selectedDate;
  })
  .sort((a, b) => {
    const dateCompare =
      a.date.localeCompare(b.date);

    if (dateCompare !== 0)
      return dateCompare;

    return a.time.localeCompare(b.time);
  })
  .slice(0, 3);

  function formatUpcomingDate(date: string) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(date);

  eventDate.setHours(0, 0, 0, 0);

  const diffInDays =
    (eventDate.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffInDays === 0) {
    return "Idag";
  }

  if (diffInDays === 1) {
    return "Imorgon";
  }

  if (diffInDays < 7) {
    return eventDate
      .toLocaleDateString("sv-SE", {
        weekday: "short",
      })
      .replace(".", "");
  }

  return eventDate.toLocaleDateString(
    "sv-SE",
    {
      day: "numeric",
      month: "short",
    }
  );
}

const categoryColors: Record<string, string> = {
  Familj: "bg-[#7c9a92]",
  Barn: "bg-blue-400",
  Jobb: "bg-amber-400",
  Fritid: "bg-pink-400",
  Födelsedag: "bg-red-400",
};
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 " >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#7c9a92]">
            Kalender
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#7c9a92]">
            Idag
          </h2>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="mt-3 rounded-xl bg-stone-100 px-3 py-2 text-sm  text-[#7c9a92] outline-none "/>
        </div>

        <div className="rounded-2xl bg-stone-100 p-3">
          <CalendarDays className="h-6 w-6 text-[#7c9a92]" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {sortedEvents.map((event) => (
          <div key={event.id} onClick={() => handleEdit(event)} className="cursor-pointer flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
              <div className="flex flex-row gap-2 items-center">
            <div className={`h-2 w-2 rounded-full ${ categoryColors[event.category || "Familj"] }`}/>
            <span className="text-sm text-[#7c9a92]">
                {event.allDay ? "Heldag" : event.time}
            </span>

            <span className="font-medium text-zinc-700 first-letter:capitalize">
              {event.title}
            </span>
              </div>
              <button onClick={(e) => {e.stopPropagation(); deleteEvent(event.id);}} className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-stone-200 hover:text-zinc-600 cursor-pointer ">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => { setDate(selectedDate); setIsOpen(true);}} className="cursor-pointer mt-6 flex w-full items-center justify-center gap-2 py-3 text-sm font-medium rounded-full text-white bg-[#7c9a92] transition-colors hover:bg-[#7c9a92]/70 ">
        <Plus className="h-4 w-4" />
        Lägg till aktivitet
      </button>

      <div className="mt-4 border-t border-stone-100 pt-4">
        <p className="text-xs uppercase tracking-wide text-zinc-400">
          Kommande
        </p>

        <div className="mt-2 space-y-1">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between text-sm">
              <span className="truncate text-zinc-700">
                {event.title}
              </span>

              <span className="ml-4 text-xs text-zinc-400">
              {formatUpcomingDate(event.date)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 items-center justify-center flex bg-black/50">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6">
            <h2 className="text-xl font-semibold text-[#7c9a92]">Ny aktivitet</h2>
            <div className="mt-6 space-y-4">
              <input type="text" placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-2xl bg-stone-100 px-4 py-3 outline-none" />
              <div className="relative">
               <select value={category} onChange={(e) => setCategory(e.target.value) } className="appearance-none w-full rounded-2xl bg-stone-100 px-4 py-3 outline-none text-zinc-700">
                <option>Familj</option>
                <option>Barn</option>
                <option>Jobb</option>
                <option>Fritid</option>
                <option>Födelsedag</option>
                </select>
                <div className=" pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7c9a92] ">▼</div>
              </div>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-2xl bg-stone-100 px-4 py-2 outline-none"/>
             {!allDay && ( <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-2xl bg-stone-100 px-4 py-3 outline-none" />)}
              <label className="flex items-center gap-2">
              <input type="checkbox" checked={allDay} onChange={(e) => {setAllDay(e.target.checked); if (e.target.checked) {setTime("");}}}/>
              <span className="text-sm text-zinc-700">
                Heldag
              </span>
              </label>
              
              <div className="flex justify-end gap-4">
                <button onClick={() => setIsOpen(false)} className="cursor-pointer px-4 py-2 text-sm text-gray-500 bg-stone-100 rounded-full">Avbryt</button>
                <button   onClick={() => editingEvent ? updateEvent() : addEvent()} className="cursor-pointer rounded-2xl bg-[#7c9a92] px-4 py-2 text-sm text-white">{editingEvent ? "Spara" : "Lägg till"}</button>
              </div>
              </div>
              
              </div>
            </div>
          
          )}
            

            
    </section>
  );
}