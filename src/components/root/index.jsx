import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { navbar } from '../utils/navbar'; // Adjust path to navbar.js
import Navbar from '../Navbar'; // Adjust path to Navbar.jsx

const Root = () => {
  return (
    <Routes>
      {/* Parent Route with Navbar */}
      <Route path="/" element={<Navbar />}>
        {/* Redirect default "/" to signup */}
        <Route index element={<Navigate to="/signup" replace />} />

        {/* Map through navbar configuration to define routes */}
        {navbar.map((item) => (
          <Route key={item.id} path={item.path} element={item.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default Root;
