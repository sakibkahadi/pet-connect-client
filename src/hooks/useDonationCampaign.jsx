import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useDonationCampaign = () => {
    const axiosSecure= useAxiosSecure()
    const{ user} = useAuth()
    const { data: donations = [], refetch } = useQuery({
        queryKey: ['donations', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations?email=${user.email}`)

            return res.data

        }
    })
    return [donations, refetch]
};


export default useDonationCampaign;