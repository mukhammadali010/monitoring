import React, { useState } from 'react';
import Mycontext from '../context';
import { Container } from './style';
import ConditionalYandex from '../Yandex';
import MapComponent from '../YandexData';
import Axborot from '../Axborot';
import Malumotlar from '../Malumotlar';
import Footer from '../Footer';

const Home = () => {
  const [data, setData] = useState('');

  return (
    <Container>
      <Mycontext.Provider value={{ data, setData }}>
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
