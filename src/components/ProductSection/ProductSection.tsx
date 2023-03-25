
// {
//   rating,
//     activeClassName = 'h-3 w-3 fill-yellow-300 text-yellow-300',
//     nonActiveClassName = 'h-3 w-3 fill-current text-gray-300'
// }: {
//   rating: number
//   activeClassName ?: string
//   nonActiveClassName ?: string
// }
export default function ProductSection() {
  return (
    <section className="pt-[112px] pb-4">
      <div>TRANDING</div>
      <h2>Tranding Products</h2>
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
        <button>view all</button>
      </div>
      <div className="grid grid-cols-4 gap-8">
        <div>
          <div className="h-[304px] bg-black rounded-[10px]"></div>
          <div>
            <h3 className="font-semibold text-lg ">Productname</h3>
            <p className="font-normal text-sm ">Variant</p>
          </div>
          <div className="font-bold text-xl mt-2">$55.00</div>
        </div>
        <div>
          <div className="h-[304px] bg-black rounded-[10px]"></div>
          <div className="mt-4">
            <h3 className="font-semibold text-lg ">Productname</h3>
            <p className="font-normal text-sm ">Variant</p>
          </div>
          <div className="font-bold text-xl mt-2">$55.00</div>
        </div>
        <div>
          <div className="h-[304px] bg-black rounded-[10px]"></div>
          <div>
            <h3 className="font-semibold text-lg ">Productname</h3>
            <p className="font-normal text-sm ">Variant</p>
          </div>
          <div className="font-bold text-xl mt-2">$55.00</div>
        </div>
        <div>
          <div className="h-[304px] bg-black rounded-[10px]"></div>
          <div>
            <h3 className="font-semibold text-lg ">Productname</h3>
            <p className="font-normal text-sm ">Variant</p>
          </div>
          <div className="font-bold text-xl mt-2">$55.00</div>
        </div>
      </div>
    </section>
  )
}
