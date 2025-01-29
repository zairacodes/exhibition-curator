import { Link } from "react-router";
import ArtworkExhibitionToggle from "./ArtworkExhibitionToggle";

const ArtworkItem = ({ artwork, showToggle = false }) => {
  return (
    <li key={`${artwork.source}-${artwork.id}`} className="artwork-item">
      <Link to={`/artwork/${artwork.source}/${artwork.id}`}>
        <img
          src={artwork.image}
          alt={
            artwork.image.includes("placeholder.png")
              ? "Image for this artwork is unavailable, possibly due to copyright restrictions or missing data."
              : artwork.title
          }
        />
        <div className="details">
          <h2>{artwork.title}</h2>
          <p>{artwork.artist}</p>
          <p>{artwork.date}</p>
        </div>
      </Link>
      {showToggle && <ArtworkExhibitionToggle artwork={artwork} />}
    </li>
  );
};

export default ArtworkItem;
