import icon from 'src/assets/images/iconlist.png'
const Why = () => {
  return (
 <section className="grid grid-cols-1 sm:grid-cols-12 gap-2 lg:gap-20 pt-10 lg:pt-28 pb-4">
    <div className="sm:col-span-6 lg:col-span-5 h-full flex items-center justify-center">
        <img className="object-cover object-top rounded-lg max-h-[300px] w-full md:max-h-[550px] h-full " src="https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" alt="fashion" />
    </div>
    <div className="sm:col-span-6 lg:col-span-7 flex flex-col items-start justify-center space-y-2">
        <h2 className="font-russo font-normal text-4xl lg:text-5xl">Why Choose Our Ecommerce Store</h2>
        <p className="font-normal text-lg tracking-tight">Our e-commerce store offers a unique shopping experience that sets us apart from the competition. Here are just a few reasons why you should choose our store for all your online shopping needs.</p>
        <ul style={{listStyleImage:`url(${icon})`}}  className="list-disc list-inside ">
            <li className='font-normal text-base '>Wide product selection </li>
            <li className='font-normal text-base '>Competitive pricing</li>
            <li className='font-normal text-base '>Quality guarantee</li>
            <li className='font-normal text-base '>Fast shipping</li>
            <li className='font-normal text-base '>Secure payment options</li>
            <li className='font-normal text-base '>Exceptional customer service</li>
        </ul>
    </div>
 </section>
  )
}

export default Why
