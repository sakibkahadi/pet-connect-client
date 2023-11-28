import Description from "../../../components/Description";
import MainTitle from "../../../components/MainTitle";
import expertImage1 from '../../../assets/experts/expert1.jpg'
import expertImage2 from '../../../assets/experts/expert2.jpg'
import expertImage3 from '../../../assets/experts/expert3.jpg'
import expertImage4 from '../../../assets/experts/expert4.jpg'
const MeetOurExperts = () => {
    return (
        <div>
            <div>
                <MainTitle heading="Meet Our Expert Teams" />
                <div className="md:w-3/4 mx-auto">
                    <Description description="At Pet Connect, our team is passionate about connecting pets with loving families. Our dedicated experts work tirelessly to ensure the well-being of every furry friend in our care. Get to know the faces behind the mission" />
                </div>
            </div>
            <div className="md:w-3/4 md:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
                {/* card 1 */}
                <div className="card card-compact  bg-base-100 shadow-xl">
                    <figure><img className="w-full h-52" src={expertImage1} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-green-600 font-bold ">Dr. Rodriguez</h2>
                         <p className="text-blue-800 font-semibold">Chief Veterinarian</p>
                        
                    </div>
                </div>
                {/* card 2 */}
                <div className="card card-compact  bg-base-100 shadow-xl">
                    <figure><img className="w-full h-52" src={expertImage2} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-green-600 font-bold ">Sarah Anderson</h2>
                         <p className="text-blue-800 font-semibold">Adoption Coordinator</p>
                        
                    </div>
                </div>
                {/* card 3 */}
                <div className="card card-compact  bg-base-100 shadow-xl">
                    <figure><img className="w-full h-52" src={expertImage3}alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-green-600 font-bold ">Michael Davis</h2>
                         <p className="text-blue-800 font-semibold">Animal Behavior Specialist</p>
                        
                    </div>
                </div>
                {/* card 4 */}
                <div className="card card-compact  bg-base-100 shadow-xl">
                    <figure><img className="w-full h-52" src={expertImage4}alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-green-600 font-bold ">Alexandra Garcia</h2>
                         <p className="text-blue-800 font-semibold">Community Engagement Manager</p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetOurExperts;