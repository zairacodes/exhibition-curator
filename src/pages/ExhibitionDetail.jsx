import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import Error from "./Error";

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
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h1>{exhibition.name}</h1>
      {exhibition.artworks.length === 0 ? (
        <p>No artworks in this exhibition.</p>
      ) : (
        <ul className="artwork-list">
          {exhibition.artworks.map((artwork) => (
            <li key={artwork.id} className="artwork-item">
              <Link to={`/artwork/${artwork.source}/${artwork.id}`}>
                <img src={artwork.image} alt={artwork.title} />
                <div className="details">
                  <h2>{artwork.title}</h2>
                  <p>{artwork.artist}</p>
                  <p>{artwork.date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ExhibitionDetail;
