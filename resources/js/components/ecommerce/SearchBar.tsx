import React, { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      setLoading(true);
      axios
        .get(`/products/suggestions?query=${debouncedQuery}`)
        .then(({ data }) => setSuggestions(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/products/search?query=${searchQuery}`;
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-400 rounded-xl py-2 px-4 focus:ring focus:ring-indigo-300"
          placeholder="Search products..."
        />
      </form>

      {/* Dropdown suggestions */}
      {suggestions.length > 0 && (
        <div className="
            absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg
            max-h-64 overflow-y-auto z-50
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
          ">
            {/* <ul className="absolute w-full bg-gray-800 border rounded-xl mt-1 shadow-lg z-50"> */}
            {suggestions.map((item, i) => (
                <div
                key={i}
                className="flex items-center bg-gray-800 text-white gap-3 p-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => (window.location.href = `/product/${item.slug}`)}
                >
                <img
                    src={item.image || "/images/placeholder.png"}
                    alt={item.name}
                    className="w-10 h-10 rounded object-cover"
                />
                <div className="flex flex-col text-sm">
                    <span
                    dangerouslySetInnerHTML={{ __html: item.highlighted }}
                    />
                    <span className="text-gray-300 text-xs">
                    {item.category || "Uncategorized"}
                    </span>
                </div>
                </div>
            ))}
          
        </div>
      )}

      {loading && (
        <div className="absolute bg-white w-full py-2 px-3 rounded-b-lg text-gray-400">
          Searching...
        </div>
      )}
    </div>
  );
};

export default SearchBar;
