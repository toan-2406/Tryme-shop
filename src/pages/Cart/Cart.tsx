import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { ExtendedPurchase, Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import produce from 'immer'
import keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import noProduct from '../../assets/images/no-product.png'

export default function Cart() {
  // const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchasesStatus.inCart })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyProduct,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const location = useLocation()

  const purchaseId = (location.state as { purchaseId: string } | null)?.purchaseId
  const purchasesInCart = purchasesInCartData?.data.data
  const checkedPurchasesLength = extendedPurchases.length

  const isAllChecked = useMemo(
    () => extendedPurchases.every((purchase) => purchase.checked === true),
    [extendedPurchases]
  )
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])

  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const hasPurchaseIdFromLocation = purchaseId === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: hasPurchaseIdFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, purchaseId])

  useEffect(() => {
    return () => {
      window.history.replaceState(null, '')
    }
  }, [])

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeletePurchases = () => {
    const purchaseIdList = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIdList)
  }

  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='text-gray-500 grid grid-cols-12 rounded-md bg-white py-5 px-9 text-md capitalize shadow'>
                  <div className='col-span-5'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>Choose all</div>
                    </div>
                  </div>
                  <div className='col-span-7'>
                    <div className='grid grid-cols-4 text-center'>
                      <div className='col-span-1 '>Price</div>
                      <div className='col-span-1 '>Quantity</div>
                      <div className='col-span-1 '>Total</div>
                      <div className='col-span-1 '>Action</div>
                    </div>
                  </div>
                </div>
                {extendedPurchases.length > 0 && (
                  <div className='my-3 rounded-md bg-white p-5 shadow'>
                    {extendedPurchases &&
                      extendedPurchases.map((purchase, index) => (
                        <div
                          key={purchase._id}
                          className='mb-5 grid grid-cols-12 items-center border-b bg-white py-5 px-2 first:mt-0'
                        >
                          <div className='col-span-5'>
                            <div className='flex'>
                              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                <input
                                  type='checkbox'
                                  className='h-5 w-5 accent-orange'
                                  checked={purchase.checked}
                                  onChange={handleCheck(index)}
                                />
                              </div>
                              <div className='flex-grow'>
                                <div className='flex'>
                                  <Link
                                    className='h-20 w-20 flex-shrink-0'
                                    to={`${path.home}${generateNameId({
                                      name: purchase.product.name,
                                      id: purchase.product._id
                                    })}`}
                                  >
                                    <img alt={purchase.product.name} src={purchase.product.image} />
                                  </Link>
                                  <div className='flex-grow px-2 pt-1 pb-2'>
                                    <Link
                                      to={`${path.home}${generateNameId({
                                        name: purchase.product.name,
                                        id: purchase.product._id
                                      })}`}
                                      className='text-left text-md font-medium line-clamp-2 '
                                    >
                                      {purchase.product.name}
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
                                  <span className='text-gray-300  text-base line-through'>
                                    ₫{formatCurrency(purchase.product.price_before_discount)}
                                  </span>
                                  <span className='ml-3  text-base font-medium '>
                                    ₫{formatCurrency(purchase.product.price)}
                                  </span>
                                </div>
                              </div>
                              <div className='col-span-2 flex items-center justify-center'>
                                <QuantityController
                                  max={purchase.product.quantity}
                                  value={purchase.buy_count}
                                  classNameWrapper='flex items-center'
                                  onIncrease={(value) =>
                                    handleQuantity(index, value, value <= purchase.product.quantity)
                                  }
                                  onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                  onType={handleTypeQuantity(index)}
                                  onFocusOut={(value) =>
                                    handleQuantity(
                                      index,
                                      value,
                                      value <= purchase.product.quantity &&
                                        value >= 1 &&
                                        value !== (purchasesInCart as Purchase[])[index].buy_count
                                    )
                                  }
                                  disabled={purchase.disabled}
                                />
                              </div>
                              <div className='col-span-1'>
                                <span className='text-bold text-base text-orange'>
                                  ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                                </span>
                              </div>
                              <div className='col-span-1'>
                                <button onClick={handleDelete(index)} className='bg-none '>
                                  <svg
                                    width='31'
                                    height='31'
                                    viewBox='0 0 31 31'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M3.95166 7.60991H6.45166H26.4517'
                                      stroke='black'
                                      stroke-width='2'
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                    />
                                    <path
                                      d='M23.9517 7.60991V25.1099C23.9517 25.773 23.6883 26.4088 23.2194 26.8777C22.7506 27.3465 22.1147 27.6099 21.4517 27.6099H8.95166C8.28862 27.6099 7.65273 27.3465 7.18389 26.8777C6.71505 26.4088 6.45166 25.773 6.45166 25.1099V7.60991M10.2017 7.60991V5.10991C10.2017 4.44687 10.4651 3.81098 10.9339 3.34214C11.4027 2.8733 12.0386 2.60991 12.7017 2.60991H17.7017C18.3647 2.60991 19.0006 2.8733 19.4694 3.34214C19.9383 3.81098 20.2017 4.44687 20.2017 5.10991V7.60991'
                                      stroke='black'
                                      stroke-width='2'
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                    />
                                    <path
                                      d='M12.7017 13.8599V21.3599'
                                      stroke='black'
                                      stroke-width='2'
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                    />
                                    <path
                                      d='M17.7017 13.8599V21.3599'
                                      stroke='black'
                                      stroke-width='2'
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              
            </div>
            <div className='text-right mt-2'>
                <Button onClick={handleDeletePurchases} className='bg-red-400 hover:bg-red-500'>
                  Cancle all
                </Button>
              </div>
            <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-md border bg-white p-5 shadow md:flex-row md:items-center'>
              <div className='flex items-center'>
                <div>
                  <input
                    type='checkbox'
                    className='che h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <div className='mx-3 border-none bg-none text-base'>Choose all ({extendedPurchases.length})</div>
              </div>

              <div className='mt-5 flex flex-col md:ml-auto md:mt-0 md:flex-row md:items-center'>
                <div>
                  <div className='flex items-center md:justify-end'>
                    <div className='font-medium text-base'>Total checkout of ({checkedPurchasesLength}) item:</div>
                    <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                  </div>
                  <div className='flex items-center text-md md:justify-end'>
                    <div className='font-medium text-base'>Save money</div>
                    <div className='ml-3 text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                  </div>
                </div>
                <Button
                  onClick={handleBuyPurchases}
                  disabled={buyProductMutation.isLoading}
                  className='bg-green-400 mt-2 hover:bg-green-500 ml-3'
                >
                  Buy
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <img src={noProduct} alt='no purchase' className='mx-auto h-24 w-24' />
            <div className='text-gray-400 mt-5 font-bold'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className=' rounded-md bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
              >
                Buy now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
