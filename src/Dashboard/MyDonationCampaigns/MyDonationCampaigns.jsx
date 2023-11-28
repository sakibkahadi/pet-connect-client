import { FaEdit, FaPause, FaStreetView } from "react-icons/fa";
import MainTitle from "../../components/MainTitle";
import Title from "../../components/Title";
import useDonationCampaign from "../../hooks/useDonationCampaign";
import { Link } from "react-router-dom";

const MyDonationCampaigns = () => {
    const [donations, refetch] = useDonationCampaign();
    console.log(donations);

    return (
        <div>
            <div className="font-italic">
                <MainTitle heading="My Donation Campaigns" />
            </div>
            {
                donations.length> 0 && <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="lg:py-2">Pet Name</th>
                            <th className="lg:py-2">Maximum Donation Amount</th>
                            <th className="lg:py-2">Donation Progress</th>
                            <th className="lg:py-2">Edit</th>
                            <th className="lg:py-2">Pause Donation</th>
                            <th className="lg:py-2">view Donator</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation) => (
                            <tr key={donation._id}>
                                <td className="lg:py-2">{donation.petName}</td>
                                <td className="lg:py-2">{donation.maxDonation}</td>
                                <td className="lg:py-2"><progress className="progress progress-warning w-56" value={0} max="100"></progress></td>
                                <td className="lg:py-2"> <Link to={`/dashboard/myDonationCampaign/${donation._id}`}><FaEdit className="text-2xl"/></Link></td>
                               
                                <td className="lg:py-2"><FaPause className="text-2xl"/></td>
                                <td className="lg:py-2"><FaStreetView className="text-2xl"/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            }
            {
                donations.length === 0 && <div className="mt-12"><Title subHeading="You Have Not Added Any Donation Campaign Yet"/></div>
            }
        </div>
    );
};

export default MyDonationCampaigns;
