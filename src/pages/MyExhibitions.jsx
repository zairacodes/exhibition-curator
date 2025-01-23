import { useState, useEffect } from "react";
import { Link } from "react-router";

const MyExhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [newExhibitionName, setNewExhibitionName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedExhibitions =
      JSON.parse(localStorage.getItem("exhibitions")) || [];
    setExhibitions(storedExhibitions);
  }, []);

  const handleCreateExhibition = (e) => {
    e.preventDefault();

    if (newExhibitionName.trim()) {
      const nameExists = exhibitions.some(
        (exhibition) =>
          exhibition.name.toLowerCase() ===
          newExhibitionName.trim().toLowerCase()
      );
      if (nameExists) {
        setErrorMessage(
          "An exhibition with this name already exists. Please choose a different name."
        );
        return;
      }
      const newExhibition = {
        id: Date.now().toString(),
        name: newExhibitionName,
        artworks: [],
      };
      const updatedExhibitions = [...exhibitions, newExhibition];
      setExhibitions(updatedExhibitions);
      localStorage.setItem("exhibitions", JSON.stringify(updatedExhibitions));
      setNewExhibitionName("");
      setErrorMessage("");
    } else {
      setErrorMessage("Exhibition name cannot be empty.");
    }
  };

  const handleRemoveExhibition = (exhibitionId) => {
    const updatedExhibitions = exhibitions.filter(
      (exhibition) => exhibition.id !== exhibitionId
    );
    setExhibitions(updatedExhibitions);
    localStorage.setItem("exhibitions", JSON.stringify(updatedExhibitions));
  };

  const handleRemoveArtwork = (artworkId, exhibitionId) => {
    const updatedExhibitions = exhibitions.map((exhibition) => {
      if (exhibition.id === exhibitionId) {
        return {
          ...exhibition,
          artworks: exhibition.artworks.filter(
            (artwork) => artwork.id !== artworkId
          ),
        };
      }
      return exhibition;
    });
    setExhibitions(updatedExhibitions);
    localStorage.setItem("exhibitions", JSON.stringify(updatedExhibitions));
  };

  return (
    <div className="myexhibitions">
      <h1>My Exhibitions</h1>
      <form className="create-exhibition" onSubmit={handleCreateExhibition}>
        <input
          type="text"
          placeholder="New Exhibition Name"
          value={newExhibitionName}
          onChange={(e) => setNewExhibitionName(e.target.value)}
        />
        <button type="submit">Create Exhibition</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <section className="exhibition-list">
        {exhibitions.length === 0 ? (
          <p>No exhibitions created yet. Start by creating one!</p>
        ) : (
          <ul>
            {exhibitions.map((exhibition) => (
              <li key={exhibition.id} className="exhibition-item">
                <h2>{exhibition.name}</h2>
                <button
                  className="remove-exhibition"
                  onClick={() => handleRemoveExhibition(exhibition.id)}
                >
                  Delete Exhibition
                </button>
                <ul>
                  {exhibition.artworks.length === 0 ? (
                    <p>No artworks in this exhibition.</p>
                  ) : (
                    exhibition.artworks.map((artwork) => (
                      <li key={artwork.id} className="artwork-item">
                        <Link to={`/artwork/${artwork.source}/${artwork.id}`}>
                          <img src={artwork.image} alt={artwork.title} />
                          <div className="details">
                            <h2>{artwork.title}</h2>
                            <p>{artwork.artist}</p>
                            <p>{artwork.date}</p>
                          </div>
                        </Link>
                        <button
                          className="remove-btn"
                          onClick={() =>
                            handleRemoveArtwork(artwork.id, exhibition.id)
                          }
                        >
                          Remove from Exhibition
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default MyExhibitions;
