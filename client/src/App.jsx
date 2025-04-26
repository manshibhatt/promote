// App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyBusiness from './pages/Business';
import ProfilePage from './pages/ProfilePage';

function App() {
  const router= createBrowserRouter([
    {
      path:"/",
      element:(
        <Dashboard/>
      )
    },
    {
      path:"/register",
      element:(
        <Register/>
      )
    },
    {
      path:"/login",
      element:(
        <Login/>
      )
    },
    {
      path:"/business",
      element:(
        <VerifyBusiness/>
      )
    },
    {
      path:"/profile/:userId",
      element:(
        <ProfilePage/>
      )
    }

  ])
  return (
   <RouterProvider router={router}/>
  );
};

export default App;
