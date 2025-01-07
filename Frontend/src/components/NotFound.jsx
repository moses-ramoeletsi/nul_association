import React from "react";
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <a href="/" className="text-green-600 hover:text-green-800 font-medium">
          Return to homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
