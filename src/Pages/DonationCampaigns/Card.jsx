import { Link } from "react-router-dom";

const Card = ({ pet, campaigns }) => {
  const { petImage, petName, maxDonation, addedDate, _id } = pet;

  // Calculate the total donated amount for this pet
  const donated = campaigns
    .filter((campaign) => campaign.petId === _id) // Adjust based on campaign structure
    .reduce((total, campaign) => total + campaign.donatedAmount, 0);

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="w-full h-[350px]" src={petImage} alt={petName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title block text-center text-green-600 ">
          Pet Name: <span className="text-green-700 font-bold">{petName}</span>
        </h2>
        <h2 className="card-title text-gray-500">
          Maximum Amount: <span className="font-bold ">$ {maxDonation}</span>
        </h2>
        <h2 className="card-title text-gray-500">
          Donated Amount: <span className="font-bold ">$ {donated}</span>
        </h2>

        <Link
          to={`/donationCampaigns/${_id}`}
          state={{ filteredData: campaigns }}
        >
          <button className="btn btn-error text-white w-full mt-12">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
