import { useState } from "react";
import { Search } from "lucide-react"; // icon library
import { motion } from "framer-motion";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() !== "") {
      onSearch(input.trim());
      setInput("");
    }
  };

  return (
    <motion.div  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
    className="w-full flex flex-col sm:flex-row gap-3">

      {/* Apple-style input */}
      <div className="flex items-center w-full sm:flex-1 px-4 py-3 bg-white/15 border border-white/25
       backdrop-blur-2xl rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)]">

        {/* Search Icon */}
        <Search className="text-white/80 w-5 h-5 mr-3" />

        {/* Input */}
        <input
          type="text"
          placeholder="Search city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-white/60
           focus:outline-none text-lg"
        />
      </div>

      {/* Apple-style button */}
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-white/20 border border-white/20 backdrop-blur-xl 
        rounded-full text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] sm:w-auto w-full
        active:scale-95 transition-transform"
      >
        Search
      </button>
    </motion.div>
  );
}

export default SearchBar;