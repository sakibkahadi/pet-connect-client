
import {  NavLink } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
   const {user, logOut} = useAuth()

   const [isAdmin] = useAdmin()
    const [open, setOpen] = useState(false)
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => console.log(error))
    }
    const navLinks = <>
        <li><NavLink   to='/'>Home</NavLink></li>
       <li><NavLink to='/petListing'>Pet Listing</NavLink></li>
          <li><NavLink to='/donationCampaigns'>Donation Campaign</NavLink></li>
         {!user?.email && <li><NavLink to='/login'>Log In</NavLink></li> 
        }
    </>
    return (
        <div className="navbar">
            <div className="navbar-start    ">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden " onClick={() => setOpen(!open)}>
                        {
                            open === true ? <AiOutlineClose ></AiOutlineClose> : <AiOutlineMenu></AiOutlineMenu>
                        }
                    </label>
                    <ul tabIndex={0} className={`text-[#1dc753] font-bold menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 duration-1000 absolute 
            ${open ? '' : '-top-60'}`}>

                        {navLinks}
                    </ul>
                </div>
                <div className="flex items-center gap-1">
                <svg height="48"  viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="19" r="5"/><circle  cx="18" cy="11" r="5"/><circle  cx="30" cy="11" r="5"/><circle cx="39" cy="19" r="5"/><path d="M34.68 29.72c-1.75-2.03-3.21-3.78-4.96-5.81-.93-1.08-2.1-2.17-3.49-2.64-.21-.07-.43-.13-.66-.17-.51-.1-1.05-.1-1.57-.1s-1.06 0-1.57.1c-.22.04-.44.1-.66.17-1.39.47-2.56 1.56-3.49 2.64-1.75 2.03-3.21 3.78-4.96 5.81-2.62 2.61-5.83 5.52-5.25 9.59.58 2.03 2.04 4.07 4.67 4.65 1.46.29 6.12-.87 11.08-.87.06 0 .12.01.18.01s.12-.01.18-.01c4.96 0 9.62 1.16 11.08.87 2.62-.58 4.08-2.61 4.67-4.65.58-4.07-2.62-6.98-5.25-9.59z"/><path d="M0 0h48v48H0z" fill="none"/></svg>
                    
                    <a className="  normal-case text-xl md:text-2xl  lg:text-4xl font-italic 
                    text-[#1461c5fe] font-extrabold ">PetConnect</a>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-[#1dc753] font-bold">
                    {
                        navLinks
                    }
                </ul>
            </div>
            <div className="navbar-end">
            {user && <div className="dropdown dropdown-end">
                        {
                                            user?.photoURL && <img tabIndex={0} className="h-10 w-10 rounded-full " src={user?.photoURL} alt="profile pic" />

                                        }
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box ">
                            <div className="card w-28 ">
                                <div className="card-body space-y-2 text-[#1dc753] font-bold">
                                    
                                    <NavLink><button  onClick={handleLogOut}>LogOut</button></NavLink>
                                    {user && isAdmin && <NavLink to="/dashboard/allPets"><button >Dashboard</button></NavLink>  }
                                    {user && !isAdmin && <NavLink to="/dashboard/myAddedPets"><button >Dashboard</button></NavLink>  }
                                    

                                </div>
                            </div>

                        </ul>
                    </div>}
            </div>
        </div>
    );
};
export default Navbar;