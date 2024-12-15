import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { navbar } from "../utils/navbar"; // Import navbar configuration
import Navbar from "../Navbar"; // Adjust the path as needed

const Root = () => {
  return (
    <Routes>
      {/* Parent route with Navbar */}
      <Route path="/" element={<Navbar />}>
        {/* Default route redirects to /signin */}
        <Route index element={<Navigate to="/signin" replace />} />

        {/* Map through navbar configuration to define routes */}
        {navbar.map((item) => (
          <Route key={item.id} path={item.path} element={item.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default Root;
