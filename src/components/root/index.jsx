import React from 'react';
import { Route, Routes } from 'react-router-dom';
import navbar from '../utils/navbar';

export const Root = () => {
  return (
    <div className='container'>
      <Routes>
        {navbar.map((parent) => {
          // Destructure the elements
          const Element = parent.element;
          return (
            <Route key={parent.path} path={parent.path} element={Element}>
              {/* Render children for nested routes */}
              {parent.children && parent.children.length > 0 && (
                parent.children.map((child) => (
                  <Route key={child.path} path={child.path} element={child.element} />
                ))
              )}
            </Route>
          );
        })}
      </Routes>
    </div>
  );
};
