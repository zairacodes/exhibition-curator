const CollectionFilter = ({ selectedCollection, onSelectCollection }) => {
  return (
    <section className="collection-filter">
      <label htmlFor="collection">Select Collection:</label>
      <select
        id="collection"
        value={selectedCollection}
        onChange={(e) => onSelectCollection(e.target.value)}
        aria-label="Filter artworks by collection"
      >
        <option value="All Collections">All Collections</option>
        <option value="The Metropolitan Museum of Art">
          The Metropolitan Museum of Art
        </option>
        <option value="The Art Institute of Chicago">
          The Art Institute of Chicago
        </option>
      </select>
    </section>
  );
};

export default CollectionFilter;
