import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import logo from '../../assets/img/image.png';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className='container'>
        <img width={'150px'} src={logo} alt="Logo" />
        <nav className={menuOpen ? 'open' : ''}>
          <Link to="/bosh-sahifa" onClick={toggleMenu}>Bosh Sahifa</Link>
          <Link to="/sanoat" onClick={toggleMenu}>Sanoat</Link>
          <Link to="/aloqa" onClick={toggleMenu}>Aloqa</Link>
        </nav>
        <button className='menu-toggle' onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
};
