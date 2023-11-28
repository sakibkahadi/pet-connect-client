import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MainTitle from "../../components/MainTitle";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";



const AllPets = () => {
    const axiosSecure = useAxiosSecure()
  
    const { data: pets = [], refetch } = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/pets')
            return res.data
        }
    })
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
                                text: "Pet is Deleted Successfully",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    const handleAdoptNow = async(id) =>{
       
        Swal.fire({
            title: "Are you sure you want to Change the status",
           
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want to Change"
        }).then((result) => {
            console.log(result)
            
            if (result.isConfirmed) {
                const petInfo ={
                    adopted: true,
                }
                refetch()
                const adoptRes = axiosSecure.patch( `/pets/${id}`,  petInfo)
                console.log(adoptRes.data)
                refetch()
                
                
            }
        }
            )
    }
    
    const handleNotAdopted = async(id) =>{
       const res = await axiosSecure.get(  `/pets/${id}`)
        Swal.fire({
            title: "Are you sure you want to Change the status",
           
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want to Change"
        }).then((result) => {
            console.log(result)
            
            if (result.isConfirmed) {
                const petInfo ={
                    adopted: false,
                }
                refetch()
                const adoptRes = axiosSecure.patch( `/pets/${id}`,  petInfo)
                console.log(adoptRes.data)
                 refetch()
                
                
                
            }
        }
            )
    }
    
    return (
        <div>
            <MainTitle heading="All Pets" />
            <div className="overflow-x-auto">
                <table className="table table-zebra text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Change Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet, index)=><tr key={pet._id}>
                            <th>{index+1}</th>
                            <td><img className="h-12 w-12" src={pet.petImage} alt="" /></td>
                            <td>{pet.petName}</td>
                            <td>{pet.email}</td>
                            <th className="text-red-500">{pet.adopted ? "Adopted" : "Not Adopted"}</th>
                            <td>
                                {pet.adopted !== true ? <button onClick={() => handleAdoptNow(pet._id)} className="btn ">Adopt Now</button>:
                                <button onClick={() => handleNotAdopted(pet._id)} className="btn ">Not Adopted</button>
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
        </div>
    );
};

export default AllPets;