import Description from "../../../components/Description";
import MainTitle from "../../../components/MainTitle";
import Title from "../../../components/Title";


const AboutUs = () => {
    return (
        <div className="bg-orange-100 md:px-10 ">
            <div>
                <div className="pt-12"><MainTitle heading="About Us"></MainTitle></div>
                {/* image */}
                <img className="h-[450px] w-full mb-12 mt-12" src="https://i.ibb.co/kDLpwGQ/cute-animals-group-white-background.jpg" alt="" />
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {/* content-part */}
                <div>
                    <Title subHeading="How it Works"></Title>
                    <Description description="PetConnect operates as a bridge, connecting prospective pet parents with animals seeking loving homes. Our platform features a carefully curated selection of pets from reputable shelters and rescue organizations. "></Description>
                </div>
                <div>
                    <Title subHeading="Why PetConnect"></Title>
                    <Description description="PetConnect was born out of a shared love for animals and a desire to make a positive impact on their lives. We believe that every pet deserves a safe and loving home, and every human deserves the joy and companionship that comes with having a furry friend."></Description>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;