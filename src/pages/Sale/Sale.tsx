import HelmetWrapper from 'src/components/HelmetWrapper'
import Banner from './component/Banner'
import { useQuery } from '@tanstack/react-query'
import useQueryConfig from 'src/hooks/useQueryConfig'
import productApi from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'
import { rateStale } from 'src/utils/utils'
import ProductSection from 'src/components/ProductSection'
import path from 'src/constants/path'
import Slider from 'src/components/Slider'
import { SwiperSlide } from 'swiper/react'
import { ProductCardSkeleton } from 'src/components/Skeleton'
import ProductItem from '../ProductList/components/Product'
export default function Sale() {
  const queryConfig = useQueryConfig()
  const config = {
    ...queryConfig,
    limit: 10000
  }
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', config],
    queryFn: () => productApi.getProducts(config as ProductListConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const productsWithDiscount = productsData?.data.data.products.map(product => ({
    ...product,
    discountPercentage: Math.round(((product.price_before_discount - product.price) / product.price_before_discount) * 100),
  }));
  const sortedProducts = productsWithDiscount?.sort((a, b) => b.sold - a.sold);
  const top10DiscountedProducts = sortedProducts?.slice(0, 10);
  const sortedHot = productsWithDiscount?.sort((a, b) => b.view - a.view)
  const top10ViewedProducts = sortedHot?.slice(0,10)
  return (
    <HelmetWrapper title='Sale Page' content='Sale Page of Tryme Shop'>
      <div className='relative bg-pink pt-16 md:max-h-[600px] md:pt-24 lg:h-screen xl:max-h-[900px]'>
        <div className='container h-full'>
          <Banner />
        </div></div>
      <div className='container relative'>
        <ProductSection title='Top discounted best-sellers' p='Top best-sellers' 
          button='View all' subtitle='Shop the best deals on our top-selling products' link={path.products}>
          <Slider>
            {isLoading
              ? [...Array(10)].map((_, index) => {
                return (
                  <SwiperSlide key={index}>
                    <ProductCardSkeleton />
                  </SwiperSlide>
                )
              })
              : top10DiscountedProducts?.map((item) => {
                return (
                  <SwiperSlide key={item._id}>
                    <ProductItem product={item} />
                  </SwiperSlide>
                )
              })}
          </Slider>
        </ProductSection>
        <ProductSection title='Top discounted hot products' p='Top Hot Sale'
          button='View all' subtitle='Shop the Best Deals: Top Discounted Products on Our Ecommerce Site' link={path.products}>
          <Slider>
            {isLoading
              ? [...Array(10)].map((_, index) => {
                return (
                  <SwiperSlide key={index}>
                    <ProductCardSkeleton />
                  </SwiperSlide>
                )
              })
              : top10ViewedProducts?.map((item) => {
                return (
                  <SwiperSlide key={item._id}>
                    <ProductItem product={item} />
                  </SwiperSlide>
                )
              })}
          </Slider>
        </ProductSection>
      </div>

    </HelmetWrapper>
  )
}
