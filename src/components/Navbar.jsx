import React from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isNotIndexRoute = location.pathname !== "/";

  return (
    <nav>
      <h1>
        {isNotIndexRoute && (
          <Link className="link-back" to="/">
            &lt;&lt; Back
          </Link>
        )}
        Coin Fetcher
      </h1>
    </nav>
  );
};

export default Navbar;
