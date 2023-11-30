
import MainTitle from '../../components/MainTitle';
import useAuth from '../../hooks/useAuth'

import Title from '../../components/Title';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const AdoptionRequest = () => {
    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()
   
    const { data: request = [], refetch,  } = useQuery({
        queryKey: ['request', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/adoptionRequest')
            const filter = res.data.filter(data => data.adminEmail === user?.email)
            return filter  

        }
    })

    const handleAccept = async(id) =>{
       
        Swal.fire({
            title: "Are you sure you want to Accept",
           
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want to Accept"
        }).then((result) => {
            
            
            if (result.isConfirmed) {
                const requestInfo ={
                    status: true,
                }
                refetch()
                const requestResponse = axiosSecure.patch( `/adoptionRequest/${id}`,  requestInfo)
                console.log(requestResponse.data)
                refetch()
                
                
            }
        }
            )
    }
    
    return (
        <div>
            <div className="font-italic"><MainTitle heading="Adoption Request" /></div>
            {
                request.length > 0 && <div className="overflow-x-auto">
                    <table className="table table-zebra text-center">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Serial No</th>
                                <th>Person Name</th>
                                <th>Location</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {request.map((req, index)=><tr key={req._id}>
                                <th>{index+1}</th>
                                <td>{req.userName}</td>
                                <td>{req.location}</td>
                                <td>{req.email}</td>
                                <td>{req.userNumber}</td>
                                <td className='text-red-600 font-bold'>{req.status ? "Approved" : "Pending"}</td>
                                <td> {req.status !== true ? <button onClick={() => handleAccept(req._id)} className='btn btn-secondary text-white'>Accept</button>: <p className='text-purple-600 font-bold'>Accepted</p>}
                                    </td>
                            </tr> )}
                            
                            
                        </tbody>
                    </table>
                </div>
            }
            {
                request.length === 0 && <div><Title subHeading="No Pets is Added By Users"></Title></div>
            }
        </div>
    );
};

export default AdoptionRequest;