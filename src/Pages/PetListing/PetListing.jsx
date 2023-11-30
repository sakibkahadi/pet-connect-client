import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import PetListingCard from "./PetListingCard";
import { FaSearch } from "react-icons/fa";
import MainTitle from "../../components/MainTitle";
import { Helmet } from "react-helmet-async";

const PetListing = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [searchData, setSearchData] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const loadedData = useLoaderData();

    useEffect(() => {
        if (Array.isArray(loadedData)) {
            const remaining = loadedData.filter((pet) => !pet.adopted);

            // Search functionality
            const filteredPets = searchData ? remaining.filter((pet) => pet.petName.toLowerCase().includes(searchData.toLowerCase())) : remaining;
            
            

            // Category filter
            const categoryFilteredPets = selectedCategory    ? filteredPets.filter((pet) => pet.category.toLowerCase() === selectedCategory.toLowerCase())  : filteredPets;

            const sortedData = categoryFilteredPets.sort((first, second) => {
                const firstData = new Date(first.addedDate).getTime();
                const secondData = new Date(second.addedDate).getTime();
                return secondData - firstData;
            });

            setFilteredData(sortedData);
        }
    }, [loadedData, searchData, selectedCategory]);

    const handleSearch = (e) => {
        setSearchData(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div>
             <Helmet>
                <title>Pet Connect || Pet Listing</title>
            </Helmet>
            <MainTitle heading="Not Adopted Pets"></MainTitle>

            <div className="flex justify-center gap-6 mb-6">
                <div className="relative text-gray-600">
                    <input
                        type="search"
                        name="search"
                        placeholder="Search by Pet Name"
                        value={searchData}
                        onChange={handleSearch}
                        className="bg-white h-14 px-5 pr-10 rounded-full text-sm focus:outline-none w-52"
                    />
                    <button type="submit" className="absolute left-44 top-5">
                        <FaSearch />
                    </button>
                </div>

                {/* Category Dropdown */}
                <div className="relative text-gray-600">
                    <select  className="bg-white h-14 px-5 pr-10 rounded-full text-sm focus:outline-none appearance-none"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">All Categories</option>
                        <option value="cats">Cats</option>
                        <option value="fish">Fish</option>
                        <option value="rabbits">Rabbits</option>
                        <option value="dogs">Dogs</option>
                    </select>
                    
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((pet) => (
                    <PetListingCard key={pet._id} pet={pet}></PetListingCard>
                ))}
            </div>
        </div>
    );
};

export default PetListing;
