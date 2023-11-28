
import MainTitle from "../../components/MainTitle";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import usePet from "../../hooks/usePet";
import Swal from "sweetalert2";
import Title from "../../components/Title";



const MyAddedPet = () => {
    const [pets, refetch] = usePet()
    const axiosSecure = useAxiosSecure()
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/pets/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    const handleAdopt = id => {
        
        Swal.fire({
            title: "Are you sure you want to adopt?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want to adopt"
        }).then((result) => {
            refetch()
            if (result.isConfirmed) {
                const petInfo ={
                    adopted: true,
                }
                
                const adoptRes = axiosSecure.patch( `/pets/${id}`,  petInfo)
                console.log(adoptRes.data)
                refetch()
                
                
            }})
    }

    return (
        <div>
            <div className="font-italic"><MainTitle heading="My Added Pets" /></div>
            {
                pets.length > 0 && <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                Serial Number
                            </th>
                            <th>Image</th>
                            <th>Pet Name</th>
                            <th>Category </th>
                            <th>Adoption Status</th>
                            <th>Adopt</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {pets.map((pet, index) => <tr key={pet._id}>
                            <th>
                                {index + 1}
                            </th>
                            <td>
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={pet.petImage} alt="Avatar Tailwind CSS Component" />
                                </div>
                            </td>
                            <td>
                                {pet.petName}

                            </td>
                            <td>{pet.category}</td>
                            <td className="text-red-600 font-bold">
                                {pet.adopted ? "Adopted": "Not Adopted"}
                                
                            </td>
                            <td>
                                {pet.adopted !== true ? <button onClick={() => handleAdopt(pet._id)} className="btn ">Adopt Now</button>:
                                <button onClick={() => handleAdopt(pet._id)} disabled className="btn ">Adopt Now</button>
                            }
                            </td>
                            <td className="flex flex-col gap-1 items-center  text-xl">
                                <Link to={`/dashboard/myAddedPets/${pet._id}`} ><FaEdit ></FaEdit></Link>
                                <MdDelete onClick={() => handleDelete(pet._id)} />
                            </td>
                        </tr>)}

                    </tbody>


                </table>
            </div>
            }
            {
                pets.length === 0 && <div className="mt-12"><Title subHeading="You Have Not Added Any Pet Yet"/></div>
            }
            
        </div>
    );
};

export default MyAddedPet;