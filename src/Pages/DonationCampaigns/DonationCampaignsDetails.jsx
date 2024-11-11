import { Link, useLoaderData, useLocation } from "react-router-dom";
import DonationModal from "../../components/DonationModal";
import { useEffect, useState } from "react";

const DonationCampaignsDetails = () => {
  const {
    email,
    lastDate,
    long_description,
    short_description,
    maxDonation,
    petImage,
    petName,
    donation,
    status,
    _id,
  } = useLoaderData();
  const [remaining, setRemaining] = useState(maxDonation);

  const [remainingCampaigns, setRemainingCampaigns] = useState([]);
  const dataLocation = useLocation();
  const filteredData = dataLocation.state?.filteredData;

  useEffect(() => {
    if (filteredData?.length) {
      const scanCampaigns = filteredData.filter(
        (campaign) => campaign._id !== _id
      );
      setRemainingCampaigns(scanCampaigns);
    }
  }, [filteredData, _id]);

  return (
    <div>
      {/* Main Campaign Details */}
      <div className="card lg:card-side bg-base-100 shadow-xl mb-8">
        <figure className="lg:w-1/2">
          <img className="h-96 w-full" src={petImage} alt="Album" />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title block text-center text-3xl text-green-600">
            Name: <span className="font-bold">{petName}</span>
          </h2>
          <h2 className="card-title text-gray-500">
            Remaining: $<span className="font-bold">{remaining}</span>
          </h2>
          <div>
            <span className="font-bold">
              Last Date: {lastDate.slice(0, 10)}
            </span>
          </div>
          <p className="text-orange-600 font-semibold">
            Short Info:{" "}
            <span className="font-normal text-black text-sm">
              {short_description}
            </span>
          </p>
          <p className="text-orange-600 font-semibold">
            Pet Full Info:{" "}
            <span className="font-normal text-black text-sm">
              {long_description}
            </span>
          </p>
          <div className="flex justify-center">
            {status === "active" ? (
              <DonationModal
                setRemaining={setRemaining}
                _id={_id}
                email={email}
                maxDonation={maxDonation}
              />
            ) : (
              <p className="text-blue-700 font-bold">
                Donation Campaign is Pause{" "}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Other Campaigns Section */}
      {remainingCampaigns.length > 0 && (
        <div>
          <h1 className="text-4xl text-center mb-10">Other Campaigns</h1>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {remainingCampaigns.map((campaign) => (
              <div key={campaign._id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    className="w-full h-[200px]"
                    src={campaign.petImage}
                    alt={campaign.petName}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-center text-green-600">
                    {campaign.petName}
                  </h2>
                  <p className="text-gray-500">
                    Maximum Donation: ${campaign.maxDonation}
                  </p>
                  <Link
                    to={`/donationCampaigns/${campaign._id}`}
                    state={{ filteredData }}
                  >
                    <button className="btn btn-error text-white w-full mt-4">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationCampaignsDetails;
