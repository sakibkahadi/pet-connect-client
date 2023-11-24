import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import bannerImg1 from '../../../assets/banner/banner1.jpg';
import bannerImg2 from '../../../assets/banner/banner2.jpg';
import bannerImg3 from '../../../assets/banner/banner3.jpg';
import bannerImg4 from '../../../assets/banner/banner4.jpg';
import Title from '../../../components/Title';
import MainTitle from '../../../components/MainTitle';
import Description from '../../../components/Description';

const Banner = () => {
    return (
        <div className='p-1  grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='flex justify-center items-center'>
                <div>
                <Title subHeading="pet Connect"></Title>
                <MainTitle heading="Where Hearts Meet Paws!"></MainTitle>
                <Description description="Find your perfect furry companion and make a forever connection. Explore a world of love and companionship with our curated selection of adorable pets waiting for their forever homes."></Description>
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
                    <SwiperSlide ><img className='h-96 w-full ' src={bannerImg1} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='h-96 w-full' src={bannerImg2} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='h-96 w-full' src={bannerImg3} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='h-96 w-full' src={bannerImg4} alt="" /></SwiperSlide>

                </Swiper>
            </div>
        </div>
    );
};

export default Banner;