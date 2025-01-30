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

const isImageAvailable = async (imageUrl) => {
  try {
    const response = await axios.head(imageUrl);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

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

      const imageUrl = artwork.image_id
        ? `${AIC_IMG_URL}/${artwork.image_id}/full/843,/0/default.jpg`
        : "/placeholder.png";

      const imageAvailable = await isImageAvailable(imageUrl);
      const image = imageAvailable ? imageUrl : "/placeholder.png";

      return {
        id: artwork.id,
        source: "aic",
        image,
        title: artwork.title || "unknown",
        artist: artwork.artist_title || "unknown",
        date: artwork.date_display || "unknown",
        medium: artwork.medium_display || "unknown",
        dimensions: artwork.dimensions || "not available",
        description: artwork.description,
        credit: artwork.credit_line,
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

    const aicArtworks = await Promise.all(
      response.data.data.map(async (artwork) => {
        const imageUrl = artwork.image_id
          ? `${AIC_IMG_URL}/${artwork.image_id}/full/843,/0/default.jpg`
          : "/placeholder.png";
        const imageAvailable = await isImageAvailable(imageUrl);
        const image = imageAvailable ? imageUrl : "/placeholder.png";

        return {
          id: artwork.id,
          source: "aic",
          image,
          title: artwork.title || "Title Unknown",
          artist: artwork.artist_title || "Artist Unknown",
          date: artwork.date_display || "Date Unknown",
        };
      })
    );

    return aicArtworks;
  } catch (error) {
    console.error("Error fetching AIC artworks:", error);
    throw error;
  }
};
