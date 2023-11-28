import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";

import PetsCategory from "../PetsCategory/PetsCategory";
import CallToAction from "../CallToAction/CallToAction";
import AboutUs from "../AboutUs/AboutUs";
import MeetOurExperts from "../MeetOurExperts/MeetOurExperts";
import FAQ from "../FAQ/FrequentlyAQ";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Pet Connect || Home</title>
            </Helmet>
            
            <div className="mb-12">
            <Banner></Banner>
            </div>
            <div className="mb-12">
                <PetsCategory></PetsCategory>
            </div>
            <div className="mb-12">
                <CallToAction></CallToAction>
            </div>
            <div className="mb-12">
                <AboutUs/>
            </div>
            <div className="m-12">
                <MeetOurExperts/>
            </div>
            <div>
                <FAQ/>
            </div>
        </div>
    );
};

export default Home;