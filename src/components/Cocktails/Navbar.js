import { Link } from "react-router-dom";

const logo =
  "https://raw.githubusercontent.com/nurmukhamedov/react-projects/663d17d846883f9e8072f6838268c80dbbbd336b/react-project/src/logo.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="Cocktail DB" className="logo" />
        </Link>
        <ul className="nav-links">
            <li>
              <Link to="/" children="Home" />
            </li>
            <li>
              <Link to="/about" children="About" />
            </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
