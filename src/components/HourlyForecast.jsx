// function HourlyForecast({ hours }) {
//   return (
//     <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl text-white">
//       <h2 className="text-lg font-semibold opacity-90 text-glow">Hourly Forecast</h2>
//       <p className="text-sm opacity-60 mb-4">Next 8 hours</p>
//       <div className="flex gap-5 overflow-x-auto scrollbar-hide py-1">
//         {hours.slice(0, 8).map((hour, index) => (
//           <div
//             key={index}
//             className="text-center min-w-[60px] flex flex-col items-center"
//           >
//             <p className="text-sm mb-1">
//               {index === 0 ? "Now" : hour.time.split(" ")[1].slice(0, 5)}
//             </p>
//             <img
//               src={hour.condition.icon}
//               alt="icon"
//               className="w-8 h-8 mb-1"
//             />
//             <p className="text-base font-medium text-glow">{hour.temp_c}°</p>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

// export default HourlyForecast;

import { motion } from "framer-motion";

function HourlyForecast({ hoursToday, hoursTomorrow, localtime, astro }) {
  // ⭐ Marker Component (FULLY FIXES ICON ISSUE)
 function Marker({ type, time }) {
  const icon =
    type === "sunrise"
      ? "https://img.icons8.com/ios-filled/100/sunrise.png"
      : "https://img.icons8.com/ios-filled/100/sunset.png";

  return (
    <div className="text-center min-w-[70px] flex flex-col items-center">
      <p className="text-xs opacity-70 mb-1">
        {type === "sunrise" ? "Sunrise" : "Sunset"}
      </p>
      <img src={icon} className="w-8 h-8 mb-1" alt={type} />
      <p className="text-sm opacity-80">{time}</p>
    </div>
  );
}

  // 1) merge today + tomorrow
  const allHours = [...hoursToday, ...hoursTomorrow];

  // 2) compute currentHour from localtime (city time)
  const currentHour = Number(localtime.split(" ")[1].split(":")[0]);

  // 3) find start index in allHours (safe)
  const startIndex = allHours.findIndex((h) => {
    if (!h.time) return false;
    const parts = h.time.split(" ");
    if (!parts[1]) return false;
    const hourVal = Number(parts[1].split(":")[0]);
    return hourVal === currentHour;
  });

  const sliceStart = startIndex === -1 ? 0 : startIndex;

  // 4) take next 24 hours (may cross midnight)
  let next24 = allHours.slice(sliceStart, sliceStart + 24);

  // Helper: convert "06:21 AM" -> { hour: 6, minute: 21 }
  function convertTo24(timeStr) {
    const [timePart, meridiem] = timeStr.split(" ");
    const [h, m] = timePart.split(":").map(Number);
    let hour = h;
    if (meridiem === "PM" && h !== 12) hour = hour + 12;
    if (meridiem === "AM" && h === 12) hour = 0;
    return { hour, minute: m };
  }

  // Helper: parse hourly item time "YYYY-MM-DD HH:MM" -> timestamp (ms)
  function parseHourTs(hourItem) {
    const iso = hourItem.time.replace(" ", "T") + ":00";
    return new Date(iso).getTime();
  }

  // Handle no data
  if (!next24 || next24.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-xl text-white"
      >
        <h2 className="text-lg font-semibold opacity-90">Hourly Forecast</h2>
        <p className="text-sm opacity-60 mb-4">Next 24 hours</p>
        <p>No hourly data available.</p>
      </motion.div>
    );
  }

  const listStartTs = parseHourTs(next24[0]);

  const sunriseObj = convertTo24(astro.sunrise);
  const sunsetObj = convertTo24(astro.sunset);

  function markerNextTimestamp(markerObj) {
    const firstDateStr = next24[0].time.split(" ")[0];
    const candidateIso = `${firstDateStr}T${String(markerObj.hour).padStart(
      2,
      "0"
    )}:${String(markerObj.minute).padStart(2, "0")}:00`;

    let candidateTs = new Date(candidateIso).getTime();
    if (candidateTs < listStartTs) {
      candidateTs += 24 * 60 * 60 * 1000;
    }
    return candidateTs;
  }

  const sunriseTs = markerNextTimestamp(sunriseObj);
  const sunsetTs = markerNextTimestamp(sunsetObj);

  const next24WithTs = next24.map((h) => ({
    orig: h,
    ts: parseHourTs(h),
  }));

  function insertMarkerByTs(listWithTs, type, markerTs) {
    let idx = listWithTs.findIndex((entry) => entry.ts > markerTs);
    if (idx === -1) idx = listWithTs.length;

    const markerTimeStr = `${String(
      type === "sunrise" ? sunriseObj.hour : sunsetObj.hour
    ).padStart(2, "0")}:${String(
      type === "sunrise" ? sunriseObj.minute : sunsetObj.minute
    ).padStart(2, "0")}`;

    listWithTs.splice(idx, 0, {
      orig: { isMarker: true, type, time: markerTimeStr },
      ts: markerTs,
    });
  }

  const listWithTs = [...next24WithTs];

  insertMarkerByTs(listWithTs, "sunrise", sunriseTs);
  insertMarkerByTs(listWithTs, "sunset", sunsetTs);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-xl text-white"
    >
      <h2 className="text-lg font-semibold opacity-90">Hourly Forecast</h2>
      <p className="text-sm opacity-60 mb-4">Next 24 hours</p>

      <div className="flex gap-5 overflow-x-auto scrollbar-hide py-2">
        {listWithTs.map((entry, index) => {
          const item = entry.orig;

          // ⭐ Render Marker using isolated component (FIX)
         if (item.isMarker === true) {
  return (
    <Marker
      key={`marker-${item.type}-${index}`}
      type={item.type}
      time={item.time}
    />
  );
}

          // normal hourly item
          const timeLabel = item.time.split(" ")[1].slice(0, 5);

          return (
            <div
              key={`hour-${index}`}
              className="text-center min-w-[70px] flex flex-col items-center"
            >
              <p className="text-sm mb-1">{index === 0 ? "Now" : timeLabel}</p>
              <img
                src={item.condition.icon}
                className="w-8 h-8 mb-1"
                alt="icon"
                loading="lazy"
              />
              <p className="text-base font-medium">{item.temp_c}°</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default HourlyForecast;