import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Root } from './components/root'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/Navbar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
      
     <Navbar/>
    </BrowserRouter>
  </React.StrictMode>,
)