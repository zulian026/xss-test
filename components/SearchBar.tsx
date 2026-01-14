import React, { useState } from "react";
import { SecurityMode } from "../types";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <i className="fas fa-search text-indigo-500"></i>
          Search Articles
        </h2>
      </div>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-3">
          <div className="flex-grow relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <i className="fas fa-search"></i>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
