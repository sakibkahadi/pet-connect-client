import { useLoaderData } from "react-router-dom";
import DonationModal from "../../components/DonationModal";


const DonationCampaignsDetails = () => {
    const { addedDate, email, lastDate, long_description, short_description, maxDonation, petImage, petName, _id } = useLoaderData()
    
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2"><img className="h-96 w-full" src={petImage} alt="Album" /></figure>
        <div className="card-body lg:w-1/2 ">
            <h2 className="card-title block text-center text-3xl text-green-600">
                Name: <span className="font-bold">{petName}</span>
                {/* <div className="badge badge-secondary">Added Date:  {addedDate}</div> */}
            </h2>
            <h2 className="card-title text-gray-500">
                Maximum Donation : $<span className="font-bold ">{maxDonation}</span>
    
            </h2>
            {/* <div className="text-blue-300 flex">
                <span className="mr-24">Age: {petAge}</span>
                <span>Location: {location}</span>
                
            </div> */}
            <div><span className="font-bold">Last Date: {lastDate.slice(0,10)}</span></div>
            <p className="text-orange-600 font-semibold">Short Info: <span className="font-normal text-black text-sm">{short_description}</span></p>
            
            <p className="text-orange-600 font-semibold">Pet Full Info: <span className="font-normal text-black text-sm">{long_description}</span></p>
           <div className="flex justify-center ">
           <DonationModal _id={_id} email={email} maxDonation={maxDonation}/>
           </div>
            
            
        </div>
    </div>
    );
};

export default DonationCampaignsDetails;