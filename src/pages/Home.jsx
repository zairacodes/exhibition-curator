import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { fetchMetArtworks } from "../utils/metApi";
import { fetchAicArtworks } from "../utils/aicApi";
import ArtworkList from "../components/ArtworkList";

const Home = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 5;
  const cache = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const pageFromParams = +(searchParams.get("page") || 1);
    if (isNaN(pageFromParams) || pageFromParams <= 0) {
      setError("Invalid page number.");
      return;
    }
    setCurrentPage(pageFromParams);
  }, [searchParams]);

  const fetchArtworks = async (page) => {
    setLoading(true);
    try {
      if (cache.current[page]) {
        setArtworks(cache.current[page]);
      } else {
        const metArtworks = await fetchMetArtworks(page, itemsPerPage);
        const aicArtworks = await fetchAicArtworks(page, itemsPerPage);
        const combinedArtworks = [...metArtworks, ...aicArtworks];
        if (combinedArtworks.length === 0) {
          setError("No artworks found on this page.");
        } else {
          cache.current[page] = combinedArtworks;
          setArtworks(combinedArtworks);
        }
      }
    } catch (err) {
      setError("Error fetching artworks. Please try again later.");
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
    if (!error) {
      fetchArtworks(currentPage);
      prefetchNextPages(currentPage);
    }
  }, [currentPage, error]);

  const handleNext = () => {
    const nextPage = currentPage + 1;
    navigate(`/?page=${nextPage}`);
  };

  const handlePrevious = () => {
    const previousPage = Math.max(currentPage - 1, 1);
    navigate(`/?page=${previousPage}`);
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
