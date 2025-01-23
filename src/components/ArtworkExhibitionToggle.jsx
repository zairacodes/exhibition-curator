import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const ArtworkExhibitionToggle = ({ artwork }) => {
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibitionId, setSelectedExhibitionId] = useState(null);
  const [isInExhibition, setIsInExhibition] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedExhibitions =
      JSON.parse(localStorage.getItem("exhibitions")) || [];
    setExhibitions(storedExhibitions);
  }, []);

  useEffect(() => {
    if (selectedExhibitionId) {
      const exhibition = exhibitions.find(
        (exhibition) => exhibition.id === selectedExhibitionId
      );
      setIsInExhibition(
        exhibition?.artworks.some((art) => art.id === artwork.id) || false
      );
    } else {
      setIsInExhibition(false);
    }
  }, [selectedExhibitionId, exhibitions, artwork]);

  const toggleArtworkInExhibition = () => {
    const storedExhibitions =
      JSON.parse(localStorage.getItem("exhibitions")) || [];

    const updatedExhibitions = storedExhibitions.map((exhibition) => {
      if (exhibition.id === selectedExhibitionId) {
        const isAlreadyAdded = exhibition.artworks.some(
          (art) => art.id === artwork.id
        );

        if (isAlreadyAdded) {
          return {
            ...exhibition,
            artworks: exhibition.artworks.filter(
              (art) => art.id !== artwork.id
            ),
          };
        } else {
          return {
            ...exhibition,
            artworks: [...exhibition.artworks, artwork],
          };
        }
      }
      return exhibition;
    });

    localStorage.setItem("exhibitions", JSON.stringify(updatedExhibitions));
    setExhibitions(updatedExhibitions);
    setIsInExhibition((prev) => !prev);
  };

  const handleNoExhibitions = () => {
    navigate("/myexhibitions");
  };

  if (exhibitions.length === 0) {
    return (
      <div className="artwork-exhibition-toggle">
        <p>No exhibitions available. Please create one first.</p>
        <button onClick={handleNoExhibitions} className="go-to-exhibitions">
          Go to My Exhibitions
        </button>
      </div>
    );
  }

  return (
    <div className="artwork-exhibition-toggle">
      <select
        value={selectedExhibitionId || ""}
        onChange={(e) => setSelectedExhibitionId(e.target.value)}
      >
        <option value="">Select Exhibition</option>
        {exhibitions.map((exhibition) => (
          <option key={exhibition.id} value={exhibition.id}>
            {exhibition.name}
          </option>
        ))}
      </select>
      <button
        className={isInExhibition ? "remove-btn" : "add-btn"}
        onClick={toggleArtworkInExhibition}
        disabled={!selectedExhibitionId}
      >
        {isInExhibition ? "Remove from Exhibition" : "Add to Exhibition"}
      </button>
    </div>
  );
};

export default ArtworkExhibitionToggle;
