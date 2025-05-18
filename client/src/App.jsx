import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyBusiness from './pages/Business';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/postPage';
import MessageList from './pages/Conversation';
import MessagesPage from './pages/Chat';

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
      element:   <ProfilePage/>,
    
    },
    {
      path:"/postPage",
      element:(
        <PostPage/>
      )
    },
    {
      path:"/messages",
      element:(
        <MessageList/>
      )
    },
      {
        path: "/profile/:userId/chats", 
        element: <MessagesPage />,
      }

  ])
  return (
   <RouterProvider router={router}/>
   
  );
};

export default App;
