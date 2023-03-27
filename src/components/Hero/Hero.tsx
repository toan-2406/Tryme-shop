export default function Hero() {
  return (
    <div className="bg-pink h-screen xl:max-h-[900px] pt-20 ">
      <div className="container h-full">
        <div className=" h-full grid grid-cols-1 md:grid-cols-2">
          <div className="grid content-center gap-2 md:gap-4">
            <h1 className="font-russo text-4xl lg:text-6xl">Find Your Style with TRYME</h1>
            <p className="text-base font-normal">Shop the latest fashion trends at TRYME. From stylish tops to trendy bottoms, find the perfect outfit for any occasion. Stay ahead of the game with our curated collections. Start shopping now!</p>

            <a href="/products" className="block" >
              <button className="bg-gradient-to-l from-[#F47726] to-[#FFB483] w-[185px] py-4 text-center rounded-[100px] text-base font-bold text-white hover:shadow-lg hover:shadow-[#00000048] transition-shadow duration-150 ease-linear">
              Shop Now
              </button>
            </a>
          </div>
          <div className="pt-2">
            <img className="bg-cover h-full rounded-tl-[200px]" src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ecommerce" />
          </div>
        </div>
      </div>
    </div>

  )
}
