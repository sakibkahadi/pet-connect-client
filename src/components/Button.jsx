

const Button = ({text}) => {
    return (
        <div>
            <button className="btn  bg-green-600 text-white font-medium hover:bg-green-500" >{text}</button> 
        </div>
    );
};

export default Button;