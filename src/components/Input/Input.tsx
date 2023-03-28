import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import React, { InputHTMLAttributes } from 'react'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  lable?: string
  placeholder?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  type,
  lable,
  placeholder,
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = 'px-4 w-full py-2 border rounded-md text-gray-700 focus:outline-none',
  classNameError = 'mt-1 text-red-600 min-h-[1rem] text-sm',
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      {lable && <label htmlFor={lable} className="text-base font-medium mb-2">{lable}</label>}
      {
        type === 'textarea' ? <textarea className={classNameInput} placeholder={placeholder} name={name} rows={4}  ></textarea> : <input type={type} className={classNameInput} {...registerResult} {...rest} />
      }
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
