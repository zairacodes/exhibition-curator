import { fetchMetArtworks } from "./metApi";
import { fetchAicArtworks } from "./aicApi";

export const fetchArtworkById = async (source, id) => {
  try {
    if (source === "met") {
      const metArtwork = await fetchMetArtworks(undefined, undefined, "", id);
      if (metArtwork) return metArtwork;
    } else if (source === "aic") {
      const aicArtwork = await fetchAicArtworks(undefined, undefined, "", id);
      if (aicArtwork) return aicArtwork;
    }
    throw new Error("Artwork not found.");
  } catch (error) {
    console.error("Error fetching artwork by ID:", error.message);
    throw error;
  }
};
