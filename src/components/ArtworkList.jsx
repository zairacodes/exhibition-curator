import { Link } from "react-router";
import ArtworkExhibitionToggle from "./ArtworkExhibitionToggle";

const ArtworkList = ({ artworks }) => {
  return (
    <section className="artwork-list">
      <ul>
        {artworks.map((artwork) => (
          <li key={`${artwork.source}-${artwork.id}`} className="artwork-item">
            <Link to={`/artwork/${artwork.source}/${artwork.id}`}>
              <img src={artwork.image} alt={artwork.title} />
              <div className="details">
                <h2>{artwork.title}</h2>
                <p>{artwork.artist}</p>
                <p>{artwork.date}</p>
              </div>
            </Link>
            <ArtworkExhibitionToggle artwork={artwork} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArtworkList;
