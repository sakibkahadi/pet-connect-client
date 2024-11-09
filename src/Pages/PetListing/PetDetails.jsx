import { useLoaderData, useLocation } from "react-router-dom";
import Modal from "../../components/Modal";
import PetListingCard from "./PetListingCard";
import { useState, useEffect } from "react";

const PetDetails = () => {
  const [remainingPets, setRemainingPets] = useState([]);
  const {
    _id,
    email,
    petImage,
    petName,
    petAge,
    addedDate,
    category,
    location,
    short_description,
    long_description,
  } = useLoaderData();
  const dataLocation = useLocation();
  const filteredData = dataLocation.state?.filteredData;

  useEffect(() => {
    if (filteredData?.length) {
      const scanPets = filteredData.filter((pet) => pet._id !== _id);
      setRemainingPets(scanPets);
    }
  }, [filteredData, _id]);

  return (
    <div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2">
          <img className="h-96 w-full" src={petImage} alt="Pet" />
        </figure>
        <div className="card-body lg:w-1/2 ">
          <h2 className="card-title block text-center text-3xl text-green-600">
            Name: <span className="font-bold">{petName}</span>
          </h2>
          <h2 className="card-title text-gray-500">
            Category: <span className="font-bold uppercase">{category}</span>
          </h2>
          <div className="text-blue-300 flex">
            <span className="mr-24">Age: {petAge}</span>
            <span>Location: {location}</span>
          </div>
          <div>
            <span className="font-bold">
              Added Date: {addedDate.slice(0, 10)}
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
          <div className="flex justify-center ">
            <Modal _id={_id} email={email}></Modal>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div>
        <div>
          <h1 className="text-4xl text-center mb-10">Other Pets</h1>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {remainingPets.map((pet) => (
            <PetListingCard
              key={pet._id}
              pet={pet}
              filteredData={filteredData}
            ></PetListingCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
