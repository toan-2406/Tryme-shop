import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import config from 'src/constants/config'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { setProfileToLS } from 'src/utils/auth'
import { userSchema, UserSchema } from 'src/utils/rules'
import { getAvatarURL, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import DateSelect from '../../components/DateSelect'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth: string
}

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  console.log(previewImage)

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data

  const updateProfileMutation = useMutation(userApi.updateProfile)

  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  const watchAvatar = watch('avatar')

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = watchAvatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    console.log(fileFromLocal)
    if (
      (fileFromLocal && fileFromLocal?.size >= config.maxSizeUploadAvatar) ||
      !fileFromLocal?.type.includes('image')
    ) {
      toast.error('File không đúng quy định')
    }
    setFile(fileFromLocal)
  }

  return (
    <div className='rounded-md px-3 pb-5 shadow-[0px_0px_4px_0px_#00000078] md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-4'>
        <h2 className='text-lg font-bold capitalize text-gray-900'>My profile</h2>
        <div className='mt-1 text-sm text-gray-700'>Manage profile information for account security</div>
      </div>
      {/* <FormProvider {...methods}> */}
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 text-base capitalize sm:w-[20%] sm:text-right mb-1'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          {/* <Info /> */}
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 text-base capitalize sm:w-[20%] sm:text-right mb-1'>Name</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-500  focus:shadow-sm'
                register={register}
                name='name'
                placeholder='Tên'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 text-base capitalize sm:w-[20%] sm:text-right mb-1'>Phone Number</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-500  focus:shadow-sm'
                    placeholder='Số điện thoại'
                    errorMessage={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 text-base capitalize sm:w-[20%] sm:text-right mb-1'>Address</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-500  focus:shadow-sm'
                register={register}
                name='address'
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} value={field.value} onChange={field.onChange} />
            )}
          />
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 text-base capitalize sm:w-[20%] sm:text-right mb-1' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                type='submit'
                className='border hover:border font-medium '
              >
              Save
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src={previewImage || getAvatarURL(profile?.avatar)}
                alt=''
                className='h-full w-full rounded-full object-cover border'
              />
            </div>
            {/*       <InputFile onChange={handleChangeFile} /> */}
            <input
              className='hidden'
              type='file'
              accept='.jpg,.jpeg,.png'
              ref={fileInputRef}
              onChange={onFileChange}
              onClick={(event) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ;(event.target as any).value = null
              }}
            />
            <button
              type='button'
              className='flex h-10 items-center justify-end rounded-md border bg-white px-6 text-base'
              onClick={handleUpload}
            >
              Upload
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Maximum size 1 MB</div>
              <div>File format:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
      {/* </FormProvider> */}
    </div>
  )
}
