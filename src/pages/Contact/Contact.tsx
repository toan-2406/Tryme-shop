import Button from 'src/components/Button'
import Input from 'src/components/Input'
import image from 'src/assets/images/screencontact.png'
import { socailContacts } from 'src/constants/fakedata'
import DOMPurify from 'dompurify'
import { Link } from 'react-router-dom'
import HelmetWrapper from 'src/components/HelmetWrapper'
export default function Contact() {
  return (
    <HelmetWrapper title='Contact Page' content='Contact Page of Tryme Shop'>
 <div className='container pt-24 pb-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-12'>
        <div className='md:col-span-6'>
          <h1 className='font-russo font-normal text-4xl'>Contact us</h1>
          <p className='text-base font-normal'>
            Please fill out the form below to get in touch with us. We'll get back to you as soon as possible.
          </p>
          <form className='rounded-md bg-white py-4 shadow-sm md:pr-10' noValidate>
            <Input name='name' lable='Name' type='text' />
            <Input name='email' lable='Email' type='email' />
            <Input name='message' lable='Message' type='textarea' placeholder='Type your message' />
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input type='checkbox' className='h-5 w-5 accent-orange' />
              </div>
              <div className='flex-grow text-sm text-black'>I accept the Terms</div>
            </div>
            <button className='mt-6 py-3 px-6 rounded-[100px] bg-black text-base font-bold capitalize text-white shadow-lg transition-all  ease-linear hover:bg-green-700'>
              Submit
            </button>
          </form>
        </div>
        <div className='md:col-span-6'>
          <img loading="lazy" src={image} alt="contact us" className='bg-cover h-full' />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-12'>
        {
          socailContacts.map((item, index) => {
            return <div className='bg-white rounded-md shadow-custom  p-3 cols-span-6 md:col-span-3 flex flex-col gap-2' >
              <div dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.icon)
              }} />
              <h3 className='font-bold text-2xl'>{item.name}</h3>
              <Link to={item.href} className="text-base underline break-words">
                {item.linkname}
              </Link>
            </div>
          })
        }
      </div>
    </div>
    </HelmetWrapper>
   
  )
}
