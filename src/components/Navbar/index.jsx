import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./style.scss"; // Ensure this file styles the navbar
import logo from "../../assets/img/image.png";
import { navbar } from "../utils/navbar"; // Adjust path

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [updatedNavbar, setUpdatedNavbar] = useState(navbar);
  const location = useLocation();
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Simulate a login action for example purposes
  useEffect(() => {
    // Check if the user has logged in, using sessionStorage or any state management
    if (sessionStorage.getItem('isLoggedIn')) {
      if (!hasLoggedIn) {
        // Trigger page reload only once after login
        window.location.reload();
        setHasLoggedIn(true); // Prevent further reloads
      }
    }
  }, [hasLoggedIn]);

  // Update `isHidden` based on the current path
  useEffect(() => {
    const hiddenPathsForMain = ["/signin", "/signup"];
    const hiddenPathsForAuth = ["/automobilSanoat", "/home", "/contact"];

    const newNavbar = navbar.map((item) => {
      // Hide "Home", "AutoSanoat", and "Contact us" on Sign In/Sign Up pages
      if (hiddenPathsForMain.includes(location.pathname)) {
        return {
          ...item,
          isHidden: ["Home", "AutoSanoat", "Contact us"].includes(item.title),
        };
      }

      // Hide "Sign In" and "Sign Up" on automobilSanoat, home, and contact pages
      if (hiddenPathsForAuth.includes(location.pathname)) {
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
