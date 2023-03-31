import { useQuery } from '@tanstack/react-query'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import useQueryParams from 'src/hooks/useQueryParams'
import { Product, ProductListConfig } from 'src/types/product.type'
import AsideFilter from './components/AsideFilter'
import ProductItem from './components/Product/Product'
import SortProductList from './components/SortProductList'
import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAccessTokenFromLS } from 'src/utils/auth'
import HelmetWrapper from 'src/components/HelmetWrapper'
export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const [limit, setLimit] = useState(8);
  const [pageNumber, setPageNumber] = useState(0);
  const queryConfig = useQueryConfig()
  const configCustom = {
    ...queryConfig,
    limit: limit
  }
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', configCustom],
    queryFn: () => {
      if(!getAccessTokenFromLS) return
      return productApi.getProducts(configCustom as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,

  })
  const page = productsData?.data.data.pagination.page || 1
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      if(!getAccessTokenFromLS) return
      return categoryApi.getCategories()
    }
  })
  const loadProducts = () => {
    setLimit(limit + 8)
    console.log(limit)
  }
  return (
    <HelmetWrapper title='Products Page' content='Products Page of Tryme Shop'>
      <div className='container relative pt-20'>
        <div className='grid grid-cols-12 gap-6 '>
          <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
          {productsData && (
            <div className='col-span-12 lg:col-span-10'>
              <SortProductList queryConfig={queryConfig} />
              {
                productsData.data.data.products && <InfiniteScroll
                  dataLength={productsData.data.data.products.length}
                  next={() => loadProducts()}
                  hasMore={limit < 40 ? true : false}
                  loader={<></>}
                >
                  <div className='my-4 mx-1 grid grid-cols-2 gap-y-5 gap-x-4 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4'>

                    {productsData.data.data.products.slice(0, limit).map((product) => (
                      <div key={product._id} className='col-span-1 relative'>
                        <ProductItem product={product} />
                      </div>
                    ))}
                  </div>
                
              </InfiniteScroll>
              }
              
              

            </div>
          )}
        </div>
      </div>
    </HelmetWrapper>
  )
}
