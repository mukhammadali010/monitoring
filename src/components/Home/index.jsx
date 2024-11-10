import React from 'react'
import { useState } from 'react'
import Mycontext from '../context'
import { Container } from './style'
import { Root } from '../root'
import { Navbar } from '../Navbar'
import ConditionalYandex from '../Yandex'
import MapComponent from '../YandexData'

const Home = () => {
  const [data , setData] = useState('')
  return (
    <Container>
      <Mycontext.Provider value={{data , setData}}>
     <Root/>
     <Navbar/>
     <ConditionalYandex/>
     <MapComponent/>
      </Mycontext.Provider>
    </Container>
  )
}

export default Home