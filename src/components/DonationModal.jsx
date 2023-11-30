
const DonationModal = ({_id, email}) => {
   

    const closeModal = () => {
        document.getElementById('my_modal_2').close();
      };
    return (
        <div>
            <button className="btn w-full " onClick={() => document.getElementById('my_modal_2').showModal()}>Donate Now</button>
            <dialog id="my_modal_2" className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-box h-[450px]">
                    Currently No Payment Related Option is Available
                </div>
                <form method="dialog" onClick={closeModal} className="modal-backdrop">
                   
                </form>
            </dialog>
        </div>
    )
};

export default DonationModal ;


