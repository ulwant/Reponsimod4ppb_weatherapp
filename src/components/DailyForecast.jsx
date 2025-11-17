import { motion } from "framer-motion";


function DailyForecast({ days }) {
  return (
    <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.4 }}
 className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl text-white space-y-3">
      <h2 className="text-lg font-semibold opacity-90">7-Day Forecast</h2>
      <p className="text-sm opacity-60 mb-2">Upcoming Week</p>

      {days.map((d, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-2 border-b border-white/10 last:border-none"
        >
          <p className="text-base font-medium w-[60px]">
            {new Date(d.date).toLocaleDateString("en-US", { weekday: "short" })}
          </p>
          <img
            src={d.day.condition.icon}
            className="w-8 h-8"
            alt="icon"
          />
          <p className="text-base font-medium text-glow">
            {Math.round(d.day.maxtemp_c)}°
            <span className="opacity-60 ml-1">
              {Math.round(d.day.mintemp_c)}°
            </span>
          </p>
        </div>
      ))}

    </motion.div>
  );
}

export default DailyForecast;