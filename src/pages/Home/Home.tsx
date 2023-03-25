import { useQuery } from '@tanstack/react-query'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductListConfig } from 'src/types/product.type'
import { Helmet } from 'react-helmet-async'
import Hero from 'src/components/Hero'
import ProductSection from 'src/components/ProductSection'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function Home() {
  

  return (
    <div className='bg-gray-200'>
      <Helmet>
        <title>Trang sản phẩm | Shopee Clone</title>
        <meta name='description' content='Trang sản phẩm shopee Clone' />
      </Helmet>
        <Hero/>
        <div className='container'>
        <ProductSection/>
        <ProductSection/>
        </div>
      </div>
  
  )
}
