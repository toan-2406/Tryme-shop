import { Swiper } from 'swiper/react';
// import required modules
import Button from '../Button';
import { Swiper as SwiperType, Navigation, Autoplay, Pagination } from 'swiper'
import { useRef, useState } from 'react';
interface Props {
  children: React.ReactNode
}
export default function Slider({
  children
}: Props) {
  const swiperRef = useRef<SwiperType>()
const [allowNext, setAllowNext] = useState<boolean>(true)
const [allowPrev, setAllowPrev] = useState<boolean>(true)
const handleSlideChange = (el:SwiperType) =>{
  const { isBeginning, isEnd } = el;
  if (isBeginning) {
    setAllowNext(true)
    setAllowPrev(false)
  }
  if (isEnd) {
    setAllowPrev(true)
    setAllowNext(false)
  } 
}
  return (
    <div className='relative'>
 
          <Button
            className='rounded-full px-1 py-1 absolute top-1/2 right-[100%] z-30 hidden md:block'
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={!allowPrev}
          >
            <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M29.42 31.76L21.66 24L29.42 16.24C29.6051 16.0548 29.752 15.835 29.8522 15.5931C29.9524 15.3511 30.004 15.0918 30.004 14.83C30.004 14.5681 29.9524 14.3088 29.8522 14.0669C29.752 13.825 29.6051 13.6051 29.42 13.42C29.2348 13.2348 29.015 13.0879 28.7731 12.9877C28.5311 12.8875 28.2718 12.8359 28.01 12.8359C27.7481 12.8359 27.4888 12.8875 27.2469 12.9877C27.005 13.0879 26.7851 13.2348 26.6 13.42L17.42 22.6C17.2346 22.785 17.0875 23.0048 16.9871 23.2467C16.8867 23.4887 16.8351 23.748 16.8351 24.01C16.8351 24.2719 16.8867 24.5313 16.9871 24.7732C17.0875 25.0152 17.2346 25.235 17.42 25.42L26.6 34.6C27.38 35.38 28.64 35.38 29.42 34.6C30.18 33.82 30.2 32.54 29.42 31.76Z'
                fill='black'
              />
            </svg>
          </Button>
          <Button
            className='rounded-full px-1 py-1 absolute top-1/2 left-[100%] z-30 hidden md:block'
            onClick={() => swiperRef.current?.slideNext()}
            disabled={!allowNext}

          >
            <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M18.62 13.42C18.4346 13.6051 18.2875 13.8248 18.1872 14.0668C18.0868 14.3087 18.0352 14.5681 18.0352 14.83C18.0352 15.092 18.0868 15.3513 18.1872 15.5933C18.2875 15.8352 18.4346 16.055 18.62 16.24L26.38 24L18.62 31.76C18.2461 32.134 18.036 32.6412 18.036 33.17C18.036 33.6989 18.2461 34.2061 18.62 34.58C18.994 34.954 19.5012 35.1641 20.03 35.1641C20.5589 35.1641 21.0661 34.954 21.44 34.58L30.62 25.4C30.8055 25.215 30.9525 24.9952 31.0529 24.7533C31.1533 24.5113 31.2049 24.252 31.2049 23.99C31.2049 23.7281 31.1533 23.4687 31.0529 23.2268C30.9525 22.9848 30.8055 22.7651 30.62 22.58L21.44 13.4C20.68 12.64 19.4 12.64 18.62 13.42Z'
                fill='black'
              />
            </svg>
          </Button>
     
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true
        }}  
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={
          {
            540: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            }
          }
        }
        onSlideChange={(swiper) =>handleSlideChange(swiper)}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="ProductSlider select-none"
      >
        
        {children}
      </Swiper>
    </div>
  )
}
