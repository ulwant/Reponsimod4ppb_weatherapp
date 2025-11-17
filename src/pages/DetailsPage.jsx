import { Link } from "react-router-dom";
import WeatherCards from "../components/WeatherCards";

export default function DetailsPage({ weather, loading }) {
  if (loading) return <p className="text-white text-3xl">Loading...</p>;
  if (!weather) return <p className="text-white">No data available</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-semibold">Weather Details</h1>
        <Link to="/" className="px-3 py-1 bg-white/10 text-white rounded-full">Back</Link>
      </div>

      <WeatherCards
        current={weather.current}
        aqi={weather.current.air_quality}
        astro={weather.forecast.forecastday[0].astro}
      />
    </div>
  );
}
