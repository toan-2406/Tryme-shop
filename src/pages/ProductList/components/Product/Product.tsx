import React from 'react'
import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import path from 'src/constants/path'
import { Product as Productype } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'

interface Props {
  product: Productype
}

export default function Product({ product }: Props) {
  return (
    <Link to={`/products/${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='text-left durantion-100 shadow-md p-4 rounded-[10px] transition-transform hover:translate-y-[-0.0925rem] hover:shadow-lg'>
        <div className=" rounded-[10px] overflow-hidden ">
          <img
            src={product.image}
            alt={product.name}
            className='bg-cover h-full '
          />
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-lg line-clamp-2 ">{product.name}</h3>
          <p className="font-normal text-sm ">Variant</p>
        </div>
        <div className='max-w-[50%] truncate text-gray-500 space-x-1 mt-2'>
          <span className='font-bold text-xl mt-2'>{formatCurrency(product.price_before_discount)}</span>
          <span className='font-bold text-xl mt-2'>đ</span>
        </div>
      </div>
      {/* <div className='durantion-100 rounded-sm bg-white shadow transition-transform hover:translate-y-[-0.0625rem] hover:shadow-md'>
        
        <div className='overflow-hidden p-2'>
          <div className='min-h-[1.75rem] text-xs line-clamp-2'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>đ</span>
              <span className='text-xs'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>đ</span>
              <span className='text-xs'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div> */}
    </Link>
  )
}
