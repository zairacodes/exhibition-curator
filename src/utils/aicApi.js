import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

const AIC_MUSEUM_NAME =
  "The Art Institute of Chicago – Illinois, United States";
const AIC_BASE_URL = "https://api.artic.edu/api/v1/artworks";
const AIC_IMG_URL = "https://www.artic.edu/iiif/2";

const axiosWithLimit = axiosRateLimit(axios, {
  maxRequests: 10,
  perMilliseconds: 1000,
});

export const fetchAicArtworks = async (
  page,
  itemsPerPage,
  query = "",
  id = null
) => {
  try {
    if (id) {
      const response = await axiosWithLimit.get(`${AIC_BASE_URL}/${id}`);
      const artwork = response.data.data;

      return {
        id: artwork.id,
        image: artwork.image_id
          ? `${AIC_IMG_URL}/${artwork.image_id}/full/843,/0/default.jpg`
          : "/placeholder.png",
        title: artwork.title || "Title Unknown",
        artist: artwork.artist_title || "Artist Unknown",
        date: artwork.date_display || "Date Unknown",
        medium: artwork.medium_display || "Medium Unknown",
        dimensions: artwork.dimensions || "Dimensions Unknown",
        description: artwork.description || "Description Not Available",
        credit: artwork.credit_line || "Credit Information Not Available",
        museum: AIC_MUSEUM_NAME,
      };
    }

    const endpoint = query.trim() ? `${AIC_BASE_URL}/search` : AIC_BASE_URL;

    const params = {
      page,
      limit: itemsPerPage,
      fields: "id,title,image_id,date_display,artist_title",
      has_images: 1,
      is_public_domain: true,
    };

    if (query.trim()) {
      params.q = query.trim();
    }

    const response = await axiosWithLimit.get(endpoint, { params });

    if (!response.data?.data) {
      return [];
    }

    const aicArtworks = response.data.data.map((artwork) => ({
      id: artwork.id,
      source: "aic",
      image: artwork.image_id
        ? `${AIC_IMG_URL}/${artwork.image_id}/full/843,/0/default.jpg`
        : "/placeholder.png",
      title: artwork.title || "Title Unknown",
      artist: artwork.artist_title || "Artist Unknown",
      date: artwork.date_display || "Date Unknown",
    }));

    return aicArtworks;
  } catch (error) {
    console.error("Error fetching AIC artworks:", error);
    throw error;
  }
};
