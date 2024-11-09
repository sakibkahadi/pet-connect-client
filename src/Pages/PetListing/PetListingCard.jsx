import { Link } from "react-router-dom";

const PetListingCard = ({ pet, filteredData }) => {
  const { _id, petImage, petName, petAge, location } = pet;
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img className="h-[350px] w-full" src={petImage} alt="Pet" />
      </figure>
      <div className="card-body">
        <h2 className="card-title block text-center text-green-600">
          Pet Name: <span className="text-green-700 font-bold">{petName}</span>
        </h2>
        <div className="flex mt-2 mb-2 items-center justify-between gap-5 text-blue-300 font-bold">
          <span>Age: {petAge}</span>
          <span>Location: {location}</span>
        </div>
        <Link
          to={{
            pathname: `/petListing/${_id}`,
          }}
          state={{ filteredData }}
        >
          <button className="btn btn-error w-full text-white">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PetListingCard;
