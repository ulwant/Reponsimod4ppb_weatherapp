function SunMoon({ astro }) {
  return (
    <div className="bg-white/20 border border-white/10 backdrop-blur-md rounded-2xl p-4 text-white shadow-lg space-y-3">
      
      <p className="text-sm opacity-80">Sun & Moon</p>

      <div className="flex justify-between items-center">
        <p className="text-lg">🌅 Sunrise</p>
        <p className="text-lg">{astro.sunrise}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-lg">🌇 Sunset</p>
        <p className="text-lg">{astro.sunset}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-lg">🌙 Moon Phase</p>
        <p className="text-lg">{astro.moon_phase}</p>
      </div>

    </div>
  );
}

export default SunMoon;