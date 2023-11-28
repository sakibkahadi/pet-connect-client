import { Link } from "react-router-dom";
import Title from "../../components/Title";
import MainTitle from "../../components/MainTitle";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const AllDonation = () => {
    const axiosSecure = useAxiosSecure()

    const { data: donationCampaigns = [], refetch } = useQuery({
        queryKey: ['donationCampaigns'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donationCampaigns')
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

                axiosSecure.delete(`/donationCampaigns/${id}`)
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
    return (
        <div>
            {
                donationCampaigns.length > 0 && <div>
                    <MainTitle heading="All Donations" />
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Image</th>
                                        <th>Pet Name</th>
                                        <th>Email</th>
                                        <th>Maximum Donation</th>
                                        <th>Last Date</th>
                                        <th>Details</th>
                                        <th>Pause</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donationCampaigns.map((campaign, index) => <tr key={campaign._id}>
                                        <th>{index + 1}</th>
                                        <td><img className="h-12 w-12" src={campaign.petImage} alt="" /></td>
                                        <td>{campaign.petName}</td>
                                        <td>{campaign.email}</td>
                                        <td>{campaign.maxDonation}</td>
                                        <td>{campaign.lastDate}</td>
                                        <td className="flex flex-col gap-1 items-center  text-xl">
                                            <Link to={`/dashboard/myDonationCampaign/${campaign._id}`} ><FaEdit ></FaEdit></Link>
                                            <MdDelete onClick={() => handleDelete(campaign._id)} />
                                        </td>
                                        <td><button className="btn btn-primary">Pause</button></td>
                                    </tr>)}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
            {
                donationCampaigns.length === 0 && <div><Title subHeading="No Donation Campaign is Added By Users"></Title></div>
            }
        </div>
    );
};

export default AllDonation;