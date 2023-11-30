import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Pages/Home/Navbar/Navbar";
import useAdmin from "../hooks/useAdmin";
import { Helmet } from "react-helmet-async";
const Dashboard = () => {
    const [isAdmin] = useAdmin()

    return (
       <div >
         <Helmet>
                <title>Pet Connect || Dashboard</title>
            </Helmet>
        <div className="pt-10 mb-24">
            <Navbar ></Navbar>
            </div>
         <div className="lg:flex">
            <div className="lg:w-64 lg:min-h-screen  bg-cyan-600">
                <ul className=" text-black font-bold flex lg:flex-col gap-6 flex-wrap justify-center p-4">
                    {
                        isAdmin ? <> <li>
                        <NavLink to="/dashboard/addPet">
                            Add a pet</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myAddedPets">
                            
                            My Added Pets</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/adoptionRequest">
                           
                            Adoption Request</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/createDonationCampaign">
                            
                           Create Donation Campaign</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myDonatioCampaign">
                            
                            My Donation Campaign</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myDonation">
                            
                            My Donation </NavLink>
                    </li>
                    <div className=" divider"></div>
                    <li>
                        <NavLink to="/dashboard/allUsers">
                            
                            All Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allPets">
                            
                            All Pets</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allDonations">
                            
                            All Donations</NavLink>
                    </li>
                        </>:
                        // users display
                        <>
                        <li>
                        <NavLink to="/dashboard/addPet">
                            Add a pet</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myAddedPets">
                            
                            My Added Pets</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/adoptionRequest">
                           
                            Adoption Request</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/createDonationCampaign">
                            
                           Create Donation Campaign</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myDonatioCampaign">
                            
                            My Donation Campaign</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myDonation">
                            
                            My Donation </NavLink>
                    </li>
                        </>
                    }
                   
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
       </div>
    );
};

export default Dashboard;