import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Navbar from "../Navbar/Navbar";
import PetsCategory from "../PetsCategory/PetsCategory";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Pet Connect || Home</title>
            </Helmet>
            <div className="mt-10 mb-12">
            <Navbar ></Navbar>
            </div>
            <div className="mb-12">
            <Banner></Banner>
            </div>
            <div>
                <PetsCategory></PetsCategory>
            </div>
        </div>
    );
};

export default Home;