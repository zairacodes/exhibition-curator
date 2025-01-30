const ArtworkDetailLoading = () => {
  return (
    <div
      className="artwork-detail"
      role="alert"
      aria-busy="true"
      aria-label="Loading artwork details"
    >
      <div className="loading-pulse skeleton-artwork-image"></div>
      <div className="details">
        <div className="loading-pulse skeleton-text-lg"></div>
        <div className="loading-pulse skeleton-text-md"></div>
        <div className="loading-pulse skeleton-text-md"></div>
        <div className="artwork-info-group">
          <div className="info-row">
            <span className="loading-pulse skeleton-label"></span>
            <span className="loading-pulse skeleton-text-short"></span>
          </div>
          <div className="info-row">
            <span className="loading-pulse skeleton-label"></span>
            <span className="loading-pulse skeleton-text-short"></span>
          </div>
          <div className="info-row">
            <span className="loading-pulse skeleton-label"></span>
            <span className="loading-pulse skeleton-text-short"></span>
          </div>
        </div>
        <div className="artwork-exhibition-toggle skeleton-toggle">
          <div className="loading-pulse skeleton-dropdown"></div>
          <div className="loading-pulse skeleton-button"></div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailLoading;
