import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import "./assets/styles/bootstrap.custom.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { HomeScreen } from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
    </Route>,
  ])
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
