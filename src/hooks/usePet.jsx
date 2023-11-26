import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const usePet = () => {
    const axiosSecure= useAxiosSecure()
    const{ user} = useAuth()
    const { data: pets = [], refetch } = useQuery({
        queryKey: ['pets', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pets?email=${user.email}`)

            return res.data

        }
    })
    return [pets, refetch]
};

export default usePet;