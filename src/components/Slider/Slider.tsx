import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper';
interface Props {
    children: React.ReactNode
  }
  export default function Slider({
    children
  }: Props ){
    return (
        <>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true
          }}
          breakpoints={
           {
            540: {
                slidesPerView:2,
                spaceBetween:10
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200:{
                slidesPerView: 4,
                spaceBetween: 20,
            }
           }
          }
          autoplay={true}
          navigation={true}
          modules={[ Pagination, Navigation]}
          className="ProductSlider"
        >
           
            {children}
        </Swiper>
      </>
    )
  }
  