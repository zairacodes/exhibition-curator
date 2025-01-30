const ArtworkListLoading = () => {
  return (
    <div
      className="app"
      role="alert"
      aria-busy="true"
      aria-label="Loading artworks"
    >
      <h1 className="skeleton-heading">
        Great art takes time: gathering masterpieces for you...
      </h1>
      <ul className="artwork-list" role="list">
        {[...Array(5)].map((_, i) => (
          <li key={i} className="artwork-item">
            <div className="artwork-content">
              <div className="loading-pulse skeleton-image"></div>
              <div className="details">
                <div className="loading-pulse skeleton-text"></div>
                <div className="loading-pulse skeleton-text"></div>
              </div>
            </div>
            <div className="artwork-exhibition-toggle">
              <div className="loading-pulse skeleton-dropdown"></div>
              <div className="loading-pulse skeleton-button"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtworkListLoading;
