import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';  // Import Outlet
import Mycontext from '../context';
import { Container } from './style';
import { Navbar } from '../Navbar';
import ConditionalYandex from '../Yandex';
import MapComponent from '../YandexData';
import Axborot from '../Axborot';
import Malumotlar from '../Malumotlar';
import Footer from '../Footer';

const Home = () => {
  const [data , setData] = useState('');

  return (
    <Container>
      <Mycontext.Provider value={{data , setData}}>
        <Navbar />
        {/* Render the nested route here */}
        <Outlet />  {/* This will render the nested route (like Sanoat) */}
        <ConditionalYandex />
        <MapComponent />
        <Axborot />
        <Malumotlar />
        <Footer />
      </Mycontext.Provider>
    </Container>
  );
};

export default Home;
