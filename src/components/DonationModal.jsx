import Payment from "./Payment/Payment";

const DonationModal = ({ _id, email, maxDonation, setRemaining }) => {
  // Close modal function
  const closeModal = () => {
    document.getElementById("my_modal_2").close();
  };

  return (
    <div>
      <button
        className="btn w-full btn-success"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Donate Now
      </button>

      <dialog
        id="my_modal_2"
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-box h-[510px] relative">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Payment Component */}
          <Payment
            setRemaining={setRemaining}
            id={_id}
            maxDonation={maxDonation}
          />
        </div>

        {/* Modal Backdrop */}
        <form
          method="dialog"
          onClick={closeModal}
          className="modal-backdrop"
        ></form>
      </dialog>
    </div>
  );
};

export default DonationModal;
