import { useQuery } from '@tanstack/react-query'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductListConfig } from 'src/types/product.type'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import InfinityLoader from 'src/components/InfinityLoader'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig = useQueryConfig()
  const [isActiveFilter, setIsActiveFilter] = useState(false)
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200'>
      <Helmet>
        <title>Trang sản phẩm | Shopee Clone</title>
        <meta name='description' content='Trang sản phẩm shopee Clone' />
      </Helmet>
      <div className='container relative pt-20'>
        <div className='grid grid-cols-12 gap-6 '>
          <div
            className={`fixed top-0 left-0 z-20 col-span-2 w-3/4 bg-white px-4 md:relative md:z-0 md:w-full md:translate-x-0 md:px-0 ${
              isActiveFilter ? 'translate-x-0' : 'translate-x-[-100%]'
            } transition-all duration-150 ease-linear`}
          >
            <div
              onClick={() => setIsActiveFilter(!isActiveFilter)}
              className='absolute top-[13rem] right-[-50px] z-1 inline-block rounded-md bg-orange py-2 px-2 text-center text-lg font-bold text-white md:hidden'
            >
              <svg width='31' height='31' viewBox='0 0 31 31' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M27.6122 4.02142H2.61215L12.6122 15.8464V24.0214L17.6122 26.5214V15.8464L27.6122 4.02142Z'
                  stroke='white'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </div>
            <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
          </div>
          {productsData && (
            <div className='col-span-12 md:col-span-10'>
              <SortProductList queryConfig={queryConfig} totalPage={productsData?.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
                {productsData.data.data.products.map((product) => (
                  <div key={product._id} className='col-span-1'>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} totalPage={productsData?.data.data.pagination.page_size} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
