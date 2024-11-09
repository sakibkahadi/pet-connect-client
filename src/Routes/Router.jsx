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
import Edit from "../Dashboard/MyDonationCampaigns/Edit";
import AllDonation from "../Dashboard/AllDonation/AllDonation";
import AdoptionRequest from "../Dashboard/AdoptionRequest/AdoptionRequest";
import MyDonation from "../Dashboard/MyDonation/MyDonation";
import DonationCampaigns from "../Pages/DonationCampaigns/DonationCampaigns";
import DonationCampaignsDetails from "../Pages/DonationCampaigns/DonationCampaignsDetails";
import AdminRoute from "./AdminRoute";
import CategoryPets from "../Pages/CategoryPets/CategoryPets";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "category/:category",
        element: <CategoryPets></CategoryPets>,
        loader: () => fetch("http://localhost:5000/pets"),
      },
      {
        path: "petListing",
        element: <PetListing></PetListing>,
        loader: () => fetch("http://localhost:5000/pets"),
      },
      {
        path: "/petListing/:id",
        element: (
          <PrivateRoute>
            <PetDetails></PetDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/pets/${params.id}`),
      },
      {
        path: "donationCampaigns",
        element: <DonationCampaigns />,
      },
      {
        path: "/donationCampaigns/:id",
        element: (
          <PrivateRoute>
            <DonationCampaignsDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donationCampaigns/${params.id}`),
      },
    ],
  },
  //dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // users
      {
        path: "addPet",
        element: (
          <PrivateRoute>
            <AddPet></AddPet>
          </PrivateRoute>
        ),
      },
      {
        path: "myAddedPets",
        element: (
          <PrivateRoute>
            <MyAddedPet></MyAddedPet>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myAddedPets/:id",
        element: (
          <PrivateRoute>
            <Update />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/pets/${params.id}`),
      },
      {
        path: "createDonationCampaign",
        element: (
          <PrivateRoute>
            <CreateDonationCampaign />
          </PrivateRoute>
        ),
      },
      {
        path: "myDonatioCampaign",
        element: (
          <PrivateRoute>
            <MyDonationCampaigns />,
          </PrivateRoute>
        ),
      },
      {
        path: "adoptionRequest",
        element: (
          <PrivateRoute>
            <AdoptionRequest></AdoptionRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "myDonation",
        element: (
          <PrivateRoute>
            <MyDonation />
          </PrivateRoute>
        ),
      },

      // admins
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "allPets",
        element: (
          <AdminRoute>
            <AllPets />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/myDonationCampaign/:id",
        element: (
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donationCampaigns/${params.id}`),
      },
      {
        path: "/dashboard/allDonations",
        element: (
          <AdminRoute>
            <AllDonation></AllDonation>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default Router;
