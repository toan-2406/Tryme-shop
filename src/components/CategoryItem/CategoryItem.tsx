import React from 'react'
import { Link } from 'react-router-dom'

interface Category {
  name: string,
  subname: string,
  image: string,
  slogan: string,
  link:string
}

interface Props {
  category: Category
}

export default function CategoryItem({ category }: Props) {
  return (
    <Link to={`/products?category=${category.link}`}>
    <div className='text-left flex flex-col justify-between overflow-hidden gap-2 rounded-[10px] w-full shadow-custom '>
      <div className="px-3 py-2">
        <div className='uppercase font-normal text-base '>{category.name}</div>
        <h3 className="font-russo text-2xl line-clamp-2 md:whitespace-nowrap">{category.subname}</h3>
        <p className="font-normal text-base line-clamp-2">{category.slogan}</p>
      </div>
      <div className="overflow-hidden h-[300px]">
        <img
          loading="lazy"
          src={category.image}
          alt={category.name}
          className='bg-cover h-full '
        />
      </div>
    </div>
  </Link>
  )
}
