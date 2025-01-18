import { useState, useEffect, useRef } from "react";
import { fetchMetArtworks } from "../utils/metApi";
import { fetchAicArtworks } from "../utils/aicApi";
import ArtworkList from "../components/ArtworkList";

const Home = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const cache = useRef({});

  const fetchArtworks = async (page) => {
    setLoading(true);
    try {
      if (cache.current[page]) {
        setArtworks(cache.current[page]);
      } else {
        const metArtworks = await fetchMetArtworks(page, itemsPerPage);
        const aicArtworks = await fetchAicArtworks(page, itemsPerPage);
        const combinedArtworks = [...metArtworks, ...aicArtworks];
        cache.current[page] = combinedArtworks;
        setArtworks(combinedArtworks);
      }
    } catch (err) {
      setError("Error fetching artworks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const prefetchNextPages = async (page) => {
    const nextPages = [page + 1, page + 2];
    nextPages.forEach(async (p) => {
      if (!cache.current[p]) {
        try {
          const metArtworks = await fetchMetArtworks(p, itemsPerPage);
          const aicArtworks = await fetchAicArtworks(p, itemsPerPage);
          const combinedArtworks = [...metArtworks, ...aicArtworks];
          cache.current[p] = combinedArtworks;
        } catch (err) {
          console.error("Error prefetching artworks:", err);
        }
      }
    });
  };

  useEffect(() => {
    fetchArtworks(currentPage);
    prefetchNextPages(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="homepage">
      <h1>Artworks</h1>
      <div>Search bar</div>
      <div>Filter by collection</div>
      <ArtworkList artworks={artworks} />
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Home;
