import { Link } from "react-router";

const Header = () => {
  return (
    <header>
      <h1>Exhibition Curator</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/myexhibitions">My Exhibitions</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
