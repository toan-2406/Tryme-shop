import React from 'react'
import { sortBy, order as orderConstant } from 'src/constants/product'
import { QueryConfig } from '../../ProductList'
import classNames from 'classnames'
import { ProductListConfig } from 'src/types/product.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import omit from 'lodash/omit'
interface Props {
  queryConfig: QueryConfig
  totalPage: number
}

export default function SortProductList({ queryConfig, totalPage }: Props) {
  const currentPage = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.products,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.products,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3 '>
      <div className=''>
        <div className='text-center md:text-left text-base font-bold capitalize'>Sort by</div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
          <button
            className={classNames('border-gray-400 block w-full rounded-md py-2 px-3 text-center capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-[#e6e6e6] text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Popular
          </button>
          <button
            className={classNames(
              'border-gray-400 block w-full rounded-md py-2 px-3 text-center capitalize',
              { 'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt) },
              { 'bg-[#e6e6e6] text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt) }
            )}
            onClick={() => handleSort(sortBy.createdAt)}
          >
           Newest Arrials
          </button>
          <button
            className={classNames(
              'border-gray-400 block w-full rounded-mdpy-2 px-3 text-center capitalize',
              { 'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold) },
              { 'bg-[#e6e6e6] text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold) }
            )}
            onClick={() => handleSort(sortBy.sold)}
          >
            Featured
          </button>
          <div className='relative inline-block w-full'>
            <select
              className={classNames(
                'border-gray-400 block w-full appearance-none rounded-md py-2 px-3 text-center text-base focus:border-blue-500 focus:outline-none',
                {
                  'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
                  'bg-[#e6e6e6] text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
                }
              )}
              value={order || ''}
              onChange={(event) =>
                handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)
              }
            >
              <option className='bg-[#e6e6e6] text-black' value='' disabled>
                Price
              </option>
              <option className='bg-[#e6e6e6] text-black' value={orderConstant.asc}>
                Low to high
              </option>
              <option className='bg-[#e6e6e6] text-black' value={orderConstant.desc}>
               High to low
              </option>
            </select>
            <div className='text-gray-700 pointer-events-none absolute inset-y-0 right-0 flex items-center px-2'>
              <svg className='h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                <path d='M14.707 7.293a1 1 0 0 0-1.414 0L10 10.586 6.707 7.293a1 1 0 1 0-1.414 1.414l3.5 3.5a1 1 0 0 0 1.414 0l3.5-3.5a1 1 0 0 0 0-1.414z' />
              </svg>
            </div>
          </div>
        </div>
        <div className='mt-2 flex items-center justify-end'>
          <div>
            <span className='text-orange'>{currentPage}</span>
            <span>/{totalPage}</span>
          </div>
          <div className='ml-2 flex'>
            {currentPage === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.products,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (currentPage - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

            {currentPage === totalPage ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.products,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (currentPage + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
