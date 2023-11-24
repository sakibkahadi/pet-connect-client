import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import actionImage1 from '../../../assets/action/pet1.png';
import actionImage2 from '../../../assets/action/pet2.png';
import actionImage3 from '../../../assets/action/pet3.png';
import actionImage4 from '../../../assets/action/pet4.png';
import actionImage5 from '../../../assets/action/pet5.png';
import actionImage6 from '../../../assets/action/pet6.png';

import Title from '../../../components/Title';

import Description from '../../../components/Description';

const CallToActionBanner = () => {
    return (
        <div className='p-1  grid  grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='order-last flex justify-center items-center'>
                <div>
                <Title subHeading="Your Home Can Be Their Palace"></Title>
                
                <Description description="Transform a life—yours and theirs. Choose adoption and open your heart to a furry friend in need. Every adoption is a chance for a better life, and you can be the key to that brighter future."></Description>
                </div>
            </div>
            <div >
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    // breakpoints={{
                    //     1024: {
                    //         slidesPerView: 2,
                    //         spaceBetween: 20,
                    //     },
                       

                    // }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide ><img className='h-96 w-full ' src={actionImage1} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='h-96 w-full' src={actionImage2} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='h-96 w-full' src={actionImage3} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='h-96 w-full' src={actionImage4} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='h-96 w-full' src={actionImage5} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='h-96 w-full' src={actionImage6} alt="" /></SwiperSlide>

                </Swiper>
            </div>
        </div>
    );
};

export default CallToActionBanner;
