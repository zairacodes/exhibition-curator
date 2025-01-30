import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { fetchMetArtworks } from "../utils/metApi";
import { fetchAicArtworks } from "../utils/aicApi";
import ArtworkList from "../components/ArtworkList";
import ArtworkListLoading from "../components/ArtworkListLoading";
import SearchBar from "../components/SearchBar";
import CollectionFilter from "../components/CollectionFilter";
import Error from "./Error";

const Home = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCollection, setSelectedCollection] = useState(
    searchParams.get("collection") || "All Collections"
  );
  const itemsPerPage = 5;
  const cache = useRef({});
  const navigate = useNavigate();
  const searchQuery = searchParams.get("query")?.trim() || "";
  const validCollections = [
    "All Collections",
    "The Metropolitan Museum of Art",
    "The Art Institute of Chicago",
  ];

  useEffect(() => {
    const pageFromParams = +(searchParams.get("page") || 1);
    const collectionFromParams =
      searchParams.get("collection") || "All Collections";
    if (isNaN(pageFromParams) || pageFromParams <= 0) {
      setError("Invalid page number.");
      navigate("/error");
      return;
    }
    setCurrentPage(pageFromParams);
    setSelectedCollection(collectionFromParams);
    setError(null);
  }, [searchParams]);

  const fetchArtworks = async (
    page,
    query = "",
    collection = "All Collections"
  ) => {
    setLoading(true);
    setError(null);

    if (!validCollections.includes(collection)) {
      setError(`Collection "${collection}" not found.`);
      setArtworks([]);
      setLoading(false);
      return;
    }

    try {
      const cacheKey = `${page}-${query}-${collection}`;
      if (cache.current[cacheKey]) {
        setArtworks(cache.current[cacheKey]);
      } else {
        let artworks = [];

        if (
          collection === "All Collections" ||
          collection === "The Metropolitan Museum of Art"
        ) {
          const metArtworks = await fetchMetArtworks(page, itemsPerPage, query);
          artworks = [...artworks, ...metArtworks];
        }

        if (
          collection === "All Collections" ||
          collection === "The Art Institute of Chicago"
        ) {
          const aicArtworks = await fetchAicArtworks(page, itemsPerPage, query);
          artworks = [...artworks, ...aicArtworks];
        }

        if (artworks.length === 0) {
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
          cache.current[cacheKey] = artworks;
          setArtworks(artworks);
        }
      }
    } catch (err) {
      setError("Error fetching artworks.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const prefetchNextPages = async (
    page,
    query = "",
    collection = "All Collections"
  ) => {
    const nextPages = [page + 1, page + 2];
    nextPages.forEach(async (p) => {
      const cacheKey = `${p}-${query}-${collection}`;
      if (!cache.current[cacheKey]) {
        try {
          let artworks = [];
          if (
            collection === "All Collections" ||
            collection === "The Metropolitan Museum of Art"
          ) {
            const metArtworks = await fetchMetArtworks(p, itemsPerPage, query);
            artworks = [...artworks, ...metArtworks];
          }
          if (
            collection === "All Collections" ||
            collection === "The Art Institute of Chicago"
          ) {
            const aicArtworks = await fetchAicArtworks(p, itemsPerPage, query);
            artworks = [...artworks, ...aicArtworks];
          }
          cache.current[cacheKey] = artworks;
        } catch (err) {
          console.error("Error prefetching artworks:", err);
        }
      }
    });
  };

  const handleSearch = (query) => {
    setSearchParams({ page: 1, query, collection: selectedCollection });
  };

  const handleNext = () => {
    if (!error) {
      const nextPage = currentPage + 1;
      setSearchParams({
        page: nextPage,
        query: searchQuery,
        collection: selectedCollection,
      });
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (!error) {
      const previousPage = Math.max(currentPage - 1, 1);
      setSearchParams({
        page: previousPage,
        query: searchQuery,
        collection: selectedCollection,
      });
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    fetchArtworks(currentPage, searchQuery, selectedCollection);
    prefetchNextPages(currentPage, searchQuery, selectedCollection);
  }, [currentPage, searchQuery, selectedCollection]);

  if (loading) return <ArtworkListLoading />;
  if (error) return <Error error={error} />;

  return (
    <main className="homepage">
      <h1>
        {searchQuery && selectedCollection !== "All Collections"
          ? `Artworks found for "${searchQuery}" from the ${selectedCollection}`
          : searchQuery
          ? `Artworks found for "${searchQuery}"`
          : selectedCollection === "All Collections"
          ? "Artworks"
          : `Artworks from the ${selectedCollection}`}
      </h1>
      <SearchBar onSearch={handleSearch} />
      <CollectionFilter
        selectedCollection={selectedCollection}
        onSelectCollection={(collection) => {
          setSearchParams({ page: 1, query: searchQuery, collection });
        }}
      />
      <ArtworkList artworks={artworks} />
      <nav className="pagination" aria-label="Pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || !!error}
          aria-label="Go to previous page"
        >
          Previous
        </button>
        <span aria-current="page">Page {currentPage}</span>
        <button
          onClick={handleNext}
          disabled={!!error}
          aria-label="Go to next page"
        >
          Next
        </button>
      </nav>
    </main>
  );
};

export default Home;
