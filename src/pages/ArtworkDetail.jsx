import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { fetchArtworkById } from "../utils/artworkApi";
import Error from "./Error";

const ArtworkDetail = () => {
  const { source, id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <section className="artwork-detail">
      <img src={artwork.image} alt={artwork.title} />
      <h1>{artwork.title}</h1>
      <p>{artwork.artist}</p>
      <p>{artwork.date}</p>
      <p>{artwork.medium}</p>
      <p>{artwork.dimensions}</p>
      <p>{artwork.description}</p>
      <p>{artwork.credit}</p>
      <p>{artwork.museum}</p>
    </section>
  );
};

export default ArtworkDetail;
