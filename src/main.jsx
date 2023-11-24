import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Home";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import Context from "./Context";
import All from "./All";
import Login from "./Login";
import Signin from "./Signin";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <All></All>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'signin',
        element:<Signin></Signin>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Context>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </Context>
    </QueryClientProvider>
  </React.StrictMode>
);
