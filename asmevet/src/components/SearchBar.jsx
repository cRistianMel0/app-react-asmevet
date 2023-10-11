import "../styled-components/searchBar.scss";

export default function SearchBar({ searchText, setSearchText }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar servicios... 🔍"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}
