
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import MainTitle from "../../components/MainTitle";
import Title from "../../components/Title";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api =  `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const SignUp = () => {
    const axiosPublic = useAxiosPublic()
    const { createUser,  updateUserProfile  } = useAuth()
   const navigate = useNavigate();
   const {register, handleSubmit, formState: { errors },} = useForm()
    const onSubmit =async(data)=> {
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        } )
        console.log(res.data.data.display_url, data.fullName, data.email, data.password
            )
        if(res.data.success){
            createUser(data.email, data.password)
            .then(result => {
                if(result.user)       
                 Swal.fire({
                    icon: 'success',
                    title: 'Congratulation',
                    text: 'Your registration is successfully completed',          
                  })
                  navigate('/')
                  updateUserProfile(data.fullName, res.data.data.display_url)
                .then(()=>{    
                    //create users entry in the database
                    const userInfo ={
                        name: data.fullName,
                        email: data.email,
                        image: res.data.data.display_url,
                        role: 'user'
                    }
                    console.log(userInfo)
                    axiosPublic.post('/users', userInfo)
                    .then(res=>{
                     
                        if(res.data.insertedId){
                            console.log('user added to the database')
                            
                            Swal.fire({
                                position: 'top',
                                icon:'success',
                                title: 'User Created Successfully',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            navigate('/')
                        }
                    })
                })
                .catch(error=>console.log(error))
            })
            .catch(() => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This email is already exist try another one', 
                  })
            })
        }
        
    
    }
    return (
        <div className="space-y-5 mt-4 overflow-x-hidden ">
             <Helmet>
                <title>Pet Connect || Register</title>
            </Helmet>
            <MainTitle heading="Please Register"/>
            <Title subHeading="Create your account. It's free and only takes a minute."></Title>
            <h2 className="text-sm md:text-xl text-center"></h2>
            <div className="hero   ">
                <div className="w-full md:w-3/4">

                    <div className="card  shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Your Name</span>
                                    </label>
                                    <input type="text" {...register('fullName', {required: true})} placeholder="Your Full Name" className="input input-bordered"  />
                                    {errors.fullName && <span className="text-red-600">Your Full Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Your Image</span>
                                    </label>
                                    <input type="file" {...register('image', {required: true})}className="file-input file-input-bordered file-input-accent " />
                                    {errors.image && <span className="text-red-600">Image is required</span>}
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register('email', {required: true})}placeholder="email" className="input input-bordered"  />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register('password', {required: true,  minLength: 6, maxLength: 20,})}placeholder="password" className="input input-bordered"  />
                                {errors.password?.type === 'required' && <p className="text-red-600"> Password is required </p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600"> Password must be 6 characters </p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600"> Password cannot be 20 characters </p>}

                            </div>
                            <div className="form-control mt-6">
                                
                                <button className="btn  bg-green-600 text-white font-medium hover:bg-green-500" >Register Now</button> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>

          

            <div className="text-center">
                Already have an account? <span className="text-[#1461c5fe] font-italic uppercase"><Link to="/login"> Log in</Link></span>
            </div>
        </div>
    );
};


export default SignUp;