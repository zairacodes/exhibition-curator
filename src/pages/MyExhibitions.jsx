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

  return (
    <section className="myexhibitions">
      <h1>My Exhibitions</h1>
      <form className="create-exhibition" onSubmit={handleCreateExhibition}>
        <input
          id="new-exhibition-name"
          type="text"
          placeholder="New Exhibition Name"
          value={newExhibitionName}
          onChange={(e) => setNewExhibitionName(e.target.value)}
          aria-required="true"
        />
        <button type="submit">Create Exhibition</button>
        {errorMessage && (
          <p className="error-message" role="alert">
            {errorMessage}
          </p>
        )}
      </form>
      <section className="exhibition-list">
        {exhibitions.length === 0 ? (
          <p>No exhibitions created yet. Start by creating one!</p>
        ) : (
          <ul>
            {exhibitions.map((exhibition) => (
              <li key={exhibition.id} className="exhibition-item">
                <Link to={`/exhibition/${exhibition.id}`}>
                  <h2>{exhibition.name}</h2>
                </Link>
                <p className="details">
                  {exhibition.artworks.length > 0
                    ? `${exhibition.artworks.length} artwork${
                        exhibition.artworks.length > 1 ? "s" : ""
                      }`
                    : "Empty"}
                </p>
                <button
                  className="remove-exhibition"
                  onClick={() => handleRemoveExhibition(exhibition.id)}
                  aria-label={`Delete exhibition: ${exhibition.name}`}
                >
                  Delete Exhibition
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};

export default MyExhibitions;
