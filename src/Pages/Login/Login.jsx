import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";


import useAuth from "../../hooks/useAuth";
import Title from "../../components/Title";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaGoogle } from "react-icons/fa";
const Login = () => {
    const axiosPublic = useAxiosPublic()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, googleSign } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = e => {
        e.preventDefault();
        console.log(email, password)
        login(email, password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state ? location.state : '/')
            })
            .catch(() => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter valid email or password',

                })
            })

    }

    const handleGoogleSign = () => {
        googleSign()
            .then(result => {
                console.log(result)
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL                    ,
                    role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate(from, { replace: true })
                    })
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="space-y-5 mt-5 overflow-x-hidden">
            <Title subHeading="Welcome Back. Please Login to your Account"></Title>
            <div className="hero   ">
                <div className="w-full md:w-1/2">

                    <div className="card  ">
                        <div className="card-body ">
                            <form onSubmit={handleLogin} >
                                <div className="grid grid-cols-2 gap-2">

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Type your Email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Type your Password" className="input input-bordered" required />

                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn  bg-gradient-to-r from-purple-600 rounded-3xl to-pink-500 text-white font-medium hover:bg-green-500" >Login Now</button>
                                </div>

                            </form>
                            <div className="divider"></div>

                            <button onClick={handleGoogleSign} className="btn">
                                <FaGoogle className="mr-2"></FaGoogle>
                                Google Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                Don't you have an account? <span className="text-[#1dc753]  font-italic uppercase "><Link to="/signUp">Register Now</Link></span>
            </div>


        </div>
    );
};

export default Login;