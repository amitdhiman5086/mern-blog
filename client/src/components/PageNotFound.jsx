import React from "react";
import { Button } from "flowbite-react"; // Optional from React Flowbite
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-2xl md:text-3xl font-medium mt-4 text-gray-900">
          Oops! Page not found
        </p>
        <p className="text-md mt-2 text-gray-600">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to={"/"}>
            <Button color="blue" size="lg">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
