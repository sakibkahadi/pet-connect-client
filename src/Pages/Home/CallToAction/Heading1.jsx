import { Link } from "react-router-dom";

const Heading1 = () => {
    return (

        <div className="flex gap-6 items-center ">
            <p className="text-green-400">Give a Home, Get a Friend: The Power of Pet Adoption.....</p>
            <Link to='/petListing'>
                <button className="btn btn-error text-white">Adopt Now</button>
            </Link>
        </div>
    );
};

export default Heading1;