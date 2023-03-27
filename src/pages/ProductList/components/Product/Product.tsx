import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
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
      <div className='text-left durantion-100 shadow-md z-0 p-4 rounded-[10px] transition-transform hover:translate-y-[-0.0925rem] hover:shadow-lg'>
        <div className=" rounded-[10px] overflow-hidden max-h-[284px]">
          <img
            src={product.image}
            alt={product.name}
            className='bg-cover h-full '
          />
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-lg line-clamp-2 ">{product.name}</h3>
        </div>
        <div className='mt-2'>
          <ProductRating rating={product.rating} />
        </div>
        <div className='flex items-center justify-between gap-1 text-gray-500 space-x-1 mt-2'>
          <span className='font-bold text-base sm:text-lg md:text-xl mt-2'>{formatCurrency(product.price_before_discount)}đ</span>
          <Button className='px-2 py-2'><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_163_1272)">
              <path d="M7.61214 18.4563C8.07238 18.4563 8.44548 18.0832 8.44548 17.623C8.44548 17.1628 8.07238 16.7897 7.61214 16.7897C7.1519 16.7897 6.77881 17.1628 6.77881 17.623C6.77881 18.0832 7.1519 18.4563 7.61214 18.4563Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16.7788 18.4563C17.2391 18.4563 17.6122 18.0832 17.6122 17.623C17.6122 17.1628 17.2391 16.7897 16.7788 16.7897C16.3186 16.7897 15.9455 17.1628 15.9455 17.623C15.9455 18.0832 16.3186 18.4563 16.7788 18.4563Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M0.945496 0.956421H4.27883L6.51216 12.1148C6.58837 12.4984 6.79709 12.8431 7.10178 13.0883C7.40648 13.3336 7.78774 13.4639 8.17883 13.4564H16.2788C16.6699 13.4639 17.0512 13.3336 17.3559 13.0883C17.6606 12.8431 17.8693 12.4984 17.9455 12.1148L19.2788 5.12309H5.11216" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_163_1272">
                <rect width="20" height="20" fill="white" transform="translate(0.112152 0.123047)" />
              </clipPath>
            </defs>
          </svg>
          </Button>
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
