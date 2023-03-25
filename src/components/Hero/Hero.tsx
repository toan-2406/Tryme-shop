export default function Hero() {
  return (
    <div className="bg-[#F6E6CD] pt-[72px] h-screen ">
      <div className="w-1/2 h-full rounded-tl-[200px] bg-white float-right overflow-hidden">
        <img className="bg-cover h-full" src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ecommerce" />
      </div>
     <div className="container pt-[8.5rem] space-y-6">
      <h1 className="font-russo text-[56px]">Medium length hero headline goes here</h1>
      <p className="text-lg font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
     
      <a href="#" className="block" >
      <button className="bg-gradient-to-l from-[#F47726] to-[#FFB483] w-[185px] py-4 text-center rounded-[100px] text-base font-bold text-white shadow-lg shadow-[#00000048]">
      Start Looking
      </button>
      </a>
     </div>
    </div>
  )
}
