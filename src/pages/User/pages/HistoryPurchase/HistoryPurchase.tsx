import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import { purchasesStatus } from 'src/constants/purchase'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import path from 'src/constants/path'
import Input from 'src/components/Input'
import useSearchProducts from 'src/hooks/useSearchProducts'
export default function HistoryPurchase() {
  const { onSubmitSearch, register } = useSearchProducts()
  const { data: historyPurchaseList, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.all }],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchasesStatus.all })
  })
  const list = historyPurchaseList?.data.data
  const renderStatus = (status: number) => {
    const state =
      status === 1 ? (
        <span className='text-bold text-sm text-yellow-600'>Pending</span>
      ) : status === 2 ? (
        'Getting'
      ) : status === 3 ? (
        'InProgress'
      ) : status === 4 ? (
        'Delivered'
      ) : status === 5 ? (
        'Cancelled'
      ) : (
        ''
      )
    return <div className='inline rounded-sm border py-1 px-2 text-center'>{state}</div>
  }
  return (
    <div className='rounded-md px-3 pb-5 shadow-lg md:px-7 md:pb-20'>
      <div className='border-b-gray-200 grid grid-cols-12 border-b py-4'>
        <div className='col-span-4'>
          <h2 className='text-gray-900 text-lg font-bold capitalize'>History Order Buy</h2>
          <div className='text-gray-700 mt-1 text-sm'>Manage order buy information</div>
        </div>
        <div className='col-span-4'></div>
        <div className='col-span-4 '>
         <form onSubmit={onSubmitSearch}>
         <input
            type='text'
            placeholder='Search oder buy'
            className='text-gray-700 w-full rounded-md border px-4 py-2 focus:outline-none'
            {...register('name')}
          />
         </form>
        </div>
      </div>
      <div>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='text-gray-500 text-md grid grid-cols-12 rounded-md bg-white py-5 px-9 capitalize shadow'>
              <div className='col-span-5'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      // checked={isAllChecked}
                      // onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>Choose all</div>
                </div>
              </div>
              <div className='col-span-7'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-1 '>Price</div>
                  <div className='col-span-1 '>Quantity</div>
                  <div className='col-span-1 '>Total</div>
                  <div className='col-span-1 '>Status</div>
                </div>
              </div>
            </div>

            <div className='my-3 rounded-md bg-white p-5 shadow'>
              {list?.map((item) => {
                return (
                  <div
                    key={item._id}
                    className='mb-5 grid grid-cols-12 items-center border-b bg-white py-5 px-2 first:mt-0'
                  >
                    <div className='col-span-5'>
                      <div className='flex'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange'
                            // checked={purchase.checked}
                            // onChange={handleCheck(index)}
                          />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex'>
                            <Link
                              className='h-20 w-20 flex-shrink-0'
                              to={`${path.products}/${generateNameId({
                                name: item.product.name,
                                id: item.product._id
                              })}`}
                            >
                              <img src={item.product.image} alt={item.product.name} />
                            </Link>
                            <div className='flex-grow px-2 pt-1 pb-2'>
                              <Link
                                to={`${path.products}${generateNameId({
                                  name: item.product.name,
                                  id: item.product._id
                                })}`}
                                className='text-md text-left font-medium line-clamp-2 '
                              >
                                {item.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-7'>
                      <div className='grid grid-cols-5 items-center'>
                        <div className='col-span-1'>
                          <div className='flex flex-col items-center justify-center '>
                            <span className='ml-3  text-base font-medium '> ₫{formatCurrency(item.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1 flex items-center justify-center'>{item.buy_count}</div>
                        <div className='col-span-1'>
                          <span className='text-bold text-base text-orange'>
                            ₫{formatCurrency(item.product.price * item.buy_count)}
                          </span>
                        </div>
                        <div className='col-span-1'>
                          <div>{renderStatus(item.status)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-2 text-right'>
        <Button className='bg-red-400 hover:bg-red-500'>Remove History</Button>
      </div>
    </div>
  )
}
