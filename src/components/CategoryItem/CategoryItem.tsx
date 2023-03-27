import React from 'react'
import { Link } from 'react-router-dom'

interface Category {
  name: string,
  subname: string,
  image: string,
  slogan: string
}

interface Props {
  category: Category
}

export default function CategoryItem({ category }: Props) {
  return (
    // <Link to={`/products/${generateNameId({ name: product.name, id: product._id })}`}>
    <div className='text-left flex flex-col justify-between durantion-100 gap-2 h-[500px] w-full shadow-md transition-transform hover:translate-y-[-0.0925rem] hover:shadow-lg'>
      <div className="px-2 ">
        <div className='uppercase font-normal text-base '>{category.name}</div>
        <h3 className="font-russo text-2xl ">{category.subname}</h3>
        <p className="font-normal text-base">{category.slogan}</p>
      </div>
      <div className="overflow-hidden h-[300px]">
        <img
          src={category.image}
          alt={category.name}
          className='bg-cover h-full '
        />
      </div>
    </div>
    // </Link>
  )
}
