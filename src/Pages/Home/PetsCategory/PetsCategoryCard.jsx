import { Link } from "react-router-dom";
import Title from "../../../components/Title";

const PetsCategoryCard = ({ cat }) => {
    const { category, categoryImage } = cat;
    return (
        <div>
            <Link to={`category/${category}`}>
            <div className="card  shadow-xl shadow-[#420000]">
            <figure><img className="h-[350px] w-full" src={categoryImage} alt="Shoes" /></figure>
            <div className="card-body">
                <Title subHeading={category}></Title>

            </div>
        </div></Link>
        </div>
    );
};

export default PetsCategoryCard;