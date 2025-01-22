import { useState, useEffect } from "react";

const ArtworkExhibitionToggle = ({ artwork }) => {
  const [isInExhibition, setIsInExhibition] = useState(false);

  useEffect(() => {
    const storedExhibitions =
      JSON.parse(localStorage.getItem("exhibitions")) || [];
    const defaultExhibition = storedExhibitions.find(
      (exhibition) => exhibition.id === "default"
    );
    setIsInExhibition(
      defaultExhibition?.artworks.some((art) => art.id === artwork.id) || false
    );
  }, [artwork]);

  const toggleArtworkInExhibition = () => {
    const storedExhibitions =
      JSON.parse(localStorage.getItem("exhibitions")) || [];
    const updatedExhibitions = storedExhibitions.map((exhibition) => {
      if (exhibition.id === "default") {
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
    setIsInExhibition(!isInExhibition);
  };

  return (
    <div className="artwork-exhibition-toggle">
      <button
        className={isInExhibition ? "remove-button" : "add-button"}
        onClick={toggleArtworkInExhibition}
      >
        {isInExhibition ? "Remove from Exhibition" : "Add to Exhibition"}
      </button>
    </div>
  );
};

export default ArtworkExhibitionToggle;
