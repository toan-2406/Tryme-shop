import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getRules, schema, Schema } from 'src/utils/rules'
import image from 'src/assets/images/screenauth.png'

import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'

import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { setProfileToLS } from 'src/utils/auth'
import { Helmet } from 'react-helmet-async'
import HelmetWrapper from 'src/components/HelmetWrapper'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

const Register = () => {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const value = watch()

  const onSubmit = handleSubmit((data) => {
    //onValid
    console.log(data)
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfileToLS(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <HelmetWrapper title='Register Page' content='Register Page of Tryme Shop'>
      <div className="bg-orange h-full">
      <div className='container '>
        <div className='grid grid-cols-1 py-4 lg:grid-cols-2 gap-4 '>
          <div className='hidden md:block'>
            <img loading="lazy" src={image} alt="imgae" className='max-h-[578px] bg-cover' />
          </div>
          <div className='flex items-center justify-center'>
          <form onSubmit={onSubmit} className='rounded-md bg-white px-5 py-10 w-3/4 md:px-10 shadow-sm'>
              <div className='font-semibold text-2xl'>Đăng ký</div>
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
              <Input
                name='confirm_password'
                type='password'
                autoComplete='on'
                className='mt-2'
                placeholder='Confirm_password'
                register={register}
                errorMessage={errors.confirm_password?.message}
              ></Input>
              <Button
                type='submit'
                className='flex w-full items-center justify-center  py-3 px-2 text-center text-sm uppercase text-white transition-all ease-linear hover:bg-orange'
                isLoading={registerAccountMutation.isLoading}
                disabled={registerAccountMutation.isLoading}
              >
                Đăng ký
              </Button>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản ?</span>
                <Link className='ml-1 text-red-400 font-bold' to={path.login}>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </HelmetWrapper>
  )
}

export default Register
