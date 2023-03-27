import icon from 'src/assets/images/iconlist.png'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
const Newsletter = () => {
  return (
    <section className=' lg:max-w-3xl mx-auto pt-10 lg:pt-28 pb-4'>
      <h2 className='font-russo text-center text-3xl lg:text-5xl '>Stay Up to Date with Our Newsletter</h2>
      <p className='text-center text-lg font-normal py-3'>
        Sign up for our newsletter to get exclusive offers, new product updates, and special discounts!
      </p>
      <div className=' md:px-[127.5px]'>
        <div className='gap-5 flex flex-col md:flex-row'>
          <Input className='h-[48px] md:float-left md:w-2/3 ' type={'email'} placeholder='Enter your email' classNameInput='rounded-[15px] w-full h-full px-4 border-2 font-semibold text-base' />
       <Button className='inline'>Sign up</Button>
        </div>
        <p className='text-center text-[12px] mt-2 font-normal text-[#8C8C8C]'>
          By clicking Sign Up you're confirming that you agree with our Terms and Conditions.
        </p>
      </div>
    </section>
  )
}

export default Newsletter
