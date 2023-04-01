import logo from 'src/assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { navLink, policyLink } from 'src/constants/fakedata'
import path from 'src/constants/path'
export default function Footer() {
  return (
    <footer className=' bg-pink'>
      <div className='flex flex-col justify-center items-center pt-5 lg:pt-20 container'>
        <div>
          <Link to={path.home} aria-label="Home page Link">
            <img src={logo} height={62} width={180} alt='logo' />
          </Link>
        </div>
        <nav className='mt-8'>
          <ul>
            {
              navLink.map((navLink, index) => {
                return <li key={index} className=' inline-block '>
                  <NavLink to={navLink.path} className={({ isActive }) => (isActive ? "border-2 text-black px-2 font-russo  " : "font-russo transition-all ease-linear duration-100 text-gray px-3 py-1")} >
                    {navLink.displayName}
                  </NavLink>
                </li>
              })
            }
          </ul>
        </nav>
      </div>
      <hr className='mt-8 mb-4 md:mt-16 md:mb-8 container' />
      <div className='flex flex-col gap-2 md:flex-row items-center justify-between container pb-5 lg:pb-20'>
        <div className='text-sm  font-normal text-black'>2022 Relume. All right reserved.</div>
        <nav>
          <ul>
            {
              policyLink.map((policy, index) => {
                return <li key={index} className="inline-block ml-2">
                  <Link to={policy.path} className='text-black text-center text-sm font-medium'>
                    {policy.displayName}
                  </Link>
                </li>
              })
            }
          </ul>
        </nav>
      </div>

    </footer>
  )
}
