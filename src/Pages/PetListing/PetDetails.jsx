import { useLoaderData } from "react-router-dom";
import Modal from "../../components/Modal";



const PetDetails = () => {
    const { _id, petImage, petName, petAge, email, addedDate, category, location, short_description, long_description } = useLoaderData()

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure><img className="h-96" src={petImage} alt="Album" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    Name: {petName}
                    <div className="badge badge-secondary">Added Date:  {addedDate}</div>
                </h2>
                <h2 className="card-title">
                    Category: {category}
                    <div className="badge badge-secondary">Pet Location:  {location}</div>
                </h2>
                <h2 className="card-title">
                    Pet Info: {short_description}
                    <div className="badge badge-secondary">Age:  {petAge}</div>
                </h2>

                <p>Pet Full Info: {long_description}</p>
                <Modal _id={_id}></Modal>
                
                
            </div>
        </div>
    );
};

export default PetDetails;