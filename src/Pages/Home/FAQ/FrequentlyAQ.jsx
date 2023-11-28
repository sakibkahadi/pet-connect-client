import image from '../../../assets/FAQ.png'
import Title from '../../../components/Title';
const FrequentlyAQ = () => {
    return (
        <div className='flex flex-col md:flex-row w-full items-center' >
            <div className='md:w-1/2'>
                <img className='w-full' src={image} alt="" />
            </div>
            <div className=' md:w-1/2'>
            <div className='-mt-6 '><Title subHeading="Frequently Asked Questions"/></div>
            <div className="divider"></div>
            <div className='flex flex-col gap-6  '>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                        Can I meet the pet before deciding to adopt?
                    </div>
                    <div className="collapse-content">
                        <p>Absolutely! We encourage potential adopters to spend time with the pet they are interested in. Contact us to schedule a meet-and-greet or visit our adoption events.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                        Do you only have dogs and cats available for adoption?
                    </div>
                    <div className="collapse-content">
                        <p>While dogs and cats are commonly available, we also rescue and rehome a variety of pets, including small animals and sometimes exotics. Check our Pets Categories page to see the diverse range of animals looking for homes.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                        Are the pets spayed/neutered and vaccinated?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, all pets available for adoption through Pet Connect are spayed/neutered and up-to-date on vaccinations. We prioritize the health and safety of our animals.</p>
                    </div>
                </div>
            </div>
            </div>
            
        </div>
    );
};

export default FrequentlyAQ;