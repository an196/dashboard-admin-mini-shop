import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Layout } from './components';
import { Dashboard, Login } from './pages';
import RequireAuth from './features/auth/RequireAuth';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        {/* public routes */}
        <Route path='login' element={<Login />} />
        {/* protected routes */}
        <Route element={<RequireAuth/>}>
          <Route path='/*' element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
