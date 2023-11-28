import { useFormik } from "formik";
import MainTitle from "../../components/MainTitle";
import Select from 'react-select';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";


const Update = () => {

    const loadedData = useLoaderData()
    console.log(loadedData)

    const cloudName = 'doocqhmpu';
    const uploadPreset = 'sakibkk';
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const uploadImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const options = [
        { value: 'cats', label: 'Cat' },
        { value: 'fish', label: 'Fish' },
        { value: 'rabbits', label: 'Rabbit' },
        { value: 'dogs', label: 'Dog' },
    ];
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
            petName: loadedData.petName,
            petImage: loadedData.petImage,
            category: loadedData.category ? options.find(option => option.value === loadedData.category) : null,
            petAge: loadedData.petAge,
            location: loadedData.location ? bangladeshCities.find(city => city.value === loadedData.location) : null,
            short_description: loadedData.short_description,
            long_description: loadedData.long_description,
        },
        validate: (values) => {
            const errors = {};

            if (!values.petName) {
                errors.petName = 'Required';
            }

            if (!values.petImage) {
                errors.petImage = 'Required';
            }

            if (!values.category) {
                errors.category = 'Required';
            }

            if (!values.location) {
                errors.location = 'Required';
            }

            if (!values.petAge) {
                errors.petAge = 'Required';
            }

            if (!values.short_description) {
                errors.short_description = 'Required';
            }

            if (!values.long_description) {
                errors.long_description = 'Required';
            }

            return errors;
        },
        onSubmit: async (values) => {
            // console.log(user?.email)
            // const addedDate = new Date();
            if (values.petImage) {
                const imageUrl = await uploadImage(values.petImage);
                // console.log('Image URL:', imageUrl);
                const petInfo = {
                    petImage: imageUrl,
                    petName: values.petName,
                    petAge: values.petAge,
                    category: values.category.value,
                    location: values.location.value,
                    short_description: values.short_description,
                    long_description: values.long_description, }
                const res = await axiosSecure.put(`/pets/${loadedData._id}`, petInfo)
                if(res.data.modifiedCount){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title:  'Pet is Successfully Updated',
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
                
            }
        },
    });

    return (
        <div>
            <div className="font-italic">
                <MainTitle heading="Update Pet Information" />
            </div>

            <form className="card-body" onSubmit={formik.handleSubmit}>
                {/* row 1 */}
                <div className="grid lg:grid-cols-2 gap-2">
                    <div className="form-control">
                        <label className="mb-2" htmlFor="petImage">
                            Pet Image
                        </label>
                        <input

                            id="petImage"
                            name="petImage"
                            type="file"
                            onChange={(event) => formik.setFieldValue("petImage", event.currentTarget.files[0])}
                            className="file-input file-input-bordered file-input-primary w-full "
                        />
                        {formik.errors.petImage && formik.touched.petImage && (
                            <div className="text-red-500">Image is required</div>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="mb-2" htmlFor="petName">
                            Pet Name
                        </label>
                        <input
                            id="petName"
                            name="petName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.petName}
                            placeholder="Pet Name"
                            className="input input-bordered"
                        />
                        {formik.errors.petName && formik.touched.petName && (
                            <div className="text-red-500">Pet Name is required</div>
                        )}
                    </div>
                </div>
                {/* row 2 */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="form-control">
                        <label className="mb-2" htmlFor="category">
                            Pet Category
                        </label>
                        <Select
                            id="category"
                            defaultValue={loadedData.category}
                            name="category"
                            onChange={(selectedOption) => formik.setFieldValue("category", selectedOption)}
                            value={formik.values.category}
                            className="w-full max-w-xs"
                            options={options}
                        />
                        {formik.errors.category && formik.touched.category && (
                            <div className="text-red-500">Category is required</div>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="mb-2" htmlFor="location">
                            Pet location
                        </label>
                        <Select
                            id="location"
                            name="location"
                            onChange={(selectedOption) => formik.setFieldValue("location", selectedOption)}
                            value={formik.values.location}
                            className="w-full max-w-xs"
                            options={bangladeshCities}
                        />
                        {formik.errors.location && formik.touched.location && (
                            <div className="text-red-500">Pet Location is required</div>
                        )}
                    </div>
                </div>
                {/* row 3 */}
                <div className="grid md:grid-cols-2 gap-2">

                    <div className="form-control">
                        <label className="mb-2" htmlFor="petAge">
                            Pet Age
                        </label>
                        <input
                            id="petAge"
                            name="petAge"
                            type="number"
                            min={1}
                            onChange={formik.handleChange}
                            value={formik.values.petAge}
                            placeholder="Pet Age"
                            className="input input-bordered"
                        />
                        {formik.errors.petAge && formik.touched.petAge && (
                            <div className="text-red-500">Pet Age is required</div>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="mb-2" htmlFor="short_description">
                            Short Description
                        </label>
                        <input
                            id="short_description"
                            name="short_description"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.short_description}
                            placeholder="Short Description"
                            className="input input-bordered"
                        />
                        {formik.errors.short_description && formik.touched.short_description && (
                            <div className="text-red-500">Short Description is required</div>
                        )}
                    </div>
                </div>
                {/* row 4 */}
                <div className="form-control">
                    <label className="mb-2" htmlFor="long_description">
                        Long Description
                    </label>
                    <textarea id="long_description"
                        name="long_description"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.long_description}
                        placeholder="Long Description" className="textarea  textarea-bordered min-h-[100px]" ></textarea>
                    {formik.errors.long_description && formik.touched.long_description && (
                        <div className="text-red-500">Long Description is required</div>
                    )}

                </div>

                <button type="submit" className="btn bg-[#1dc753] text-white font-bold">Submit</button>
            </form>
        </div>
    );
};

export default Update;
