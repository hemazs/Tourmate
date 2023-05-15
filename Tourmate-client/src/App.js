import React from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";

const App = () => {
  return (
    <div className="bg-gray-900 text-gray-50">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;
