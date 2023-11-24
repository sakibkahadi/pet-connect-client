import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";

const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path:"/",
          element: <Home></Home>
        },

        {
          path:'login',
          element: <Login></Login>
        },
        {
          path:'signUp',
          element:<SignUp></SignUp>
        }
      ]
    },
  ]);
 
  export default Router;