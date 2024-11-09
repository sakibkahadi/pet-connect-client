import MainTitle from "../../components/MainTitle";
import { useFormik } from "formik";

import Select from "react-select";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const CreateDonationCampaign = () => {
  const cloudName = "doocqhmpu";
  const uploadPreset = "sakibkk";
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    // Get the current date
    const currentDate = new Date();

    // Format the date as "YYYY-MM-DD"
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    // Set the minimum date
    setMinDate(formattedDate);
  }, []);

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const formik = useFormik({
    initialValues: {
      petName: "",
      petImage: "",
      maxDonation: "",
      lastDate: minDate,
      short_description: "",
      long_description: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.petName) {
        errors.petName = "Required";
      }

      if (!values.petImage) {
        errors.petImage = "Required";
      }
      if (!values.maxDonation) {
        errors.maxDonation = "Required";
      }
      if (!values.lastDate) {
        errors.lastDate = "Required";
      }

      if (!values.short_description) {
        errors.short_description = "Required";
      }

      if (!values.long_description) {
        errors.long_description = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const addedDate = new Date();
      if (values.petImage) {
        const imageUrl = await uploadImage(values.petImage);
        // console.log('Image URL:', imageUrl);

        const donationCampaignInfo = {
          petImage: imageUrl,
          maxDonation: values.maxDonation,
          donation: values.maxDonation,
          lastDate: values.lastDate,
          short_description: values.short_description,
          long_description: values.long_description,
          addedDate: addedDate,
          petName: values.petName,
          email: user?.email,
          status: "active",
        };
        const res = await axiosSecure.post(
          "/donationCampaigns",
          donationCampaignInfo
        );
        console.log(res.data);
        if (res.data.insertedId) {
          formik.resetForm();
          document.getElementById("petImage").value = "";
          document.getElementById("maxDonation").value = null;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Donation Campaign is Added",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    },
  });

  return (
    <div>
      <div className="font-italic">
        <MainTitle heading="Donation Campaign" />
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
              onChange={(event) =>
                formik.setFieldValue("petImage", event.currentTarget.files[0])
              }
              className="file-input file-input-bordered file-input-primary w-full "
            />
            {formik.errors.petImage && formik.touched.petImage && (
              <div className="text-red-500">Image is required</div>
            )}
          </div>
          <div className="form-control">
            <label className="mb-2" htmlFor="maxDonation">
              Maximum Donation
            </label>
            <input
              id="maxDonation"
              name="maxDonation"
              type="number"
              min={0}
              onChange={formik.handleChange}
              value={formik.values.maxDonation}
              placeholder="Maximum Donation"
              className="input input-bordered"
            />
            {formik.errors.maxDonation && formik.touched.maxDonation && (
              <div className="text-red-500">Max Donation is required</div>
            )}
          </div>
        </div>

        {/* row 3 */}
        <div className="grid md:grid-cols-2 gap-2">
          <div className="form-control">
            <label className="mb-2" htmlFor="lastDate">
              Last Date
            </label>
            <input
              id="lastDate"
              name="lastDate"
              type="date"
              min={minDate}
              onChange={formik.handleChange}
              value={formik.values.lastDate}
              placeholder="Pet Age"
              className="input input-bordered"
            />
            {formik.errors.lastDate && formik.touched.lastDate && (
              <div className="text-red-500">Last Date is required</div>
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
          {formik.errors.short_description &&
            formik.touched.short_description && (
              <div className="text-red-500">Short Description is required</div>
            )}
        </div>
        {/* row 4 */}
        <div className="form-control">
          <label className="mb-2" htmlFor="long_description">
            Long Description
          </label>
          <textarea
            id="long_description"
            name="long_description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.long_description}
            placeholder="Long Description"
            className="textarea  textarea-bordered min-h-[100px]"
          ></textarea>
          {formik.errors.long_description &&
            formik.touched.long_description && (
              <div className="text-red-500">Long Description is required</div>
            )}
        </div>

        <button type="submit" className="btn bg-[#1dc753] text-white font-bold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateDonationCampaign;
