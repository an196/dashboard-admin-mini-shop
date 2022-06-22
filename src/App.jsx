import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Layout } from './components';
import { Dashboard, Login } from './pages';
import RequireAuth from './features/auth/RequireAuth';

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path='login' element={<Login />} />
      {/* protected routes */}
      <Route element={<RequireAuth/>}>
        <Route path='/*' element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
