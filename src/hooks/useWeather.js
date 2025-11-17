import { useEffect, useState } from "react";

export default function useWeather(city) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use Vite env variable. Make sure you have VITE_WEATHER_API_KEY in .env
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        if (!API_KEY) {
          throw new Error(
            "Missing API key. Set VITE_WEATHER_API_KEY in your .env file and restart the dev server."
          );
        }

        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=no`
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
}