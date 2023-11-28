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
import CreateDonationCampaign from "../Dashboard/CreateDonationCampaign/CreateDonationCampaign";
import MyDonationCampaigns from "../Dashboard/MyDonationCampaigns/MyDonationCampaigns";
import PetListing from "../Pages/PetListing/PetListing";
import PetDetails from "../Pages/PetListing/PetDetails";
import AllUsers from "../Dashboard/AllUsers/AllUsers";
import AllPets from "../Dashboard/AllPets/AllPets";


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
        },
        {
          path:'petListing',
          element:<PetListing></PetListing>,
          loader: ()=>fetch('http://localhost:5000/pets')
        },{
          path: '/petListing/:id',
          element:<PetDetails></PetDetails>
          ,loader: ({params})=>fetch(`http://localhost:5000/pets/${params.id}`)
        }
      ]
    },
    //dashboard
    {
      path:"/dashboard",
      element:<PrivateRoute> <Dashboard/></PrivateRoute> ,
      errorElement:<ErrorPage/>,
      children:[
        // users 
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
          element:<Update/>,
          loader: ({params})=>fetch(`http://localhost:5000/pets/${params.id}`)
        },
        {
          path: 'createDonationCampaign',
          element: <CreateDonationCampaign/>
        },{
          path:'myDonatioCampaign',
          element:<MyDonationCampaigns/>,
          
        },

        // admins
        {
          path: 'allUsers',
          element: <AllUsers/>
        },
        {
          path:'allPets',
          element:<AllPets/>,
        },
      ]
    }
  ]);
 
  export default Router;