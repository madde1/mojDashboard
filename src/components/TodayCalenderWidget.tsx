import { useState, useEffect } from "react";
import { CalendarDays, Plus, Trash2 } from "lucide-react";
type Event = {
  id: number;
  time: string;
  title: string;
  allDay?: boolean;
};

export function TodayWidget() {
  const [allDay, setAllDay] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [
      { id: 1, title: "BVC", time: "10:00" },
      { id: 2, title: "Förskolan APT", time: "16:00" },
    ];
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

  setAllDay(event.allDay || false);

  setIsOpen(true);
}

function updateEvent() {
  if (!title || (!allDay && !time))
    return;

  setEvents((prev) =>
    prev.map((event) =>
      event.id === editingEvent?.id
        ? {
            ...event,
            title,
            time,
            allDay,
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

  setEditingEvent(null);

  setIsOpen(false);
}

function deleteEvent(id: number) {
  setEvents((prev) =>
    prev.filter((event) => event.id !== id)
  );
}

const sortedEvents = [...events].sort(
  (a, b) => {
    if (a.allDay && !b.allDay) return -1;
    if (!a.allDay && b.allDay) return 1;

    return a.time.localeCompare(b.time);
  }
);
  return (
    <section
      className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 " >
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
        {sortedEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => handleEdit(event)}
            className="cursor-pointer flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
              <div className="flex flex-row gap-2 items-center">
            <span className="text-sm text-[#7c9a92]">
                {event.allDay ? "Heldag" : event.time}
            </span>

            <span className="font-medium text-zinc-700 capitalize">
              {event.title}
            </span>
              </div>
              <button
                onClick={(e) => {e.stopPropagation();
                deleteEvent(event.id);}}
              className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-stone-200 hover:text-zinc-600 cursor-pointer ">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={()=> setIsOpen(true)}
        className="cursor-pointer mt-6 flex w-full items-center justify-center gap-2 py-3 text-sm font-medium rounded-full text-white bg-[#7c9a92] transition-colors hover:bg-[#7c9a92]/70 ">
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
             <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) =>
                  setAllDay(e.target.checked)
                }
              />

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
            </div>)}
    </section>
  );
}