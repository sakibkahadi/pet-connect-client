import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: payments = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);

      return res.data;
    },
  });
  return [payments, loading, refetch, user];
};

export default usePaymentHistory;
