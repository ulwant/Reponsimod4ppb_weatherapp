export function getBackground(condition) {
  switch (condition.toLowerCase()) {
    case "sunny":
      return "bg-gradient-to-b from-blue-400 to-blue-600";
    case "cloudy":
    case "overcast":
      return "bg-gradient-to-b from-gray-400 to-gray-600";
    case "rain":
    case "rainy":
    case "light rain":
      return "bg-gradient-to-b from-gray-500 to-gray-700";
    case "clear":
      return "bg-gradient-to-b from-indigo-600 to-blue-800";
    case "snow":
      return "bg-gradient-to-b from-blue-100 to-blue-300";
    default:
      return "bg-gradient-to-b from-blue-500 to-blue-700";
  }
}