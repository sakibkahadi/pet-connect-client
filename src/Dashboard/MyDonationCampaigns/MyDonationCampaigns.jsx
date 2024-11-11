import { FaEdit, FaPause, FaPlay, FaStreetView } from "react-icons/fa";
import MainTitle from "../../components/MainTitle";
import Title from "../../components/Title";
import useDonationCampaign from "../../hooks/useDonationCampaign";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyDonationCampaigns = () => {
  const [donations, refetch] = useDonationCampaign();

  const axiosSecure = useAxiosSecure();
  const handlePause = async (id) => {
    const donationCampaignInfo = {
      status: "pause",
    };
    const res = await axiosSecure.patch(
      `/donationCampaigns/${id}`,
      donationCampaignInfo
    );
    if (res.data.modifiedCount) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Donation is Paused ",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };
  const handleActive = async (id) => {
    const donationCampaignInfo = {
      status: "active",
    };
    const res = await axiosSecure.patch(
      `/donationCampaigns/${id}`,
      donationCampaignInfo
    );
    if (res.data.modifiedCount) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Donation is Actived",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };

  return (
    <div>
      <div className="font-italic">
        <MainTitle heading="My Donation Campaigns" />
      </div>
      {donations.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="lg:py-2">Pet Name</th>
                <th className="lg:py-2">Maximum Donation Amount</th>
                <th className="lg:py-2">Donated</th>
                <th className="lg:py-2">Donation Progress</th>
                <th className="lg:py-2">Edit</th>
                <th className="lg:py-2">Pause Donation</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => {
                const maxDonation = donation.donation;
                const donatedAmount = donation.donation - donation.maxDonation;
                const progress = (donatedAmount / maxDonation) * 100;
                let progressClass = "progress-warning";

                if (progress >= 75) {
                  progressClass = "progress-success"; // Green if 75% or more
                } else if (progress >= 50) {
                  progressClass = "progress-primary";
                } else if (progress < 50) {
                  progressClass = "progress-danger";
                }

                return (
                  <tr key={donation._id}>
                    <td className="lg:py-2">{donation.petName}</td>
                    <td className="lg:py-2">{maxDonation}</td>
                    <td className="lg:py-2">{donatedAmount}</td>
                    <td className="lg:py-2">
                      <progress
                        className={`progress w-56 ${progressClass}`}
                        value={progress}
                        max="100"
                      ></progress>
                    </td>
                    <td className="lg:py-2">
                      <Link
                        to={`/dashboard/myDonationCampaign/${donation._id}`}
                      >
                        <FaEdit className="text-2xl" />
                      </Link>
                    </td>
                    <td className="lg:py-2">
                      {donation.status === "active" ? (
                        <FaPause
                          onClick={() => handlePause(donation._id)}
                          className="text-2xl"
                        />
                      ) : (
                        <FaPlay
                          onClick={() => handleActive(donation._id)}
                          className="text-2xl"
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {donations.length === 0 && (
        <div className="mt-12">
          <Title subHeading="You Have Not Added Any Donation Campaign Yet" />
        </div>
      )}
    </div>
  );
};

export default MyDonationCampaigns;
