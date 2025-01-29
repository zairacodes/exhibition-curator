import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { fetchArtworkById } from "../utils/artworkApi";
import ArtworkExhibitionToggle from "../components/ArtworkExhibitionToggle";
import Error from "./Error";

const ArtworkDetail = () => {
  const { source, id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtwork = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchArtworkById(source, id);
        setArtwork(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [source, id]);

  if (loading) return <div>Loading artwork details...</div>;
  if (error) return <Error error={error} />;

  const sanitizedDescription = DOMPurify.sanitize(artwork.description);

  return (
    <section className="artwork-detail">
      <button
        className="go-back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back to previous page"
      >
        Go Back
      </button>
      <img
        src={artwork.image}
        alt={
          artwork.image.includes("placeholder.png")
            ? "Image for this artwork is unavailable, possibly due to copyright restrictions or missing data."
            : artwork.title
        }
      />
      <div className="details">
        <h1>{artwork.title}</h1>
        <h2>
          <span className="info-label">Artist:</span>
          {artwork.artist}
        </h2>
        <h2>
          <span className="info-label">Date:</span>
          {artwork.date}
        </h2>
        <p>
          <span className="info-label">Medium:</span>
          {artwork.medium}
        </p>
        <p>
          <span className="info-label">Dimensions:</span>
          {artwork.dimensions}
        </p>
        <p>
          <span dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </p>
        <p>
          <span className="info-label">Credit:</span>
          {artwork.credit}
        </p>
        <p className="info-label">{artwork.museum}</p>
        <ArtworkExhibitionToggle artwork={artwork} />
      </div>
    </section>
  );
};

export default ArtworkDetail;
