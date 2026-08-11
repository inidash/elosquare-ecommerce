import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import UserLayout from '@/layouts/user-layout'
import { Link, useForm, usePage } from '@inertiajs/react'
import { CircleDashed, MapIcon, ShoppingBag } from 'lucide-react'

import React from 'react'

interface CheckoutProps {
  billingData?: {
    first_name: string
    last_name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip: string
    country: string
    notes: string
  }
  shippingData?: {
    first_name: string
    last_name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  sameAsBilling?: boolean
}

export default function Address() {
const {billing_data, user_address } = usePage().props as any
// console.log('billing address', billing_data)

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

  }

  return (
    <UserLayout>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 h-screen">
          <div className="flex justify-between items-center">
                        <div className="p-6 border-b">
                          <h2 className="text-lg font-semibold text-black">Address</h2>
                          <p className="text-gray-600 mt-1">
                            {/* {`Hello ${user_profile.name} `} */}
                          </p>
                        </div>
                        <Link href={route('user.register-vendor')} type='button' className=' mx-4 bg-indigo-700 text-white px-4 py-2 rounded-2xl hover:bg-indigo-500 transition-all duration-200'>
                        Become a Vendor       </Link>
                      </div>
            {billing_data.length > 0 ? 
          <div className="flex flex-col md:flex-row gap-4">

              {billing_data.map((data)=>(
              <Card className='bg-gray-100 w-1/2 m-4'>
                <CardContent>
                    <div className="text-gray-700">
                      <span className="text-2xl font-semibold">{data.billing_first_name} </span>
                      <span className="text-2xl font-semibold">{data.billing_last_name} </span>
                      <p className="">{data.billing_address}</p>
                      <p className="">{data.billing_city}</p>
                      <p className="">{data.billing_state}</p>
                      
                    </div>
                </CardContent>
                
              </Card>
                  ))}
          </div>
            : (
              <div className="flex flex-col text-gray-700 mt-[150px] justify-center items-center">
                <CircleDashed size={60} />
                <p className="text-2xl text-center">No address in your address book</p>
              </div>
            )}
        </div>
    </UserLayout>
  )
}
