import icon from 'src/assets/images/iconlist.png'
const Why = () => {
  return (
 <section className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-20 pt-10 lg:pt-28 pb-4">
    <div className="">
        <img className=" rounded-lg w-full " src="https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" alt="fashion" />
    </div>
    <div className="grid content-center gap-y-2 lg:gap-y-4">
        <h2 className="font-russo text-4xl lg:text-5xl">Why Choose Our Ecommerce Store</h2>
        <p className="font-normal text-lg tracking-tight">Our e-commerce store offers a unique shopping experience that sets us apart from the competition. Here are just a few reasons why you should choose our store for all your online shopping needs.</p>
        <ul style={{listStyleImage:`url(${icon})`}}  className="list-disc list-inside space-y-1 lg:space-x-2">
            <li className='align-middle font-normal text-base '>Wide product selection </li>
            <li className='align-middle font-normal text-base '>Competitive pricing</li>
            <li className='align-middle font-normal text-base '>Quality guarantee</li>
            <li className='align-middle font-normal text-base '>Fast shipping</li>
            <li className='align-middle font-normal text-base '>Secure payment options</li>
            <li className='align-middle font-normal text-base '>Exceptional customer service</li>
        </ul>
    </div>
 </section>
  )
}

export default Why
