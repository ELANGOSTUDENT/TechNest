import React from "react";
import { createBrowserRouter, RouterProvider,  Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Welcome from "./pages/Welcome";
import "./style.scss";


const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path : "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      },
      {
        path : "/admin",
        element: <Admin />
      },
      {
        path:"/blog",
        element:<Blog/>
      },
    ]
    
  },
  {
    path : "/register",
    element: <Register />
  },
  {
    path : "/login",
    element: <Login />
  },
  {
    path : "/welcome",
    element: <Welcome />
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;