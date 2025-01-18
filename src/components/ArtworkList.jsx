const ArtworkList = ({ artworks }) => {
  return (
    <section className="artwork-list">
      <ul>
        {artworks.map((artwork, index) => (
          <li key={index} className="artwork-item">
            <div className="artwork-image">
              <img src={artwork.image} alt={artwork.title} />
            </div>
            <div className="artwork-details">
              <h2>{artwork.title}</h2>
              <p>{artwork.artist}</p>
              <p>{artwork.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArtworkList;
