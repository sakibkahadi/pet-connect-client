import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Home/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div >
            <div className="mt-10 mb-12">
            <Navbar ></Navbar>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;