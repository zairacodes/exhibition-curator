const CollectionFilter = ({ selectedCollection, onSelectCollection }) => {
  return (
    <div className="collection-filter">
      <label htmlFor="collection">Collection:</label>
      <select
        id="collection"
        value={selectedCollection}
        onChange={(e) => onSelectCollection(e.target.value)}
      >
        <option value="All Collections">All Collections</option>
        <option value="The Metropolitan Museum of Art">
          The Metropolitan Museum of Art
        </option>
        <option value="The Art Institute of Chicago">
          The Art Institute of Chicago
        </option>
      </select>
    </div>
  );
};

export default CollectionFilter;
