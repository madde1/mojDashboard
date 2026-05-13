import {
  Cloud,
  CloudRain,
  ChevronDown,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";

type WeatherData = {
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;

  morningTemp: number;
  afternoonTemp: number;
  eveningTemp: number;
};
export function WeatherWidget() {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] = useState(true);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const lat = 57.7089;
        const lon = 11.9746;

     const response = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&timezone=auto`
);

        const data = await response.json();

        setWeather({
  currentTemp: Math.round(
    data.current.temperature_2m
  ),

  weatherCode: data.current.weather_code,

  maxTemp: Math.round(
    data.daily.temperature_2m_max[0]
  ),

  minTemp: Math.round(
    data.daily.temperature_2m_min[0]
  ),

  morningTemp: Math.round(
    data.hourly.temperature_2m[8]
  ),

  afternoonTemp: Math.round(
    data.hourly.temperature_2m[14]
  ),

  eveningTemp: Math.round(
    data.hourly.temperature_2m[20]
  ),
});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  function getWeatherIcon(code: number) {
    if (code === 0) {
      return (
        <Sun className="h-7 w-7 text-[#7c9a92]" />
      );
    }

    if (code >= 51) {
      return (
        <CloudRain className="h-7 w-7 text-[#7c9a92]" />
      );
    }

    return (
      <Cloud className="h-7 w-7 text-[#7c9a92]" />
    );
  }

  function getWeatherLabel(code: number) {
    if (code === 0) return "Soligt";
    if (code >= 51) return "Regnigt";

    return "Molnigt";
  }

  function getClothingHint(temp: number) {
    if (temp <= 5) {
      return "🧣 Kallt idag — mössa och jacka";
    }

    if (temp <= 12) {
      return "🧥 Jackväder idag";
    }

    if (temp <= 20) {
      return "👕 Ganska mild temperatur";
    }

    return "☀️ Väldigt varmt idag";
  }

  if (loading) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="animate-pulse">
          <div className="h-4 w-24 rounded bg-[#f5f3ef]" />

          <div className="mt-4 h-10 w-20 rounded bg-[#f5f3ef]" />

          <div className="mt-3 h-4 w-32 rounded bg-[#f5f3ef]" />
        </div>
      </section>
    );
  }

  if (!weather) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <p className="text-zinc-500">
          Kunde inte hämta vädret.
        </p>
      </section>
    );
  }

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="
        w-full
        rounded-3xl
        bg-white
        p-6
        text-left
        shadow-sm
        ring-1
        ring-black/5
        transition-all
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#7c9a92]">
            Göteborg
          </p>

          <h2 className="mt-3 text-5xl font-semibold tracking-tight text-[#7c9a92]">
            {weather.currentTemp}°
          </h2>

          <p className="mt-2 text-[#7c9a92]">
            {getWeatherLabel(weather.weatherCode)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="rounded-2xl bg-[#f5f3ef] p-3">
            {getWeatherIcon(weather.weatherCode)}
          </div>

        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
  <div className="flex items-center gap-4 text-sm text-[#7c9a92]">
    <span>⬆ {weather.maxTemp}°</span>
    <span>⬇ {weather.minTemp}°</span>
  </div>

  <p className="text-sm text-[#7c9a92]">
    {getClothingHint(weather.maxTemp)}
  </p>
</div>
<div className="flex justify-start mt-8">
   <ChevronDown
            className={`
              h-6
              w-6
              text-[#7c9a92]
              transition-transform
              ${expanded ? "rotate-180" : ""}
            `}
          />
</div>

      {expanded && (
        <div className="mt-6 border-t border-[#f5f3ef] pt-6">

         <div className="mt-2 grid grid-cols-2 gap-2">
  <div className="rounded-2xl bg-[#f5f3ef] p-3">
    <p className="text-xs text-[#7c9a92]">
      Morgon
    </p>

    <p className="mt-1 text-lg font-medium text-[#7c9a92]">
      {weather.morningTemp}°
    </p>
  </div>

  <div className="rounded-2xl bg-[#f5f3ef] p-3">
    <p className="text-xs text-[#7c9a92]">
      Eftermiddag
    </p>

    <p className="mt-1 text-lg font-medium text-[#7c9a92]">
      {weather.afternoonTemp}°
    </p>
  </div>

  <div className="rounded-2xl bg-[#f5f3ef] p-3">
    <p className="text-xs text-[#7c9a92]">
      Kväll
    </p>

    <p className="mt-1 text-lg font-medium text-[#7c9a92]">
      {weather.eveningTemp}°
    </p>
  </div>
</div>
        </div>
      )}
    </button>
  );
}