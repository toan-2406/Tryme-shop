import path from 'src/constants/path'
import React, { useRef, useState } from 'react'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { QueryConfig } from '../../ProductList'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStars from '../RatingStars'
import omit from 'lodash/omit'
import InputHook from 'src/components/InputHook'
import useClickOutside from 'src/hooks/useClickOutSide'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
/** validate price
 *  * Nếu có price_min và price_max thì price_max >= price_min
 *  Còn không thì có price_min thì không có price_max và ngược lại
 */
const priceSchema = schema.pick(['price_max', 'price_min'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const [isActiveFilter, setIsActiveFilter] = useState(false)
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.products,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    navigate({
      pathname: path.products,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }
  const ref = useClickOutside(() => setIsActiveFilter(false));
  return (
    <div
      className={`fixed top-0 left-0 z-20 col-span-2 w-3/4 bg-white px-4 md:relative md:z-0 md:w-full md:translate-x-0 md:px-0 ${isActiveFilter ? 'translate-x-0' : 'translate-x-[-100%]'
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
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
      <div className='py-4' ref={ref}>
        <Link
          to={path.products}
          className={classNames('flex items-center font-bold', {
            'text-orange': !category
          })}
        >
          <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
            <g fillRule='evenodd' stroke='none' strokeWidth={1}>
              <g transform='translate(-373 -208)'>
                <g transform='translate(155 191)'>
                  <g transform='translate(218 17)'>
                    <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                    <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                    <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  </g>
                </g>
              </g>
            </g>
          </svg>
          All Categories
        </Link>
        <div className='line-hr'></div>
        <ul>
          {categories.map((categoryItem) => {
            const isActive = category === categoryItem._id
            return (
              <li className='py-2 pl-2' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.products,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames('relative px-2', {
                    'font-semibold text-orange': isActive
                  })}
                >
                  {isActive && (
                    <svg viewBox='0 0 4 7' className={classNames('absolute top-1 left-[-10px] h-2 w-2 fill-orange')}>
                      <polygon points='4 3.5 0 0 0 7' />
                    </svg>
                  )}
                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
        </ul>
        <Link to={path.products} className='mt-2 flex items-center font-bold uppercase'>
          <svg
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x={0}
            y={0}
            className='mr-3 h-4 w-3 fill-current stroke-current'
          >
            <g>
              <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </g>
          </svg>
          Search filter
        </Link>
        <div className='my-2 h-[1px]'></div>
        <div className='my-2'>
          <div className='text-sm'>About</div>
          <form onSubmit={onSubmit} className='mt-2'>
            <div className='flex items-start'>
              {/* <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='đ TỪ'
                    classNameError='hidden'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            /> */}

              <InputHook
                control={control}
                name='price_min'
                type='number'
                className='grow'
                placeholder='đ from'
                classNameError='hidden'
                classNameInput='px-2 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-md focus:shadow-sm'
                onChange={() => {
                  trigger('price_max')
                }}
              />

              <div className=' mx-2 mt-2 shrink-0 '>-</div>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      placeholder='đ to'
                      classNameError='hidden'
                      classNameInput='px-2 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-md focus:shadow-sm'
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        trigger('price_min')
                      }}
                    />
                  )
                }}
              />
            </div>
            <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600 '>{errors.price_min?.message}</div>
            <Button className='w-full border'>
              Apply
            </Button>
          </form>
        </div>
        <div className='line-hr'></div>
        <div className='text-sm'>Rating</div>
        <RatingStars queryConfig={queryConfig} />
        <div className='line-hr'></div>
        <div className='bg-gray-30 my-2 h-[1px]'></div>
        <Button
          onClick={handleRemoveAll}
          className='w-full border'
        >
          Remove all
        </Button>
      </div>
    </div>
  )
}
