import { useState } from "react";
import MainTitle from "../../components/MainTitle";
import { useEffect } from "react";
import Card from "./card";
import { Helmet } from "react-helmet-async";
import Title from "../../components/Title";

const DonationCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch("https://pet-connect-server.vercel.app/donationCampaigns")
      .then((res) => res.json())
      .then((data) => {
        const sortedCampaigns = data.sort((a, b) => {
          const dateA = new Date(a.addedDate).getTime();
          const dateB = new Date(b.addedDate).getTime();
          return dateB - dateA;
        });
        setCampaigns(sortedCampaigns);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Pet Connect || Donation Campaign</title>
      </Helmet>
      <MainTitle heading="All Donation Campaign" />
      {campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {campaigns.map((pet) => (
            <Card key={pet._id} campaigns={campaigns} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <Title subHeading="Loading .........." />
        </div>
      )}
    </div>
  );
};

export default DonationCampaigns;
