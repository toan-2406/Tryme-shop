import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import InputNumber from 'src/components/InputNumber'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateStale } from 'src/utils/utils'
import ProductList from '../ProductList'
import DOMPurify from 'dompurify'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import purchaseApi from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'
import path from 'src/constants/path'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'
import Slider from 'src/components/Slider'
import { SwiperSlide } from 'swiper/react'
import HelmetWrapper from 'src/components/HelmetWrapper'
interface CartData {
  product_id: string
  buy_count: number
}

export default function ProductDetail() {
  const [buyCount, setBuyCount] = useState(1)
  const queryClient = useQueryClient()

  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetaildata } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const product = productDetaildata?.data.data
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  const currentImages = useMemo(
    () => (product ? product?.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  const addToCartMutation = useMutation({
    mutationFn: (body: CartData) => purchaseApi.addToCart(body)
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const next = () => {
    if (currentIndexImages[1] < (product as ProductType)?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const previous = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { offsetY, offsetX } = event.nativeEvent

    const { naturalHeight, naturalWidth } = image
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.top = top + 'px'
    image.style.left = left + 'px'
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
  }
  const handleRemoveZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    imageRef.current?.removeAttribute('style')
  }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      {
        buy_count: buyCount,
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

  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product?._id as string })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!product) return null
  return (
    <HelmetWrapper title='ProductDetail Page' content='ProductDetail of Tryme Shop'>
      <div className='container pt-20'>
        <div className='bg-white p-4 '>
          <div className='grid grid-cols-1 md:gap-10 md:grid-cols-12 lg:gap-20'>
            <div className='col-span-12 md:col-span-5 '>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] '
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='pointer-events-none absolute top-0 left-0 h-full w-full  bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  onClick={previous}
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%] ' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange '></div>}
                    </div>
                  )
                })}
                <button
                  onClick={next}
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-12 md:col-span-7 mt-4'>
              <h1 className='text-2xl font-bold capitalize md:text-4xl'>{product.name}</h1>
              <div className=' mt-2 flex gap-3'>
                <div className='text-gray-500 text-2xl font-medium line-through'>
                  {formatCurrency(product.price_before_discount)}đ
                </div>
                <div className='relative inline text-2xl font-bold text-black'>
                  {formatCurrency(product.price)}đ
                  <span className='absolute left-3/4 top-[-70%] rounded-md bg-red-600 px-1 whitespace-nowrap  py-1 text-xs font-semibold uppercase text-white'>
                    {rateStale(product.price_before_discount, product.price)} sale
                  </span>
                </div>
              </div>
              <div className='mt-4 flex items-center'>
                <div className='flex items-center'>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='fill-orange text-orange h-4 w-4'
                    nonActiveClassName='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                  <span className='ml-2 text-sm font-medium'>
                    ({product.rating}) stars • {formatNumberToSocialStyle(product.sold)} sold
                  </span>
                </div>
              </div>

              <div className='mt-4'>
                <div className='capitailze text-base font-medium'>Quantity</div>
                <div className='mt-1 flex items-center'>
                  <QuantityController
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onType={handleBuyCount}
                    value={buyCount}
                    max={product.quantity}
                  />
                  <div className='ml-2 text-sm font-medium'>{product.quantity} available </div>
                </div>
              </div>

              <button
                onClick={addToCart}
                className='border-gray-500 my-4 h-16 w-full rounded-[100px] border bg-pink text-base font-bold capitalize shadow-lg transition-all ease-linear hover:bg-orange hover:text-white'
              >
                Add to cart
              </button>
              <button
                onClick={buyNow}
                className='h-16 w-full rounded-[100px] bg-black text-base font-bold capitalize text-white shadow-lg transition-all  ease-linear hover:bg-green-700'
              >
                Buy now
              </button>
              <p className='mt-3 text-center text-[12px] font-normal'>Free shipping over $50</p>

             
            </div>
            <div className=' col-span-12'>
                  <div className=' bg-white  '>
                    <div className='text-lg font-bold '>Description</div>
                    <div className='mt-2 mb-4 text-base tracking-[.0010em]'>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(product.description)
                        }}
                      />
                    </div>
                  </div>
                </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className='font-russo font-normal text-3xl uppercase'>Simmilar Products</div>

          <div>
            <Slider>
              {productsData?.data.data.products.map((product) => {
                return (
                  <SwiperSlide key={product._id}>
                    <Product product={product} />
                  </SwiperSlide>
                )
              })}
            </Slider>
          </div>
        </div>
      </div>
    </HelmetWrapper>
  )
}
