import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

const AIC_BASE_URL = "https://api.artic.edu/api/v1/artworks";
const AIC_IMG_URL = "https://www.artic.edu/iiif/2";

const axiosWithLimit = axiosRateLimit(axios, {
  maxRequests: 10,
  perMilliseconds: 1000,
});

export const fetchAicArtworks = async (page, itemsPerPage) => {
  try {
    const response = await axiosWithLimit.get(AIC_BASE_URL, {
      params: {
        page,
        limit: itemsPerPage,
        fields: "id,title,image_id,date_display,artist_title",
        has_images: 1,
        is_public_domain: true,
      },
    });

    const aicArtworks = response.data.data.map((artwork) => ({
      image: artwork.image_id
        ? `${AIC_IMG_URL}/${artwork.image_id}/full/843,/0/default.jpg`
        : "/placeholder.png",
      title: artwork.title,
      artist: artwork.artist_title || "Artist Unknown",
      date: artwork.date_display || "Date Unknown",
    }));

    return aicArtworks;
  } catch (error) {
    console.error("Error fetching AIC artworks:", error);
    throw error;
  }
};
