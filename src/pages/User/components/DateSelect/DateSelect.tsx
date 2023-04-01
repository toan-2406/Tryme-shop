import range from 'lodash/range'
import React, { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ onChange, value, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate(),
        month: value?.getMonth(),
        year: value?.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 mb-1 capitalize sm:w-[20%] sm:text-right text-sm font-medium '>Date of birth</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex gap-2 justify-between'>
          <select
            onChange={handleChange}
            name='date'
            className='h-10 w-1/3 cursor-pointer rounded-md border  px-3 hover:border-orange'
            value={value?.getDate() || date.date}
          >
            <option disabled className='font-russo font-normal text-[12px]'>Date</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='month'
            className='h-10 w-1/3 cursor-pointer rounded-md border  px-3 hover:border-orange'
            value={value?.getMonth() || date.month}
          >
            <option disabled className="font-russo font-normal text-[12px]">Month</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='year'
            className='h-10 w-1/3 cursor-pointer rounded-md border  px-3 hover:border-orange'
            value={value?.getFullYear() || date.year}
          >
            <option disabled className='font-russo font-normal text-[12px]'>Year</option>
            {range(1990, 2024).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}
