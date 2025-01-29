import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

const MET_MUSEUM_NAME =
  "The Metropolitan Museum of Art – New York, United States";
const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

const axiosWithLimit = axiosRateLimit(axios, {
  maxRequests: 10,
  perMilliseconds: 1000,
});

export const fetchMetArtworks = async (
  page,
  itemsPerPage,
  query = "",
  id = null
) => {
  try {
    if (id) {
      const response = await axiosWithLimit.get(
        `${MET_BASE_URL}/objects/${id}`
      );
      const artwork = response.data;
      return {
        id: artwork.objectID,
        source: "met",
        image:
          artwork.primaryImageSmall ||
          artwork.primaryImage ||
          "/placeholder.png",
        title: artwork.title || "unknown",
        artist: artwork.artistDisplayName || "unknown",
        date: artwork.objectDate || "unknown",
        medium: artwork.medium || "unknown",
        dimensions: artwork.dimensions || "not available",
        credit: artwork.creditLine,
        museum: MET_MUSEUM_NAME,
      };
    }

    const response = await axiosWithLimit.get(`${MET_BASE_URL}/search`, {
      params: {
        isPublicDomain: true,
        hasImages: true,
        isOnView: true,
        q: query || "met",
      },
    });

    const allIds = response.data.objectIDs;
    if (!allIds || allIds.length === 0) {
      return [];
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedIds = allIds.slice(startIndex, endIndex);

    const objectsData = await Promise.all(
      paginatedIds.map((id) =>
        axiosWithLimit
          .get(`${MET_BASE_URL}/objects/${id}`)
          .then((res) => res.data)
      )
    );

    const metArtworks = objectsData.map((artwork) => ({
      id: artwork.objectID,
      source: "met",
      image:
        artwork.primaryImageSmall || artwork.primaryImage || "/placeholder.png",
      title: artwork.title || "Title Unknown",
      artist: artwork.artistDisplayName || "Artist Unknown",
      date: artwork.objectDate || "Date Unknown",
    }));

    return metArtworks;
  } catch (error) {
    console.error("Error fetching MET artworks:", error);
    throw error;
  }
};
