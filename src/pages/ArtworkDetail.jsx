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
      <button onClick={() => navigate(-1)}>Go Back</button>
      <img src={artwork.image} alt={artwork.title} />
      <div className="details">
        <h1>{artwork.title}</h1>
        <h2>{artwork.artist}</h2>
        <h2>{artwork.date}</h2>
        <p>{artwork.medium}</p>
        <p>{artwork.dimensions}</p>
        <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        <p>{artwork.credit}</p>
        <p>{artwork.museum}</p>
        <ArtworkExhibitionToggle artwork={artwork} />
      </div>
    </section>
  );
};

export default ArtworkDetail;
