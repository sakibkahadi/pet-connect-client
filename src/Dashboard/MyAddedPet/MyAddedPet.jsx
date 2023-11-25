
import MainTitle from "../../components/MainTitle";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";



const MyAddedPet = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: pets = [] } = useQuery({
        queryKey: ['pets', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pets?email=${user.email}`)

            return res.data

        }
    })


    return (
        <div>
            <div className="font-italic"><MainTitle heading="My Added Pets" /></div>
            <div className="overflow-x-auto">
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
                                {pet.adapted? 'Adapted': 'Not Adapted'}
                            </td>
                            <td>
                                <button  className="btn ">Adopt Now</button>
                            </td>
                            <td className="flex flex-col gap-1 items-center  text-xl">
                                <Link to={`/dashboard/myAddedPets/${pet._id}`} ><FaEdit ></FaEdit></Link>
                                <MdDelete />
                            </td>
                        </tr>)}

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyAddedPet;