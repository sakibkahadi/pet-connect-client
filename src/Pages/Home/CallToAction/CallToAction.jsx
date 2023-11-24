import MainTitle from "../../../components/MainTitle";
import CallToActionBanner from "./CallToActionBanner";


const CallToAction = () => {
    return (
        <div >
            <div className="mb-12"><MainTitle  heading="Change a Life, Adopt a Pet"></MainTitle></div>
            <CallToActionBanner></CallToActionBanner>
        </div>
    );
};

export default CallToAction;