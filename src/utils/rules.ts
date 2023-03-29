import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AnyObject } from 'yup/lib/types'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

//esLint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },

    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email not matching pattern'
    },
    maxLength: {
      value: 160,
      message: 'Maximum length is 160 characters'
    },
    minLength: {
      value: 5,
      message: 'Minimum length is 5 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    maxLength: {
      value: 160,
      message: 'Maximum length is 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Minimum length is 6 characters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm Password is enabled'
    },
    maxLength: {
      value: 160,
      message: 'Maximum length is 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Minimum length is 6 characters'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Password is invalid'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be a valid email address')
    .min(5, 'Minimum length is 5 characters')
    .max(160, 'Maximum length is 160 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Minimum length is 5 characters')
    .max(160, 'Maximum length is 160 characters'),
  confirm_password: yup
    .string()
    .required('Repassword is required')
    .min(5, 'Minimum length is 5 characters')
    .max(160, 'Maximum length is 160 characters')
    .oneOf([yup.ref('password')], 'Not a valid password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price not allowed',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price not allowed',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Product Name is required')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Maximum character length is 160 characters'),
  phone: yup.string().max(20, 'Maximum character length is 20 characters'),
  address: yup.string().max(160, 'Maximum character length is 160 characters'),
  avatar: yup.string().max(1000, 'Maximum character length is 1000 characters'),
  date_of_birth: yup.date().max(new Date(), 'Datetime not available, please select another date'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: schema.fields['confirm_password']
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
