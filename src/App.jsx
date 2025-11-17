import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import WeatherHeader from "./components/WeatherHeader"
import  HourlyForecast  from "./components/HourlyForecast"
import DailyForecast from "./components/DailyForecast";
import WeatherCards from "./components/WeatherCards";
import { getBackground } from "./utils/backgrounds";
import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import { motion } from "framer-motion";
import DailyPage from "./pages/DailyPage";
import DetailsPage from "./pages/DetailsPage";


function App() {
 const [city, setCity] = useState(() => {
  return localStorage.getItem("city") || "Hyderabad";
});

  const { weather, loading, error } = useWeather(city);

  const condition = weather?.current?.condition?.text || "Clear";
  const bgClass = getBackground(condition)

  // Home content component (keeps file concise)
  function HomeContent() {
    if (loading) return <p className="text-white text-3xl">Loading...</p>;
    if (!weather) return <p className="text-white">No data</p>;

    return (
      <motion.div
        key={city}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        <WeatherHeader
          city={weather.location.name}
          temp={weather.current.temp_c}
          condition={weather.current.condition.text}
          max={weather.forecast.forecastday[0].day.maxtemp_c}
          min={weather.forecast.forecastday[0].day.mintemp_c}
        />

        <HourlyForecast
          hoursToday={weather.forecast.forecastday[0].hour}
          hoursTomorrow={weather.forecast.forecastday[1].hour}
          localtime={weather.location.localtime}
          astro={weather.forecast.forecastday[0].astro}
        />

        {/* Author / Group credit on Home page */}
        <div className="text-center text-sm text-white/70 mt-4">
          Ulwan Terry A — kelompok 11
        </div>
      </motion.div>
    );
  }

  return (
    
  <motion.div key={bgClass}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}className={`animate-fade ${bgClass} min-h-screen p-4 md:p-8` }>
  <div className="max-w-3xl mx-auto space-y-10 ">
    <SearchBar
      onSearch={(newCity) => {
        setCity(newCity);
        localStorage.setItem("city", newCity)
      }}
    />

    {/* Simple nav buttons */}
    <div className="flex gap-3">
      <Link to="/" className="px-4 py-2 bg-white/10 text-white rounded-full">Home</Link>
      <Link to="/daily" className="px-4 py-2 bg-white/10 text-white rounded-full">7-Day Forecast</Link>
      <Link to="/details" className="px-4 py-2 bg-white/10 text-white rounded-full">Weather Details</Link>
    </div>

    {/* Routes */}
    <Routes>
      <Route path="/" element={<HomeContent />} />
      <Route path="/daily" element={<DailyPage weather={weather} loading={loading} />} />
      <Route path="/details" element={<DetailsPage weather={weather} loading={loading} />} />
    </Routes>
     </div>
   </motion.div>
 
 );
}

export default App;

