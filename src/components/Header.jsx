import { Link } from "react-router";

const Header = () => {
  return (
    <header>
      <h1>Exhibition Curator</h1>
      <nav role="navigation" aria-label="Main navigation">
        <ul>
          <li>
            <Link to="/" aria-label="Go to Homepage">
              Home
            </Link>
          </li>
          <li>
            <Link to="/myexhibitions" aria-label="Go to My Exhibitions page">
              My Exhibitions
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
