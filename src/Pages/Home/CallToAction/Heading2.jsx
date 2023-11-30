import { Link } from "react-router-dom";


const Heading2 = () => {
    return (
        <div className="flex gap-6 items-center">
            <p className="text-green-400">Unconditional Love Awaits You: Adopt Today........</p>
            <Link to='/petListing'>
                <button className="btn btn-error text-white">Adopt Now</button>
            </Link>
        </div>
    );
};

export default Heading2;