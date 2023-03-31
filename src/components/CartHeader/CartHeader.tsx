import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import useSearchProducts from 'src/hooks/useSearchProducts'
import NavHeader from '../NavHeader'
import logo from 'src/assets/images/logo.png'
import Button from '../Button'

export default function CartHeader() {
  const { onSubmitSearch, register } = useSearchProducts()

  return (
    <div className='border-b border-b-black/10'>
      <div className='bg-orange text-white'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>
      <div className='bg-white py-6'>
        <div className='container'>
          <nav className='md:flex md:items-center md:justify-between'>
            <Link to={path.home} className='flex flex-shrink-0 items-end'>
              <div>
                <img src={logo} alt="logo" />
              </div>
              <div className='mx-4 h-6 w-[1px] bg-orange md:h-8' />
              <div className='capitalize text-orange md:text-xl'>Shopping cart</div>
            </Link>
            <form className='mt-3 md:mt-0 md:w-[50%]' onSubmit={onSubmitSearch}>
              <div className='flex'>
                <input
                  type='text'
                  className='w-full border flex-grow mr-2 rounded-md bg-transparent px-3 py-1 text-black outline-none'
                  placeholder='Free shipping over $50'
                  {...register('name')}
                />
               <Button className='bg-orange rounded-full px-3'>
               <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5 stroke-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                  </svg>
               </Button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </div>
  )
}
