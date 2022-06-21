import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { Layout,  } from "./components";
import {
  Dashboard,
  Login,
} from "./pages";


function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="login" element={<Login />} />
      {/* protected routes */}

      <Route path="/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
