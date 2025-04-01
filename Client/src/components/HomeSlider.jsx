import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { slider_img1, slider_img2, slider_img3, slider_img4 } from '../assets/assets';
function HomeSlider() {

  return (
    <>
      <Swiper 
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,Keyboard, Pagination, Navigation]}
        className="mySwiper h-full w-[99vw]"
      >
        <SwiperSlide><img className="w-full h-full object-cover" src={slider_img1} alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-full object-cover" src={slider_img2} alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-full object-cover" src={slider_img3} alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-full object-cover" src={slider_img4} alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}

export default HomeSlider