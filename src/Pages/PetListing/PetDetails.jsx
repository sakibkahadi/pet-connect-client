import { useLoaderData } from "react-router-dom";
import Modal from "../../components/Modal";



const PetDetails = () => {
    const { _id, petImage, petName, petAge,  addedDate, category, location, short_description, long_description } = useLoaderData()

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure className="lg:w-1/2"><img className="h-96 w-full" src={petImage} alt="Album" /></figure>
            <div className="card-body lg:w-1/2 ">
                <h2 className="card-title block text-center text-3xl text-green-600">
                    Name: <span className="font-bold">{petName}</span>
                    {/* <div className="badge badge-secondary">Added Date:  {addedDate}</div> */}
                </h2>
                <h2 className="card-title text-gray-500">
                    Category: <span className="font-bold uppercase">{category}</span>
        
                </h2>
                <div className="text-blue-300 flex">
                    <span className="mr-24">Age: {petAge}</span>
                    <span>Location: {location}</span>
                    
                </div>
                <div><span className="font-bold">Added Date: {addedDate.slice(0,10)}</span></div>
                <p className="text-orange-600 font-semibold">Short Info: <span className="font-normal text-black text-sm">{short_description}</span></p>
                
                <p className="text-orange-600 font-semibold">Pet Full Info: <span className="font-normal text-black text-sm">{long_description}</span></p>
               <div className="flex justify-center ">
               <Modal _id={_id}></Modal>
               </div>
                
                
            </div>
        </div>
    );
};

export default PetDetails;