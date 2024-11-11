import { useLoaderData, useParams } from "react-router-dom";
import Title from "../../components/Title";
import PetListingCard from "../PetListing/PetListingCard";
import { useState } from "react";

const CategoryPets = () => {
  const loadedData = useLoaderData();
  const { category } = useParams();

  console.log(loadedData);
  console.log(category);
  const remaining = loadedData
    ?.filter((cat) => cat.category === category)
    ?.filter((pet) => pet.adopted !== true);

  console.log(remaining);

  return (
    <div>
      {remaining.length > 0 && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {remaining.map((pet) => (
            <PetListingCard
              key={remaining._id}
              pet={pet}
              filteredData={remaining}
            ></PetListingCard>
          ))}
        </div>
      )}
      {remaining.length === 0 && (
        <div className="mt-12">
          <Title subHeading="Currently No Data Available" />
        </div>
      )}
    </div>
  );
};

export default CategoryPets;
