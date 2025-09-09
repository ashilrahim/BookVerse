

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src="/search.svg" alt="search" />
        

        <input
          type="text"
          placeholder="Search books by title, author, or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button id="text"
          onClick={() => setSearchTerm("")}
          className="absolute right-6 top-2.5 cursor-pointer text-gray-200 hover:text-white transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
            className="w-5 h-5 "
          >
            <path
              fill="currentColor"
              d="M362.7 280.7l1404.8 1404.8c11.3 11.3 11.3 29.7 0 41l-40.9 40.9c-11.3 11.3-29.7 11.3-41 0L280.7 362.7c-11.3-11.3-11.3-29.7 0-41l40.9-40.9c11.3-11.3 29.7-11.3 41 0zM1685.3 280.7L280.7 1685.3c-11.3 11.3-11.3 29.7 0 41l40.9 40.9c11.3 11.3 29.7 11.3 41 0l1404.8-1404.8c11.3-11.3 11.3-29.7 0-41l-40.9-40.9c-11.3-11.3-29.7-11.3-41 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;