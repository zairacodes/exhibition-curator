import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { fetchMetArtworks } from "../utils/metApi";
import { fetchAicArtworks } from "../utils/aicApi";
import ArtworkList from "../components/ArtworkList";
import SearchBar from "../components/SearchBar";
import Error from "./Error";

const Home = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 5;
  const cache = useRef({});
  const navigate = useNavigate();
  const searchQuery = searchParams.get("query")?.trim() || "";

  useEffect(() => {
    const pageFromParams = +(searchParams.get("page") || 1);
    if (isNaN(pageFromParams) || pageFromParams <= 0) {
      setError("Invalid page number.");
      navigate("/error");
      return;
    }
    setCurrentPage(pageFromParams);
    setError(null);
  }, [searchParams]);

  const fetchArtworks = async (page, query = "") => {
    setLoading(true);
    setError(null);
    try {
      if (cache.current[`${page}-${query}`]) {
        setArtworks(cache.current[`${page}-${query}`]);
      } else {
        const metArtworks = await fetchMetArtworks(page, itemsPerPage, query);
        const aicArtworks = await fetchAicArtworks(page, itemsPerPage, query);
        const combinedArtworks = [...metArtworks, ...aicArtworks];

        if (combinedArtworks.length === 0) {
          if (query) {
            if (page > 1) {
              setError(`No page ${page} found for query "${query}".`);
            } else {
              setError(`No artworks found for query "${query}".`);
            }
          } else {
            setError(`Page ${page} not found.`);
          }
          setArtworks([]);
        } else {
          cache.current[`${page}-${query}`] = combinedArtworks;
          setArtworks(combinedArtworks);
        }
      }
    } catch (err) {
      setError("Error fetching artworks.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const prefetchNextPages = async (page, query = "") => {
    const nextPages = [page + 1, page + 2];
    nextPages.forEach(async (p) => {
      if (!cache.current[`${p}-${query}`]) {
        try {
          const metArtworks = await fetchMetArtworks(p, itemsPerPage, query);
          const aicArtworks = await fetchAicArtworks(p, itemsPerPage, query);
          const combinedArtworks = [...metArtworks, ...aicArtworks];
          cache.current[`${p}-${query}`] = combinedArtworks;
        } catch (err) {
          console.error("Error prefetching artworks:", err);
        }
      }
    });
  };

  const handleSearch = (query) => {
    setSearchParams({ page: 1, query });
  };

  const handleNext = () => {
    if (!error) {
      const nextPage = currentPage + 1;
      navigate(`/?page=${nextPage}&query=${searchQuery}`);
    }
  };

  const handlePrevious = () => {
    if (!error) {
      const previousPage = Math.max(currentPage - 1, 1);
      navigate(`/?page=${previousPage}&query=${searchQuery}`);
    }
  };

  useEffect(() => {
    fetchArtworks(currentPage, searchQuery);
    prefetchNextPages(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  if (loading) return <div>Loading...</div>;
  if (error) return <Error error={error} />;

  return (
    <div className="homepage">
      <h1>Artworks</h1>
      <SearchBar onSearch={handleSearch} />
      <div>Filter by collection</div>
      <ArtworkList artworks={artworks} />
      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || !!error}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNext} disabled={!!error}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
