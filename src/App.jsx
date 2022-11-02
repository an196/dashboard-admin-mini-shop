import {useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard, Login } from './pages';
import RequireAuth from './features/auth/RequireAuth';
import { Toaster } from 'react-hot-toast';
import {Helmet} from "react-helmet";


function App() {
  // useEffect(()=>{
  //   document.title = 'MiniShop';
  // })

  return (
    <div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>MiniShop</title>
                <link rel="icon" href='./assets/logo.png' />
            </Helmet>
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
