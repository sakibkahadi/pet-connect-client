import { useQuery } from "@tanstack/react-query";
import MainTitle from "../../components/MainTitle";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Title from "../../components/Title";

const MyDonation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  const filterPayments = payments.filter(
    (payment) => payment.campaignDetails !== null
  );
  console.log(filterPayments);
  return (
    <div>
      <div className="font-italic">
        <MainTitle heading="My Donations" />
      </div>
      {filterPayments.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="lg:py-2">Pet Image</th>

                <th className="lg:py-2">Campaign Name</th>

                <th className="lg:py-2">Donate</th>
                <th className="lg:py-2">Date</th>
                <th className="lg:py-2">Transaction id</th>
              </tr>
            </thead>
            <tbody>
              {filterPayments.map((donation) => (
                <tr key={donation._id}>
                  <td className="lg:py-2 h-5 w-6 ">
                    <img src={donation.campaignDetails.petImage} alt="" />
                  </td>
                  <td className="lg:py-2  ">
                    {donation.campaignDetails.petName}
                  </td>
                  <td className="lg:py-2">{donation.price} $</td>

                  <td className="lg:py-2">{donation.date.slice(0, 10)} </td>
                  <td>{donation.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {filterPayments.length === 0 && (
        <div className="mt-12">
          <Title subHeading="Donation empty" />
        </div>
      )}
    </div>
  );
};

export default MyDonation;
