import { useQuery } from "@tanstack/react-query";
import MainTitle from "../../../components/MainTitle";
import PetsCategoryCard from "./PetsCategoryCard";
import axios from "axios";


const PetsCategory = () => {
    const {data: categories=[]} =useQuery({
        queryKey:['category'],
        queryFn: async ()=>{
           const  res = await axios.get('/Data.json')
           console.log(res.data)
            return res.data;
        }
    })
    return (
        <div>
            <MainTitle heading="pet category"></MainTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {categories.map((cat,idx)=><PetsCategoryCard key={idx} cat={cat}></PetsCategoryCard>)}
            </div>
            
        </div>
    );
};

export default PetsCategory;