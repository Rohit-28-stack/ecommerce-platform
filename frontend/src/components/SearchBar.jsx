import { FaSearch } from "react-icons/fa";

function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search products...",
}) {
  return (
    <div className="flex w-full overflow-hidden rounded-lg border border-slate-300 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
      <div className="flex items-center px-4 bg-white">
        <FaSearch className="text-slate-500" />
      </div>

      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
        placeholder={placeholder}
        className="flex-1 px-3 py-3 outline-none"
      />

      <button
        onClick={onSearch}
        className="bg-indigo-600 px-5 text-white hover:bg-indigo-700 transition"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;