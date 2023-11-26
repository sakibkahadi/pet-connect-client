import MainTitle from "../../components/MainTitle";
import useDonationCampaign from "../../hooks/useDonationCampaign";

const MyDonationCampaigns = () => {
    const [donations, refetch] = useDonationCampaign();
    console.log(donations);

    return (
        <div>
            <div className="font-italic">
                <MainTitle heading="My Donation Campaigns" />
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="lg:py-2">Pet Name</th>
                            <th className="lg:py-2">Maximum Donation Amount</th>
                            <th className="lg:py-2">Donation Progress</th>
                            <th className="lg:py-2">Edit</th>
                            <th className="lg:py-2">Pause Donation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation) => (
                            <tr key={donation._id}>
                                <td className="lg:py-2">{donation.petName}</td>
                                <td className="lg:py-2">{donation.maxDonation}</td>
                                <td className="lg:py-2">Quality Control Specialist</td>
                                <td className="lg:py-2">Blue</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonationCampaigns;
