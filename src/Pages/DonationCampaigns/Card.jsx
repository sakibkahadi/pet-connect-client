

const Card = ({ pet }) => {
    const {petImage, petName, maxDonation, addedDate} = pet
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img className="w-full h-[400px]" src={petImage} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{petName}</h2>
                <p>{maxDonation}</p>
                <p>{addedDate}</p>
                <div className="card-actions text-center w-full">
                    <button className="btn btn-primary">view Details</button>
                </div>
            </div>
        </div>
    );
};

export default Card;