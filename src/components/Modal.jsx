import { useFormik } from "formik";

import Select from 'react-select';

import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";


const customStyles = {
    control: (provided, state) => ({
        ...provided,
         // Adjust the width as needed
        height: '46px', // Adjust the height as needed
    }),
};
const Modal = ({_id}) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const bangladeshCities = [
        { value: 'dhaka', label: 'Dhaka' },
        { value: 'chittagong', label: 'Chittagong' },
        { value: 'khulna', label: 'Khulna' },
        { value: 'rajshahi', label: 'Rajshahi' },
        { value: 'sylhet', label: 'Sylhet' },
        { value: 'barisal', label: 'Barisal' },
        { value: 'rangpur', label: 'Rangpur' },
        { value: 'comilla', label: 'Comilla' },

    ];

    const formik = useFormik({
        initialValues: {
            location: null,
            userNumber: ''
        },
        validate: (values) => {
            const errors = {};
            if (!values.location) {
                errors.location = 'Required';
            }
            if (!values.userNumber) {
                errors.userNumber = "Required"
            }

            return errors;
        },
        onSubmit: async (values) => {

            const adoptionInfo= {
                email: user?.email,
                userName: user?.displayName,
                userNumber: values.userNumber,
                location: values.location.value,
                petId: _id,
                status: "pending"
            }
            const res = await axiosSecure.post('/adoptionRequest', adoptionInfo)
                console.log(res.data)
                if(res.data.insertedId){
                    formik.resetForm();
                   
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Request is sent",
                        showConfirmButton: false,
                        
                        timer: 1500
                      });
                      closeModal();
                }
                else{
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "You Already Requested for this ",
                        showConfirmButton: false,
                        
                        timer: 1500
                      });
                      closeModal()
                }
        },
    });

    const closeModal = () => {
        document.getElementById('my_modal_2').close();
      };
    return (
        <div>
            <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>Adopt</button>
            <dialog id="my_modal_2" className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-box h-[450px]">
                    <form className="card-body" onSubmit={formik.handleSubmit}>

                        {/* row 1 */}
                        <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                            <div className="form-control ">
                                <label className="mb-2" htmlFor="location">
                                    Pet location
                                </label>
                                <Select
                                    id="location"
                                    name="location"
                                    onChange={(selectedOption) => formik.setFieldValue("location", selectedOption)}
                                    value={formik.values.location}
                                    className="w-full max-w-xs "
                                    options={bangladeshCities}
                                    styles={customStyles}
                                />
                                {formik.errors.location && formik.touched.location && (
                                    <div className="text-red-500">Pet Location is required</div>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="mb-2" htmlFor="userName">
                                    Your Number
                                </label>
                                <input
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    placeholder={user?.displayName}
                                    onChange={formik.handleChange}
                                    value={formik.values.userName}
                                    disabled
                                    className="input input-bordered "
                                />

                            </div>
                        </div>
                        {/* row 2 */}
                        <div className="">


                            <div className="form-control">
                                <label className="mb-2" htmlFor="userNumber">
                                    Your Number
                                </label>
                                <input
                                    id="userNumber"
                                    name="userNumber"
                                    type="tel" // Change the type to "tel"

                                    minLength={1}
                                    onChange={(e) => {
                                        // Allow only numeric input
                                        const numericInput = e.target.value.replace(/\D/g, '');
                                        formik.handleChange({
                                            target: {
                                                id: 'userNumber',
                                                name: 'userNumber',
                                                value: numericInput,
                                            },
                                        });
                                    }}
                                    value={formik.values.userNumber}
                                    className="input input-bordered"
                                />
                                {formik.errors.userNumber && formik.touched.userNumber && (
                                    <div className="text-red-500">Your Number is required</div>
                                )}
                            </div>


                            {/* new row */}
                            <div className="form-control">
                                <label className="mb-2" htmlFor="userEmail">
                                    Your Number
                                </label>
                                <input
                                    id="userEmail"
                                    name="userEmail"
                                    type="number"
                                    placeholder={user?.email}
                                    onChange={formik.handleChange}
                                    value={formik.values.userEmail}
                                    disabled
                                    className="input input-bordered "
                                />

                            </div>
                        </div>
                        


                        <button type="submit" className="btn bg-[#1dc753] text-white font-bold">Submit</button>
                    </form>
                </div>
                <form method="dialog" onClick={closeModal} className="modal-backdrop">
                   
                </form>
            </dialog>
        </div>
    )
};

export default Modal;

