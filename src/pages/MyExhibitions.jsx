import { useState, useEffect } from "react";
import { Link } from "react-router";

const MyExhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    const storedExhibitions = JSON.parse(localStorage.getItem("exhibitions"));
    setExhibitions(storedExhibitions);
  }, []);

  const handleRemoveArtwork = (artworkId) => {
    setExhibitions((prevExhibitions) => {
      const updatedExhibitions = prevExhibitions.map((exhibition) => {
        if (exhibition.id === "default") {
          return {
            ...exhibition,
            artworks: exhibition.artworks.filter(
              (artwork) => artwork.id !== artworkId
            ),
          };
        }
        return exhibition;
      });

      localStorage.setItem("exhibitions", JSON.stringify(updatedExhibitions));
      return updatedExhibitions;
    });
  };

  const defaultExhibition = exhibitions.find((ex) => ex.id === "default");

  return (
    <div className="myexhibitions">
      <h1>{defaultExhibition?.name || "My Exhibitions"}</h1>
      <section className="artwork-list">
        {defaultExhibition?.artworks.length === 0 ? (
          <p>No artworks in your exhibition. Start adding some!</p>
        ) : (
          <ul>
            {defaultExhibition?.artworks.map((artwork) => (
              <li
                key={`${artwork.source}-${artwork.id}`}
                className="artwork-item"
              >
                <Link to={`/artwork/${artwork.source}/${artwork.id}`}>
                  <img src={artwork.image} alt={artwork.title} />
                  <div className="details">
                    <h2>{artwork.title}</h2>
                    <p>{artwork.artist}</p>
                    <p>{artwork.date}</p>
                  </div>
                </Link>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveArtwork(artwork.id)}
                >
                  Remove from Exhibition
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default MyExhibitions;
