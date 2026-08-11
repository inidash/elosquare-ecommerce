import { Link } from '@inertiajs/react'
import React from 'react'

export default function HeroSection({href, product, title}: {href:string, product: any,title:string}) {
  return (
    <section className='w-full h-[70px] bg-gray-500 py-4 px-4 mb-4'>
        <div className="flex flex-col justify-start items-start align-center ">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600">
              <p className="font-semibold text-white">
                Home
            </p>
            </Link>
            <span className="mx-2 text-1xl text-white">/</span>
            <Link href={href} className="hover:text-indigo-600">
              <p className="font-semibold text-white">
                {title}
            </p>
            </Link>
            <span className="mx-2 text-1xl text-white">/</span>
            <span className="text-gray-100 font-semibold">{product}</span>
          </div>
            
        </div>
    </section>
  )
}
