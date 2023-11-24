import Marquee from "react-fast-marquee";
import Description from "../../../components/Description";
import MainTitle from "../../../components/MainTitle";
import Heading1 from "./Heading1";
import Heading2 from "./Heading2";


const SomeInfo = () => {
    return (
        <Marquee pauseOnHover >
           <div className="mr-12"> <Heading1></Heading1></div>
           <div className="mr-12"> <Heading2></Heading2></div>
            
        </Marquee>
    );
};

export default SomeInfo;