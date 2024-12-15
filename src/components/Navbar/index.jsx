import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./style.scss"; // Ensure this file styles the navbar
import logo from "../../assets/img/image.png";
import { navbar } from "../utils/navbar"; // Adjust path

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [updatedNavbar, setUpdatedNavbar] = useState(navbar);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Update `isHidden` based on the current path
  useEffect(() => {
    const pathsWithLimitedLinks = ["/signin", "/signup"]; // Paths where only Sign In/Sign Up should be visible
    const pathsWithoutAuthLinks = ["/home"]; // Paths where Sign In/Sign Up should not be visible

    const newNavbar = navbar.map((item) => {
      // Show only "Sign In" and "Sign Up" on Sign In/Sign Up pages
      if (pathsWithLimitedLinks.includes(location.pathname)) {
        return {
          ...item,
          isHidden: !["Sign In", "Sign Up"].includes(item.title),
        };
      }

      // Hide "Sign In" and "Sign Up" on the homepage
      if (pathsWithoutAuthLinks.includes(location.pathname)) {
        return {
          ...item,
          isHidden: ["Sign In", "Sign Up"].includes(item.title),
        };
      }

      // Default: no items hidden
      return { ...item, isHidden: false };
    });

    setUpdatedNavbar(newNavbar);
  }, [location]);

  return (
    <React.Fragment>
      <header>
        <div className="container">
          <img width="150px" src={logo} alt="Logo" />
          <nav className={isMenuOpen ? "open" : ""}>
            {updatedNavbar.map(
              (item) =>
                !item.isHidden && (
                  <Link to={item.path} key={item.id}>
                    {item.title}
                  </Link>
                )
            )}
          </nav>
          {/* Hamburger menu button */}
          <button className="menu-toggle" onClick={toggleMenu}>
            &#9776;
          </button>
        </div>
      </header>
      <Outlet />
    </React.Fragment>
  );
};

export default Navbar;
