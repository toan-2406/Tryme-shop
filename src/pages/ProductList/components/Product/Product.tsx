import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import ProductRating from 'src/components/ProductRating'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { Product as Productype } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId, rateStale } from 'src/utils/utils'

interface Props {
  product: Productype
}
interface CartData {
  product_id: string
  buy_count: number
}
export default function Product({ product }: Props) {
  const queryClient = useQueryClient()
  const addToCartMutation = useMutation({
    mutationFn: (body: CartData) => purchaseApi.addToCart(body)
  })
  const addToCart = () => {
    addToCartMutation.mutate(
      {
        buy_count: 1,
        product_id: product?._id as string
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ['purchases', { status: purchasesStatus.inCart }]
          })
          toast.success(data.data.message, { autoClose: 1000 })
        }
      }
    )
  }
  return (
    <>
      <div className='shadow-custom z-0 rounded-[10px] p-2 text-left md:p-4'>
        <span className='absolute top-0 right-0 -translate-y-1/2 transform rounded-md bg-red-600 py-1 px-2 font-bold text-white'>
          Sale {rateStale(product.price_before_discount, product.price)}
        </span>
        <div className=' max-h-[284px] overflow-hidden rounded-[10px]'>
          <img loading="lazy" src={product.image} alt={product.name} className='h-full bg-cover ' />
        </div>
        <Link to={`/products/${generateNameId({ name: product.name, id: product._id })}`}>
          <div className='mt-4'>
            <h3 className='text-lg font-semibold line-clamp-2 hover:underline '>{product.name}</h3>
          </div>
        </Link>
        <div className='mt-2 flex items-center'>
          <ProductRating rating={product.rating} />
          <span className='ml-2 text-sm font-medium'>{`(${formatNumberToSocialStyle(product.sold)} sold)`}</span>
        </div>
        <div className='text-gray-500 mt-2 flex items-center justify-between gap-1 space-x-1'>
          <div>
            <div className='text-gray-500 text-base font-medium line-through'>
              {formatCurrency(product.price_before_discount)} đ
            </div>
            <div className='text-lg font-bold sm:text-lg md:text-xl '>{formatCurrency(product.price)} đ</div>
          </div>
          <Button onClick={addToCart} className='hover:shadow-custom border px-2 py-2 shadow-inner'>
            <svg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <g clipPath='url(#clip0_163_1272)'>
                <path
                  d='M7.61214 18.4563C8.07238 18.4563 8.44548 18.0832 8.44548 17.623C8.44548 17.1628 8.07238 16.7897 7.61214 16.7897C7.1519 16.7897 6.77881 17.1628 6.77881 17.623C6.77881 18.0832 7.1519 18.4563 7.61214 18.4563Z'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16.7788 18.4563C17.2391 18.4563 17.6122 18.0832 17.6122 17.623C17.6122 17.1628 17.2391 16.7897 16.7788 16.7897C16.3186 16.7897 15.9455 17.1628 15.9455 17.623C15.9455 18.0832 16.3186 18.4563 16.7788 18.4563Z'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M0.945496 0.956421H4.27883L6.51216 12.1148C6.58837 12.4984 6.79709 12.8431 7.10178 13.0883C7.40648 13.3336 7.78774 13.4639 8.17883 13.4564H16.2788C16.6699 13.4639 17.0512 13.3336 17.3559 13.0883C17.6606 12.8431 17.8693 12.4984 17.9455 12.1148L19.2788 5.12309H5.11216'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
              <defs>
                <clipPath id='clip0_163_1272'>
                  <rect width='20' height='20' fill='white' transform='translate(0.112152 0.123047)' />
                </clipPath>
              </defs>
            </svg>
          </Button>
        </div>
      </div>
    </>
  )
}
