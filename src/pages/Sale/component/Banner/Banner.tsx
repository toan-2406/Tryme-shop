import flowerbg from 'src/assets/images/flowerbg.png'
import circle from 'src/assets/images/circle.png'
import person1 from 'src/assets/images/person1.png'
import person2 from 'src/assets/images/person2.png'
import person3 from 'src/assets/images/person3.png'
import { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Banner() {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
                clickable: true
            }}
            loop={true}
            navigation={true}
            // autoplay={{
            //     delay: 2500,
            //     disableOnInteraction: false
            // }}
            modules={[Autoplay, Navigation]}
            className='BannerSlider'
        >
       
        </Swiper>
    )
}
