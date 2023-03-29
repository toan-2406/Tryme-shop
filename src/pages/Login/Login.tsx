import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { setProfileToLS } from 'src/utils/auth'
import authApi from 'src/apis/auth.api'
import { Helmet } from 'react-helmet-async'
import image from 'src/assets/images/screenauth.png'
type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

const Login = () => {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    //onValid
    console.log(data)
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfileToLS(data.data.data.user)
        console.log(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange '>
      <Helmet>
        <title>Đăng nhập | Tryme Shop</title>
        <meta name='description' content='Đăng nhập vào dự án Tryme Shop' />
      </Helmet>
      <div className='container '>
        <div className='grid grid-cols-1 py-4 lg:grid-cols-12 gap-4 '>
          <div className='col-span-12 md:col-span-7 hidden md:block'>
            <img src={image} alt="imgae" className='bg-contain'/>
          </div>
          <div className='lg:col-span-5 col-span-12 grid content-center'>
            <form onSubmit={onSubmit} className='rounded-md bg-white px-5 py-10 md:px-10 shadow-sm' noValidate>
              <div className='text-2xl font-semibold'>Đăng nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'

                placeholder='Email'
                errorMessage={errors.email?.message}
              ></Input>
              <Input
                name='password'
                type='password'
                className='mt-2'
                placeholder='Password'
                register={register}
                autoComplete='on'
                errorMessage={errors.password?.message}
              ></Input>
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center  py-3 px-2 text-center text-sm uppercase text-white transition-all ease-linear hover:bg-orange'
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản ?</span>
                <Link className='ml-1 text-red-400 font-bold' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
