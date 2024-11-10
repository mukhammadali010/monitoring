import React from 'react';
import './style.scss';
import logo from '../../assets/img/image.png'

export const Navbar = () => {
  return (
    <header>
    <div className='container'>
      <img width={'200px'} src={logo} alt="" />
      <nav>
        <a href="/home">Bosh Sahifa</a>
        <a href="">Sanoat</a>
        <a href="">Aloqa</a>
      </nav>
    </div>
    </header>
  )
}
