import React from 'react'
import { Route, Routes } from 'react-router-dom'
import navbar from '../utils/navbar'

export const Root = () => {
  return (
    <div className='container'>
        <Routes>
          {
            navbar.map((parent)=>{
            const Element = parent.element;
            return(
              <Route key={parent.path} path={parent.path} element={<Element/>}/>              
            )
            })
          }
        </Routes>
    </div>
  )
}
