import { Link } from "react-router";

const Error = ({ error }) => {
  return (
    <div className="error-page">
      <h1>Error</h1>
      <p>{error || "An error occurred or you've entered an invalid URL."}</p>
      <p>
        Please try again later or <Link to="/">go back to homepage</Link>.
      </p>
    </div>
  );
};

export default Error;
