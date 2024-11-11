import MainTitle from "../../components/MainTitle";
import useAuth from "../../hooks/useAuth";
import Title from "../../components/Title";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdoptionRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/adoptionRequest");
      return res.data.filter((data) => data.adminEmail === user?.email);
    },
    enabled: !!user?.email, // Only fetch if user email is available
  });

  const handleAccept = async (id, petId) => {
    Swal.fire({
      title: "Are you sure you want to accept this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const requestInfo = { status: true, petId };
          const { data } = await axiosSecure.patch(
            `/adoptionRequest/${id}`,
            requestInfo
          );

          if (data.modifiedCount > 0) {
            Swal.fire(
              "Accepted!",
              "The adoption request has been accepted.",
              "success"
            );
            refetch(); // Refetch the requests after accepting
          } else {
            Swal.fire(
              "Error",
              "Failed to update the adoption request.",
              "error"
            );
          }
        } catch (error) {
          console.error("Error accepting adoption request:", error);
          Swal.fire(
            "Error",
            "An error occurred while accepting the request.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div>
      <div className="font-italic">
        <MainTitle heading="Adoption Request" />
      </div>
      {requests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra text-center">
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
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.userName}</td>
                  <td>{req.location}</td>
                  <td>{req.email}</td>
                  <td>{req.userNumber}</td>
                  <td
                    className={`font-bold ${
                      req.status ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {req.status ? "Approved" : "Pending"}
                  </td>
                  <td>
                    {req.status === true ? (
                      <p className="text-purple-600 font-bold">Accepted</p>
                    ) : (
                      <button
                        onClick={() => handleAccept(req._id, req.petId)}
                        className="btn btn-secondary text-white"
                      >
                        Accept
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <Title subHeading="No adoption requests have been added by users." />
        </div>
      )}
    </div>
  );
};

export default AdoptionRequest;
