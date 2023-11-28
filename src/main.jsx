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
import Payment from "./Payment/Payment";
import PaymentList from "./Admin/paymentList";
import SurveyPublish from "./Admin/SurveyPublish";
import UpdateSurvey from "./Surveyor/UpdateSurvey";
import AllSurvey from "./AllSurvey";
import PrivateRoute from "./PrivateRoute";
import AdminProvider from "./Admin/AdminProvider";
import ErrorPage from "./ErrorPage";
import DashboardSurveyor from "./Surveyor/DashboardSurveyor";
import SurveyorProvider from "./Surveyor/SurveyorProvider";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <All></All>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signin",
        element: <Signin></Signin>,
      },
      {
        path: "/survey",
        element: <AllSurvey></AllSurvey>,
      },
      {
        path: "/surveyDetails/:_id",
        element: <SurveyDetails></SurveyDetails>,
      },
      {
        path: "/beProUser",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin",
        element: <AdminProvider><DashBoard></DashBoard> </AdminProvider>,
        children: [
          {
            path: "/admin/user",
            element: <AdminProvider><User></User></AdminProvider>,
          },
          {
            path: "/admin/paymentHistory",
            element: <AdminProvider><PaymentList></PaymentList></AdminProvider>,
          },
          {
            path: "/admin/surveyStaus",
            element: <AdminProvider><SurveyPublish></SurveyPublish></AdminProvider>,
          },
        ],
      },
      {
        path: "/survyor",
        element: <SurveyorProvider><DashboardSurveyor></DashboardSurveyor></SurveyorProvider>,
        children: [ {
          path: "/survyor/createSurvey",
          element: (
            <SurveyorProvider>
              <CreateSurvey></CreateSurvey>
            </SurveyorProvider>
          ),
        },
        {
          path: "/survyor/updateSurvey/:_id",
          element: <SurveyorProvider><UpdateSurvey></UpdateSurvey></SurveyorProvider>,
        },{
          path:"/survyor/unPblishedSurvey"
        }
        ]
      }
    ],
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
