
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="overflow-x-hidden">
            <div className="flex flex-col space-y-6 justify-center  text-center items-center h-screen">
                <h2 className="font-bold text-2xl md:text-5xl">This page is not found</h2>
                <Link to='/'><button className="btn btn-primary">Go Back</button></Link>
            </div>
            
        </div>
    );
};

export default ErrorPage;