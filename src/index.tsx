import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "./app/store";
import App from "./App";
import { Country } from "./pages/country";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<App />} />
            <Route path="country/:countryName" element={<Country />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
