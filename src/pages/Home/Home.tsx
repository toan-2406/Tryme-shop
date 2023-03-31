import { useQuery } from '@tanstack/react-query'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import useQueryParams from 'src/hooks/useQueryParams'
import { Product, ProductListConfig } from 'src/types/product.type'
import { Helmet } from 'react-helmet-async'
import ProductSection from 'src/components/ProductSection'
import { useSearchParams } from 'react-router-dom'
import { lazy, useEffect, useState } from 'react'
import { omit } from 'lodash'
import ProductItem from '../ProductList/components/Product'
import Slider from 'src/components/Slider'
import { SwiperSlide } from 'swiper/react'
import CategoryItem from 'src/components/CategoryItem'
import { categoriesData } from 'src/constants/category'
import Why from 'src/pages/Home/componnents/Why'
import Newsletter from 'src/pages/Home/componnents/Newsletter'
import Hero from 'src/pages/Home/componnents/Hero'
import { CategoryCardSkeleton, ProductCardSkeleton } from 'src/components/Skeleton'
import HelmetWrapper from 'src/components/HelmetWrapper'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function Home() {
  const limit = 8
  const queryConfig = useQueryConfig()
  const config = {
    ...queryConfig,
    sort_by: 'view',
    limit: limit
  }
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', config],
    queryFn: () => {
      return productApi.getProducts(config as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const products = productsData?.data.data.products
  return (
    <HelmetWrapper title='Home Page' content='Home Page of Tryme Shop'>
      <Hero />
      <div className='container relative'>
        <ProductSection
          title='Popular Products'
          subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          p='Popular'
          button='View all'
          link='/products'
        >
          <Slider>
            {isLoading
              ? [...Array(6)].map((_, index) => {
                return (
                  <SwiperSlide key={index}>
                    <ProductCardSkeleton />
                  </SwiperSlide>
                )
              })
              : products?.map((item) => {
                return (
                  <SwiperSlide key={item._id}>
                    <ProductItem product={item} />
                  </SwiperSlide>
                )
              })}
          </Slider>
        </ProductSection>
        <ProductSection
          title='Category Products'
          subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          p='category'
          button='View all'
          link='/categorys'
        >
          <Slider>
            {isLoading
              ? [...Array(6)].map((_, index) => {
                return (
                  <SwiperSlide key={index}>
                    <CategoryCardSkeleton />
                  </SwiperSlide>
                )
              })
              : categoriesData?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <CategoryItem category={item} />
                  </SwiperSlide>
                )
              })}

          </Slider>
        </ProductSection>
        <Why />
        <Newsletter />
      </div>
    </HelmetWrapper>
  )
}
