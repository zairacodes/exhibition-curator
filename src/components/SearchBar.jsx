import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="search-bar">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={handleInputChange}
          placeholder="Type a keyword to find artworks..."
          aria-label="Search for artworks"
          aria-required="true"
          required
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
};

export default SearchBar;
