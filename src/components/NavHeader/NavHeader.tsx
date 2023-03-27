import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import Popover from '../Popover'
import userImage from '../../assets/images/user.svg'
import { getAvatarURL } from 'src/utils/utils'

export default function NavHeader() {
  const queryClient = useQueryClient()
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
      // removeQueries xóa dữ liệu của purchase
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex justify-end'>
      {isAuthenticated && (
        <Popover
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link to={path.profile} className='block bg-white py-2 px-3 hover:bg-slate-100 hover:text-cyan-500'>
                My account
              </Link>
              <Link to='/' className='block bg-white py-2 px-3 hover:bg-slate-100 hover:text-cyan-500'>
                Order buy
              </Link>
              <button
                onClick={handleLogout}
                className=' block w-full bg-white py-2 px-3 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Logout
              </button>
            </div>
          }
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'
        >
          <div className='mr-2 h-5 w-5 flex-shrink-0 '>
            <img src={getAvatarURL(profile?.avatar)} alt='avatar' className='h-full w-full rounded-full object-cover' />
          </div>
          <div>{profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize opacity-70 hover:text-white'>
            Đăng ký
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40'></div>
          <Link to={path.login} className='mx-3 capitalize opacity-70 hover:text-white'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
