import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import UserLayout from '@/layouts/user-layout'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function index() {
  const {user_profile} = usePage().props
  return (
    <UserLayout>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="flex justify-between items-center">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-black">Profile</h2>
                <p className="text-gray-600 mt-1">
                  {`Hello ${user_profile.name} `}
                </p>
              </div>
              <Link href={route('user.register-vendor')} type='button' className=' mx-4 bg-indigo-700 text-white px-4 py-2 rounded-2xl hover:bg-indigo-500 transition-all duration-200'>
              Become a Vendor       </Link>
          </div>
          </div>

          {/* <!-- Recent Orders --> */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <Card className='bg-white text-gray-700'>
                <CardHeader>
                    <CardTitle className='text-2xl'>User Profile</CardTitle>
                    <CardDescription>Manage your profile information</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className='px-4'>
                    <div className='mb-4'><strong>Full Name:</strong> <p>{user_profile.name}</p></div>
                    <div className='mb-4'><strong>Address:</strong><p>{user_profile.address}</p></div>
                    <div className='mb-4'><strong>Email:</strong> <p>{user_profile.email}</p></div>
                    <div className='mb-4'><strong>Phone Number:</strong> <p>{user_profile.phone}</p></div>
                  </div>
                </CardContent>
                </Card>
            </div>
          </div>
    </UserLayout>
  )
}
