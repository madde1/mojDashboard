import { UtensilsCrossed, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type Meal = {
  id: number;
  title: string;
  date: string;
  category: string;
};

const mealCategoryColors: Record<string, string> = {
  Kött: "bg-red-400",
  Fisk: "bg-blue-400",
  Vegetariskt: "bg-green-400",
};

export function MealWidget() {
  const today = new Date().toISOString().split("T")[0];

  const [meals, setMeals] = useState<Meal[]>(() => {
    const savedMeals = localStorage.getItem("meals");

    return savedMeals ? JSON.parse(savedMeals) : [];
  });

  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("Kött");

  const [date, setDate] = useState(today);

  useEffect(() => {
    localStorage.setItem(
      "meals",
      JSON.stringify(meals)
    );
  }, [meals]);

  function addMeal() {
    if (!title) return;

    const newMeal = {
      id: Date.now(),
      title,
      category,
      date,
    };

    setMeals((prev) => [...prev, newMeal]);

    resetForm();
  }

  function deleteMeal(id: number) {
    setMeals((prev) =>
      prev.filter((meal) => meal.id !== id)
    );
  }

  function resetForm() {
    setTitle("");

    setCategory("Kött");

    setDate(today);

    setIsOpen(false);
  }

  const todaysMeal = meals.find(
    (meal) => meal.date === today
  );

const now = new Date();

const firstDayOfWeek = new Date(now);

const day =
  firstDayOfWeek.getDay() || 7;

firstDayOfWeek.setDate(
  firstDayOfWeek.getDate() - day + 1
);

firstDayOfWeek.setHours(0, 0, 0, 0);

const lastDayOfWeek = new Date(
  firstDayOfWeek
);

lastDayOfWeek.setDate(
  lastDayOfWeek.getDate() + 6
);

const weeklyMeals = [...meals]
  .filter((meal) => {
    const mealDate = new Date(meal.date);

    return (
      mealDate >= firstDayOfWeek &&
      mealDate <= lastDayOfWeek
    );
  })
  .sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  function formatMealDate(date: string) {
    const mealDate = new Date(date);

    return mealDate
      .toLocaleDateString("sv-SE", {
        weekday: "short",
      })
      .replace(".", "");
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#7c9a92]">
            Matsedel
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#7c9a92]">
            Veckans mat
          </h2>
        </div>

        <div className="rounded-2xl bg-stone-100 p-3">
          <UtensilsCrossed className="h-6 w-6 text-[#7c9a92]" />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-stone-100 p-4">
        <p className="text-sm text-[#7c9a92]">
          Idag
        </p>

        {todaysMeal ? (
          <div className="mt-2 flex items-center gap-3">
            <div
              className={`h-2 w-2 rounded-full ${
                mealCategoryColors[
                  todaysMeal.category
                ]
              }`}
            />

            <p className="text-lg font-semibold text-zinc-700">
              {todaysMeal.title}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-zinc-400">
            Ingen mat planerad
          </p>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {weeklyMeals.map((meal) => (
          <div
            key={meal.id}
            className="flex items-center justify-between rounded-xl bg-stone-50 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  mealCategoryColors[meal.category]
                }`}
              />

              <p className="text-sm text-zinc-400 capitalize">
                {formatMealDate(meal.date)}
              </p>

              <p className="text-sm font-medium text-zinc-700">
                {meal.title}
              </p>
            </div>

            <button
              onClick={() =>
                deleteMeal(meal.id)
              }
              className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-stone-200 hover:text-zinc-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#7c9a92] py-3 text-sm font-medium text-white transition-colors hover:bg-[#7c9a92]/70"
      >
        <Plus className="h-4 w-4" />
        Lägg till rätt
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6">
            <h2 className="text-xl font-semibold text-[#7c9a92]">
              Ny maträtt
            </h2>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Maträtt"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full rounded-2xl bg-stone-100 px-4 py-3 outline-none"
              />

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="w-full rounded-2xl bg-stone-100 px-4 py-3 outline-none"
              />

              <div className="relative">
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="w-full appearance-none rounded-2xl bg-stone-100 px-4 py-3 pr-10 outline-none text-zinc-700"
                >
                  <option>Kött</option>
                  <option>Vegetariskt</option>
                  <option>Fisk</option>
                </select>

                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
                  ▼
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={resetForm}
                  className="rounded-full bg-stone-100 px-4 py-2 text-sm text-gray-500"
                >
                  Avbryt
                </button>

                <button
                  onClick={addMeal}
                  className="rounded-2xl bg-[#7c9a92] px-4 py-2 text-sm text-white"
                >
                  Lägg till
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}