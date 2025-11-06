// src/components/Loader.jsx
import React from "react";

const Loader = ({ message="Loading portfolio..."   }) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-secondary">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
