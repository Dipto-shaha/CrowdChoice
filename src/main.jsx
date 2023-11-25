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
import User from "./Admin/User";
import DashBoard from "./Admin/DashBoard";
import CreateSurvey from "./Surveyor/createSurvey";
import SurveyDetails from "./SurveyDetails";

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
      },
      {
        path:'/createSurvey',
        element:<CreateSurvey></CreateSurvey>
      },
      {
        path:'/surveyDetails/:_id',
        element:<SurveyDetails></SurveyDetails>
      }
    ]

  },
  {
    path:'/admin',
    element:<DashBoard></DashBoard>,
    children:[
      {
          path:'/admin/user',
          element:<User></User>
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
