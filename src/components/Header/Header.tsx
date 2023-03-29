import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, Link, NavLink, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import purchaseApi from 'src/apis/purchase.api'
import noProduct from 'src/assets/images/no-product.png'
import { navLink } from 'src/constants/fakedata'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import useQueryConfig from 'src/hooks/useQueryConfig'
import useSearchProducts from 'src/hooks/useSearchProducts'
import { schema, Schema } from 'src/utils/rules'
import { formatCurrency, getAvatarURL } from 'src/utils/utils'
import NavHeader from '../NavHeader'
import Popover from '../Popover'
import logo from 'src/assets/images/logo.png'
import useClickOutside from 'src/hooks/useClickOutSide'
type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])
const MAX_INCART = 5

export default function Header() {
  const { onSubmitSearch, register } = useSearchProducts()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isActiveNavLink, setIsActiveNavLink] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated // chỉ gọi khi đã đăng nhập
  })

  const purchasesInCart = purchasesInCartData?.data.data
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
      // removeQueries xóa dữ liệu của purchase
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  const ref = useClickOutside(() => setIsOpen(false));
 
  return (
    <header
      className={`fixed top-0 z-20 w-full py-4 text-white transition-all duration-100 ease-linear ${
        scrollPosition >= 100 ? 'bg-pink shadow-lg' : ''
      }`}
    >
      <div className='container'>
        <div className='flex items-center justify-between gap-2'>
          <div className='z-50 rounded-md bg-white lg:hidden' onClick={() => setIsOpen(!isOpen)}>
            <svg width='31' height='31' viewBox='0 0 31 31' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M4.23895 15.2196H26.739'
                stroke='black'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M4.23895 7.7196H26.739'
                stroke='black'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M4.23895 22.7196H26.739'
                stroke='black'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <div>
            <Link to='/'>
              <img src={logo} alt='logo' />
            </Link>
          </div>

          <nav
            className={`fixed top-0 left-0 z-40 w-3/4 transition-all ease-linear lg:relative lg:translate-x-0  ${
              isOpen ? 'translate-x-0' : 'translate-x-[-100%]'
            }`}
            ref={ref}
          >
            <ul className='flex h-screen flex-col items-center justify-center gap-6 bg-white lg:h-auto lg:flex-row lg:bg-transparent'>
              {navLink.map((navLink, index) => {
                return (
                  <li key={index} className='ml-3 inline-block'>
                    <NavLink to={navLink.path} className={({ isActive }) => (isActive ? "font-bold text-red-500" : "font-bold text-gray")} >
                      {navLink.displayName}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className='flex items-center gap-[10px]'>
            <div>
              <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M13.75 23.75C19.2728 23.75 23.75 19.2728 23.75 13.75C23.75 8.22715 19.2728 3.75 13.75 3.75C8.22715 3.75 3.75 8.22715 3.75 13.75C3.75 19.2728 8.22715 23.75 13.75 23.75Z'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M26.25 26.25L20.8125 20.8125'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div>
              <Popover
                renderPopover={
                  <div className='relative  max-w-[300px] rounded-md bg-[#e1e0da] md:max-w-[400px]  '>
                    {purchasesInCart && purchasesInCart.length > 0 ? (
                      <div className='p-3'>
                        <div className='text-sm font-semibold capitalize'>Shopping cart</div>
                        <div className='mt-5'>
                          {purchasesInCart.slice(0, MAX_INCART).map((purchase) => (
                            <div key={purchase._id} className='hover:bg-gray-100 mt-2 flex items-center py-2'>
                              <div className='flex-shrink-0'>
                                <img
                                  src={purchase.product.image}
                                  alt={purchase.product.name}
                                  className='h-11 w-11 object-cover'
                                />
                              </div>
                              <div className='ml-2 flex-grow overflow-hidden'>
                                <div className='truncate text-sm font-medium '>{purchase.product.name}</div>
                              </div>
                              <div className='ml-2 flex-shrink-0'>
                                <span className='text-semibold text-sm text-orange'>
                                  {formatCurrency(purchase.product.price)} đ
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className='mt-6 flex items-center justify-between'>
                          <div className='text-gray-500 text-xs font-medium capitalize'>
                            {purchasesInCart.length > MAX_INCART ? purchasesInCart.length - MAX_INCART : ''} Add to cart
                          </div>
                          <Link
                            to={path.cart}
                            className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:bg-opacity-90'
                          >
                            View cart
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className=' flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                        <img src={noProduct} alt='no purchase' className='h-24 w-24' />
                        <div className='mt-3 capitalize'>Cart empty</div>
                      </div>
                    )}
                  </div>
                }
              >
                <div className='relative'>
                  <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M7.5 2.5L3.75 7.5V25C3.75 25.663 4.01339 26.2989 4.48223 26.7678C4.95107 27.2366 5.58696 27.5 6.25 27.5H23.75C24.413 27.5 25.0489 27.2366 25.5178 26.7678C25.9866 26.2989 26.25 25.663 26.25 25V7.5L22.5 2.5H7.5Z'
                      stroke='black'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M3.75 7.5H26.25'
                      stroke='black'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M20 12.5C20 13.8261 19.4732 15.0979 18.5355 16.0355C17.5979 16.9732 16.3261 17.5 15 17.5C13.6739 17.5 12.4021 16.9732 11.4645 16.0355C10.5268 15.0979 10 13.8261 10 12.5'
                      stroke='black'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>

                  {purchasesInCart && purchasesInCart.length > 0 && (
                    <div className='absolute top-[-5px] left-[17px] rounded-full shadow-[0px_0px_4px_0px_#00000078] h-5 w-5 text-center font-bold bg-white text-xs text-red-600 '>
                      {purchasesInCart?.length}
                    </div>
                  )}
                </div>
              </Popover>
            </div>
            {isAuthenticated ? (
              <Popover
                renderPopover={
                  <div className=' relative'>
                    <Link to={path.profile} className='item'>
                      My account
                    </Link>
                    <Link to={path.historyPurchase} className='item'>
                      Order buy
                    </Link>
                    <button
                      onClick={handleLogout}
                      className=' block w-full bg-[#e1e0da] py-2 px-3 text-left hover:bg-slate-100 hover:text-orange'
                    >
                      Logout
                    </button>
                  </div>
                }
                className='hover:text-gray-300 ml-6 flex cursor-pointer items-center py-1'
              >
                <div className=' h-10 w-10 rounded-full bg-white p-1'>
                  <img
                    src={getAvatarURL(profile?.avatar)}
                    alt='avatar'
                    className='h-full w-full rounded-full object-cover'
                  />
                </div>
              </Popover>
            ) : (
              <div>
                <Link to={path.login}>
                  <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M25 26.25V23.75C25 22.4239 24.4732 21.1521 23.5355 20.2145C22.5979 19.2768 21.3261 18.75 20 18.75H10C8.67392 18.75 7.40215 19.2768 6.46447 20.2145C5.52678 21.1521 5 22.4239 5 23.75V26.25'
                      stroke='black'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M15 13.75C17.7614 13.75 20 11.5114 20 8.75C20 5.98858 17.7614 3.75 15 3.75C12.2386 3.75 10 5.98858 10 8.75C10 11.5114 12.2386 13.75 15 13.75Z'
                      stroke='black'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
          {/* <form className='col-span-9' onSubmit={onSubmitSearch}>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                type='text'
                className='flex-grow border-none bg-transparent py-2 text-black outline-none'
                {...register('name')}
              />
              <button className='flex-shrink-0 rounded-sm bg-orange py-2 px-6 hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form> */}
        </div>
      </div>
    </header>
  )
}
