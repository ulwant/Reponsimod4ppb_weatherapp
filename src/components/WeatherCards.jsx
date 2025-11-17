import WeatherCard from "./WeatherCard";
import SunMoon from "./SunMoon";
import { motion  } from "framer-motion";

function WeatherCards({ current, aqi, astro }) {
  return (
    <motion.div   initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.7, delay: 0.6 }}className="p-4 text-white">
      <h2 className="text-lg font-semibold opacity-80 mb-1">Weather Details</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      
      <WeatherCard title="UV Index" value={current.uv} />

      <WeatherCard title="Humidity" value={current.humidity + "%"} />

      <WeatherCard title="Wind" value={current.wind_kph + " km/h"}>
        <p className="text-sm opacity-70">Direction: {current.wind_dir}</p>
      </WeatherCard>

      <WeatherCard title="Pressure" value={current.pressure_mb + " mb"} />

      <WeatherCard title="Visibility" value={current.vis_km + " km"} />

      <WeatherCard title="Feels Like" value={current.feelslike_c + "°"} />

      <WeatherCard title="Cloud Cover" value={current.cloud + "%"} />

      <WeatherCard title="Air Quality" value={aqi["pm2_5"] + " PM2.5"}>
        <p className="text-sm opacity-70">
          PM10: {aqi["pm10"]}
        </p>
      </WeatherCard>
        <SunMoon astro={astro}/>
    </div>
    </motion.div>
    
  );
}

export default WeatherCards;