import MainTitle from "../../../components/MainTitle";
import CallToActionBanner from "./CallToActionBanner";
import SomeInfo from "./SomeInfo";


const CallToAction = () => {
    return (
        <div >
            <div className="mb-12"><MainTitle  heading="Change a Life, Adopt a Pet"></MainTitle></div>
            <div className="mb-6"><SomeInfo ></SomeInfo></div>
            <CallToActionBanner></CallToActionBanner>
            
        </div>
    );
};

export default CallToAction;