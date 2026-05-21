import {
  Cloud,
  CloudRain,
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

  rainChance: number;

  forecast: {
    day: string;
    temp: number;
    weatherCode: number;
  }[];
};

export function WeatherWidget() {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);
    
    const [lastUpdated, setLastUpdated] =
  useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const lat = 57.7089;
        const lon = 11.9746;

        const response = await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,precipitation_probability&timezone=auto`       );

        const data = await response.json();

        setWeather({
          currentTemp: Math.round(
            data.current.temperature_2m
          ),

          weatherCode:
            data.current.weather_code,

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
          
          rainChance:
          data.hourly.precipitation_probability[14],

          forecast: data.daily.time
  .slice(1, 8)
  .map(
    (
      date: string,
      index: number
    ) => ({
      day: new Date(date)
        .toLocaleDateString("sv-SE", {
          weekday: "short",
        })
        .replace(".", ""),

      temp: Math.round(
        data.daily.temperature_2m_max[
          index + 1
        ]
      ),

      weatherCode:
        data.daily.weather_code[
          index + 1
        ],
    })
  ),
          
        });
       
        setLastUpdated(
          new Date().toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();

      const interval = setInterval(() => {
    fetchWeather();
  }, 1000 * 60 * 10);

  return () => clearInterval(interval);
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
      return "🧣 Kallt";
    }

    if (temp <= 12) {
      return "🧥 Jackväder";
    }

    if (temp <= 20) {
      return "👕 Mild temperatur";
    }

    return "☀️ Väldigt varmt";
  }

  if (loading) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 max-h-fit ">
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
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 ">
        <p className="text-zinc-500">
          Kunde inte hämta vädret.
        </p>
      </section>
    );
  }

  return (
    <section
      className=" flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 ">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#7c9a92]">
            Göteborg
          </p>

          <h2 className="mt-3 text-5xl font-semibold tracking-tight text-[#7c9a92]">
            {weather.currentTemp}°
          </h2>


              <p className="text-[#7c9a92] mt-2">
                {getWeatherLabel(weather.weatherCode)}
              </p>
             

        </div>
        <div className=" flex flex-col justify-between h-full items-end gap-2">

        <div className="mt-4rounded-2xl bg-stone-100 p-3">
          
          {getWeatherIcon(weather.weatherCode)}
          
        </div>
         <p className="mt-4 text-sm text-[#7c9a92]">
              ☔ {weather.rainChance}% risk för regn
            </p>
        </div>
       
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-4 text-sm text-[#7c9a92]">
          <span>⬆ {weather.maxTemp}°</span>

          <span>⬇ {weather.minTemp}°</span>
        </div>

        <p className="text-sm text-[#7c9a92]">
          {getClothingHint(weather.maxTemp)}
        </p>
      </div>

      <div className="mt-6 flex-1 rounded-2xl bg-stone-100 p-4 flex flex-col justify-between">
        <p className="text-sm leading-relaxed text-zinc-700">Morgon {weather.morningTemp}°</p>
        <p className="text-sm leading-relaxed text-zinc-700">Eftermiddag {weather.afternoonTemp}°</p>
        <p className="text-sm leading-relaxed text-zinc-700">Kväll {weather.eveningTemp}°</p>
      </div>
<div className="mt-4 flex items-center gap-4 overflow-x-auto border-t border-stone-100 pt-4">
  {weather.forecast.map((day) => (
    <div
      key={day.day}
      className="flex flex-col w-full items-center gap-2"
    >
      <p className="text-xs text-zinc-400 capitalize">
        {day.day}
      </p>

      {getWeatherIcon(day.weatherCode)}

      <p className="text-sm text-zinc-700">
        {day.temp}°
      </p>
    </div>
  ))}
</div>
      
      <p className="mt-4 text-xs text-zinc-400">
  Uppdaterad {lastUpdated}
</p>
    </section>
  );
}