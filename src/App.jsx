import { useState } from "react";
import WeatherHeader from "./components/WeatherHeader"
import  HourlyForecast  from "./components/HourlyForecast"
import DailyForecast from "./components/DailyForecast";
import WeatherCards from "./components/WeatherCards";
import { getBackground } from "./utils/backgrounds";
import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import { motion } from "framer-motion";


function App() {
 const [city, setCity] = useState(() => {
  return localStorage.getItem("city") || "Hyderabad";
});

  const { weather, loading, error } = useWeather(city);

    

  const condition = weather?.current?.condition?.text || "Clear";
  const bgClass = getBackground(condition)
  return (
    
  <motion.div key={bgClass}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}className={`animate-fade ${bgClass} min-h-screen p-4 md:p-8` }>
  <div className="max-w-3xl mx-auto space-y-10 ">
    <SearchBar
    onSearch={(newCity) =>{
      setCity(newCity);
      localStorage.setItem("city",newCity)
    }}/>

    {loading ? (
      <p className="text-white text-3xl">Loading...</p>
    ) : (
      <motion.div
       key={city}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-10">
      
        <WeatherHeader
          city={weather.location.name}
          temp={weather.current.temp_c}
          condition={weather.current.condition.text}
          max={weather.forecast.forecastday[0].day.maxtemp_c}
          min={weather.forecast.forecastday[0].day.mintemp_c}
        />

        <HourlyForecast hoursToday={weather.forecast.forecastday[0].hour} 
        hoursTomorrow={weather.forecast.forecastday[1].hour}
        localtime={weather.location.localtime}
        astro={weather.forecast.forecastday[0].astro}/>

        <DailyForecast days={weather.forecast.forecastday} />

        <WeatherCards
          current={weather.current}
          aqi={weather.current.air_quality}
          astro={weather.forecast.forecastday[0].astro}
        />
        
      </motion.div>
      
    )}
    </div>
  </motion.div>

);
}

export default App;

