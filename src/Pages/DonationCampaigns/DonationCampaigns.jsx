import { useState } from "react";
import MainTitle from "../../components/MainTitle";
import { useEffect } from "react";
import Card from "./card";


const DonationCampaigns = () => {
    const [campaigns, setCampaigns] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/donationCampaigns')
        .then(res=>res.json())
        .then(data=>{
            const sortedCampaigns = data.sort((a, b) => {
                const dateA = new Date(a.addedDate).getTime();
                const dateB = new Date(b.addedDate).getTime();
                return dateB - dateA;
              });
              setCampaigns(sortedCampaigns)
        })
    },[])
    return (
        <div>
            <MainTitle heading="All Donation Campaign"/>
           <h1 className="text-center text-4xl font-bold text-black">Length: {campaigns.length}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {
                    campaigns.map(pet=><Card key={pet._id} pet={pet}/>)
                }
            </div>
        </div>
    );
};

export default DonationCampaigns;