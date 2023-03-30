import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import { purchasesStatus } from 'src/constants/purchase'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import path from 'src/constants/path'
import InfiniteScroll from 'react-infinite-scroll-component'
export default function HistoryPurchase() {
  const { data: historyPurchaseList } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.all }],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchasesStatus.all })
  })
  const list = historyPurchaseList?.data.data
  const renderStatus = (status: number) => {
    let state = '';
    let bgColor = '';

    switch (status) {
      case 1:
        state = 'Pending';
        bgColor = '#fb9d08';
        break;
      case 2:
        state = 'Getting';
        bgColor = '#447df6';
        break;
      case 3:
        state = 'InProgress';
        bgColor = '#ea1df7';
        break;
      case 4:
        state = 'Delivered';
        bgColor = '#15f463';
        break;
      case 5:
        state = 'Cancelled';
        bgColor = '#fb4040';
        break;
      default:
        state = '';
        break;
    }

    return (
      <div
        className='inline rounded-md  py-1 px-2 text-center font-bold'
        style={{ backgroundColor: `${bgColor}` }}
      >
        {state}
      </div>
    );
  };
  return (
    <div className='rounded-md px-3 pb-5 shadow-[0px_0px_4px_0px_#00000078] ' >
      <div className='border-b-gray-200 grid grid-cols-12 border-b py-4'>
        <div className='col-span-4'>
          <h2 className='text-gray-900 text-lg font-bold capitalize'>History Order Buy</h2>
          <div className='text-gray-700 mt-1 text-sm'>Manage order buy information</div>
        </div>
      </div>
      <div>
        <div className='overflow-x-auto'>
          <div className='min-w-[1000px]'>
            <div className='text-gray-500 text-md grid grid-cols-12 rounded-md bg-white py-5 px-9 capitalize shadow'>
              <div className='col-span-5 font-semibold'>
                Name & Image
              </div>
              <div className='col-span-7'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-1 font-semibold '>Price</div>
                  <div className='col-span-1 font-semibold '>Quantity</div>
                  <div className='col-span-1 font-semibold '>Total</div>
                  <div className='col-span-1 font-semibold '>Status</div>
                </div>
              </div>
            </div>
            {/* <InfiniteScroll next={} hasMore={false} children={undefined} loader={undefined} dataLength={0}
            > */}
              <div className='my-3 rounded-md bg-white p-5 shadow'>
                {list?.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className='mb-5 grid grid-cols-12 items-center border-b bg-white py-5 px-2 first:mt-0'
                    >
                      <div className='col-span-5'>
                        <div className='flex'>
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
                              <span className='ml-3 text-base font-medium '> ₫{formatCurrency(item.product.price)}</span>
                            </div>
                          </div>
                          <div className='col-span-1 flex items-center justify-center'>{item.buy_count}</div>
                          <div className='col-span-1'>
                            <span className='font-semibold text-base text-orange'>
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
            {/* </InfiniteScroll> */}

          </div>
        </div>
      </div>
    </div>
  )
}
