import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddPet from "../Dashboard/AddAPet/AddPet";
import MyAddedPet from "../Dashboard/MyAddedPet/MyAddedPet";
import Update from "../Dashboard/MyAddedPet/Update";

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
    //dashboard
    {
      path:"/dashboard",
      element:<PrivateRoute> <Dashboard/></PrivateRoute> ,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'addPet',
          element:<AddPet></AddPet>
        },
        {
          path:'myAddedPets',
          element:<MyAddedPet></MyAddedPet>
        },
        {
          path:'/dashboard/myAddedPets/:id',
          element:<Update/>
        }
      ]
    }
  ]);
 
  export default Router;