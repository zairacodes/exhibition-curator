import ArtworkItem from "./ArtworkItem";

const ArtworkList = ({ artworks }) => {
  return (
    <section className="artwork-list">
      <ul>
        {artworks.map((artwork) => (
          <ArtworkItem
            key={`${artwork.source}-${artwork.id}`}
            artwork={artwork}
            showToggle={true}
          />
        ))}
      </ul>
    </section>
  );
};

export default ArtworkList;
