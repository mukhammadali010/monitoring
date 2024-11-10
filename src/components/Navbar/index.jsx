import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './style.scss';
import logo from '../../assets/img/image.png';

export const Navbar = () => {
  return (
    <header>
      <div className='container'>
        <img width={'200px'} src={logo} alt="Logo" />
        <nav>
          <Link to="/bosh-sahifa">Bosh Sahifa</Link>  {/* Use Link instead of <a> */}
          <Link to="/sanoat">Sanoat</Link>            {/* Use Link for routing */}
          <Link to="/aloqa">Aloqa</Link>             {/* Use Link for routing */}
        </nav>
      </div>
    </header>
  );
};
