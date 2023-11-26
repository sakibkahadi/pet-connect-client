
const PetListingCard = ({ pet }) => {
    const { petImage, petName, petAge, location, addedDate    } = pet
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure><img src={petImage} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{petName}</h2>
                <div>
                    <span>{petAge}</span>
                    <span>{location}</span>
                    
                </div>
                <p>{addedDate}</p>
                <button className="btn btn-success text-white">View Details</button>
            </div>
        </div>
    );
};

export default PetListingCard;