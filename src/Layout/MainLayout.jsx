import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Home/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div >
            <div className="pt-10 mb-24">
            <Navbar ></Navbar>
            </div>
            <div ><Outlet></Outlet></div>
        </div>
    );
};

export default MainLayout;