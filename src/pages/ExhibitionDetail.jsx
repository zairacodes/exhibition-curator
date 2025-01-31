import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import Error from "./Error";
import ArtworkItem from "../components/ArtworkItem";

const ExhibitionDetail = () => {
  const { id } = useParams();
  const [exhibition, setExhibition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const storedExhibitions =
      JSON.parse(localStorage.getItem("exhibitions")) || [];
    const foundExhibition = storedExhibitions.find(
      (exhibition) => exhibition.id === id
    );
    if (!foundExhibition) {
      setError("Exhibition not found.");
    } else {
      setExhibition(foundExhibition);
    }
    setLoading(false);
  }, [id]);

  if (loading) return <div>Loading exhibition details...</div>;
  if (error) return <Error error={error} />;

  return (
    <section className="exhibition-detail">
      <button
        className="go-back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back to previous page"
      >
        Go Back
      </button>
      <h1>{exhibition.name}</h1>
      {exhibition.artworks.length === 0 ? (
        <p>
          No artworks in this exhibition. Add some from the{" "}
          <Link to="/" aria-label="Go to homepage">
            homepage
          </Link>
          !
        </p>
      ) : (
        <ul className="artwork-list" aria-label="Artworks in this exhibition">
          {exhibition.artworks.map((artwork) => (
            <ArtworkItem key={artwork.id} artwork={artwork} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ExhibitionDetail;
