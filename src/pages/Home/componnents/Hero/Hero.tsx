import { Link } from "react-router-dom";
import path from "src/constants/path";

export default function Hero() {

  return (
    <div className="bg-pink h-screen md:max-h-[600px] xl:max-h-[900px] pt-20 relative">
      <div className="container h-full">
        <div className=" h-full grid grid-cols-1 md:grid-cols-2">
          <div className="grid content-center gap-2 md:gap-4">
            <h1 className="font-russo font-normal text-4xl lg:text-6xl">Discover Your Fashionista Side Today</h1>
            <p className="text-base font-normal">Shop the latest fashion trends at TRYME. From stylish tops to trendy bottoms, find the perfect outfit for any occasion. Stay ahead of the game with our curated collections. Start shopping now!</p>
            <span>

              <Link to={path.products} className=' border-4 p-1 inline-block'>
                <button className='bg-black text-3xl text-pink uppercase  px-2 py-1  font-russo font-normal'>
                  Shop now
                </button>
              </Link>
            </span>
          </div>
          <div className=" lg:absolute bottom-0 right-0 lg:w-1/2 lg:h-full lg:pt-20 pt-2 lg:pl-6">
            <img loading="lazy" className="bg-cover h-full rounded-tl-[200px]" src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ecommerce" />
          </div>
        </div>
      </div>
    </div>

  )
}
