import { Button } from '@/components/ui/button'
import UserLayout from '@/layouts/user-layout'
import { Link } from '@inertiajs/react'
import { ArrowRightIcon, ShoppingBag } from 'lucide-react'

import React from 'react'

export default function Dashboard({dashboardData}: {dashboardData : any}) {
console.log(dashboardData.billingAddress)
  const getStatusBadgeClass = ( status: string ) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
        case 'shipped':
        return 'bg-blue-100 text-blue-800'
        case 'pending':
        return 'bg-yellow-100 text-yellow-800'
        case 'cancelled':
        return 'bg-red-100 text-red-800'
        
    
      default:
        break;
    }
  }
  return (
    <UserLayout>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="flex justify-between items-center">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-black">Dashboard</h2>
                <p className="text-gray-600 mt-1">
                  Hello, welcome back
                  <span className="font-bold"> {dashboardData.userAddress.name}</span>
                </p>
            </div>
            
              <Link href={route('user.register-vendor')} type='button' className=' mx-4 bg-indigo-700 text-white px-4 py-2 rounded-2xl hover:bg-indigo-500 transition-all duration-200'>
              Become a Vendor       </Link>
          </div>
            <div className="p-6">
              

              {/* <!-- Dashboard Cards --> */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                >
                <div
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5 border-b bg-gray-50 text-gray-700">
                    <div className="flex justify-between items-center">
                      
                      <h3 className="font-medium">Orders</h3>
                      <div className="bg-gray-500 py-2 px-3 rounded-2xl text-white font-bold">{dashboardData.orderStats.total_order}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4">
                      View and track your orders
                    </p>
                    <Link
                      href={route('user.orders')}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                    >
                      <Button className='bg-gray-600 text-white'>
                        View All Orders
                        <ArrowRightIcon />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5 border-b bg-gray-50 text-gray-700">
                    <div className="flex justify-between items-center">
                      
                      <h3 className="font-medium">Completed Orders</h3>
                      <div className="bg-blue-500 py-2 px-3 rounded-2xl text-white font-bold">{dashboardData.orderStats.completed}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4">
                      View and track your orders
                    </p>
                    <Link
                      href={route('user.orders')}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                    >
                     <Button className='bg-blue-600 text-white'>
                      View Orders
                      <ArrowRightIcon />
                </Button>
                    </Link>
                  </div>
                </div>
                <div
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5 border-b bg-gray-50 text-gray-700">
                    <div className="flex justify-between items-center">
                      
                      <h3 className="font-medium">Pending Orders</h3>
                      <div className="bg-green-500 py-2 px-3 rounded-2xl text-white font-bold">{dashboardData.orderStats.pending}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4">
                      View and track your orders
                    </p>
                    <Link
                      href={route('user.orders')}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                    >
                      <Button className='bg-green-600 text-white'>
                        View Orders
                        <ArrowRightIcon />
                      </Button>
                    </Link>
                  </div>
                </div>
                {/* <div
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5 border-b bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Addresses</h3>
                      <i className="fas fa-map-marker-alt text-indigo-600"></i>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4">
                      Manage your shipping and billing addresses
                    </p>
                    <a
                      href={route('user.address')}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                    >
                      Manage Addresses
                      <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* <!-- Recent Orders --> */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-600">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.recentOrders.length > 0 ? (
                    dashboardData?.recentOrders?.map(({ id, payment_status, total_price, created_at }) => (
                      <tr key={id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{created_at}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">{payment_status}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{total_price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center text-red-400 py-4 ">You don't have any order at the moment.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t">
              <Link
                href={route('user.orders')}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-center"
              >
                <Button className='bg-blue-600 text-white'>

                View All Orders
                <ArrowRightIcon />
                </Button>
              </Link>
            </div>
          </div>

          {/* <!-- Account Details --> */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-600">Account Details</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    CONTACT INFORMATION
                  </h3>
                  <p className="text-gray-800">{dashboardData.userAddress.name}</p>
                  <p className="text-gray-800">{dashboardData.userAddress.email}</p>
                  <p className="text-gray-800">{dashboardData.userAddress.phone}</p>
                  {/* <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 text-sm mt-2 inline-block"
                    >Edit</a> */}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    BILLING ADDRESS
                  </h3>
                  {dashboardData.billingAddress ?(
                    dashboardData.billingAddress.map(({billing_address, billing_city, billing_country})=>(

                    <div>
                      <p className="text-gray-800">{billing_address}</p>
                      <p className="text-gray-800">{billing_city}</p>
                    </div>
                    )
                  )) : (

                    <p className="text-gray-800">No address for now</p> 
                  )}
                  {/* <Link
                    href=""
                    className="text-indigo-600 hover:text-indigo-800 text-sm mt-2 inline-block"
                    >Edit</Link> */}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  NEWSLETTERS
                </h3>
                <p className="text-gray-800">
                  You are currently subscribed to our newsletter.
                </p>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-800 text-sm mt-2 inline-block"
                  >Unsubscribe</a>
              </div>
            </div>
          </div>

          {/* <!-- Recently Viewed --> */}
          {/* <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Recently Viewed Products</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Product 1 -->
                <div
                  className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src="/api/placeholder/300/300"
                      alt="Smart Watch"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-indigo-50"
                      >
                        <i
                          className="far fa-heart text-gray-500 group-hover:text-indigo-600"
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-1">Smart Watch</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        <i className="fas fa-star text-xs"></i>
                        <i className="fas fa-star text-xs"></i>
                        <i className="fas fa-star text-xs"></i>
                        <i className="fas fa-star text-xs"></i>
                        <i className="fas fa-star-half-alt text-xs"></i>
                      </div>
                      <span className="text-xs text-gray-500 ml-1">(24)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-600">$129.99</span>
                      <button
                        className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Product 2 -->
                <div
                  className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src="/api/placeholder/300/300"
                      alt="Wireless Headphones"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-indigo-50"
                      >
                        <i
                          className="far fa-heart text-gray-500 group-hover:text-indigo-600"
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-1">
                      Wireless Headphones
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        <i className="fas fa-star text-xs"></i>
                        <i className="fas fa-star text-xs"></i>
                        <i className="fas fa-star text-xs"></i>
                        <i className="fas fa-star text-xs"></i>
                        <i className="far fa-star text-xs"></i>
                      </div>
                      <span className="text-xs text-gray-500 ml-1">(18)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-600">$89.99</span>
                      <button
                        className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Product 3 -->
                <div
                  className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src="/api/placeholder/300/300"
                      alt="Bluetooth Speaker"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-indigo-50"
                      >
                        <i
                          className="far fa-heart text-gray-500 group-hover:text-indigo-600"
                        ></i>
                      </button>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span
                        className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                        >Sale</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-1">
                      Bluetooth Speaker
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        <i class="fas fa-star text-xs"></i>
                        <i className="fas fa-star text-xs"></i>
                        <i className="fas fa-star text-xs"></i>
                        <i className="fas fa-star text-xs"></i>
                        <i className="fas fa-star text-xs"></i>
                      </div>
                      <span className="text-xs text-gray-500 ml-1">(32)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-indigo-600 mr-2"
                          >$49.99</span>
                        <span className="text-xs text-gray-500 line-through"
                          >$69.99</span>
                      </div>
                      <button
                        className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
    </UserLayout>
  )
}
