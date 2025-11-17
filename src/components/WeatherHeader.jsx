import { motion } from "framer-motion";

function WeatherHeader({ city, temp, condition, max, min }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}      // start slightly up & invisible
      animate={{ opacity: 1, y: 0 }}        // fade in + slide down
      transition={{ duration: 0.6 }}        // smooth Apple feel
      className="text-white p-6 text-center"
    >
      <h1 className="text-4xl font-bold text-glow">{city}</h1>
      <p className="text-8xl font-light text-glow">{temp}°</p>
      <p className="text-xl text-glow">{condition}</p>
      <p className="text-lg opacity-70">H: {max}°  L: {min}°</p>
    </motion.div>
  );
}

export default WeatherHeader;