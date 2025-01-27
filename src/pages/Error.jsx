import { Link } from "react-router";

const Error = ({ error }) => {
  return (
    <section className="error-page" role="alert">
      <h1>Error</h1>
      <p>{error || "An error occurred or you've entered an invalid URL."}</p>
      <p>
        Please try again later or{" "}
        <Link to="/" aria-label="Return to homepage">
          go back to homepage
        </Link>
        .
      </p>
    </section>
  );
};

export default Error;
