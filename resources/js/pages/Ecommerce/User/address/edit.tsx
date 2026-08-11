import { Button } from '@/components/ui/button'
import UserLayout from '@/layouts/user-layout'
import { Link, useForm, usePage } from '@inertiajs/react'
import { MapIcon, ShoppingBag } from 'lucide-react'

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
const {billing_data, user_address } = usePage().props
console.log('billing address', billing_data)
const { data, setData, post, processing, errors } = useForm({
    first_name: billing_data?.billing_first_name || '',
    last_name: billing_data?.billing_last_name || '',
    email: billing_data?.billing_email || '',
    phone: billing_data?.billing_phone || '',
    address: billing_data?.billing_address || '',
    city: billing_data?.billing_city || '',
    state: billing_data?.billing_state || '',
    zip: billing_data?.billing_zip || '',
    country: billing_data?.billing_country || '',
    
    // shipping_first_name: shippingData?.first_name || billingData?.first_name || '',
    // shipping_last_name: shippingData?.last_name || billingData?.last_name || '',
    // shipping_email: shippingData?.email || billingData?.email || '',
    // shipping_phone: shippingData?.phone || billingData?.phone || '',
    // shipping_address: shippingData?.address || billingData?.address || '',
    // shipping_city: shippingData?.city || billingData?.city || '',
    // shipping_state: shippingData?.state || billingData?.state || '',
    // shipping_zip: shippingData?.zip || billingData?.zip || '',
    // shipping_country: shippingData?.country || billingData?.country || '',
  })
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

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // const submitData = sameAsBilling
    //   ? {
    //       ...data,
    //       shipping_first_name: data.first_name,
    //       shipping_last_name: data.last_name,
    //       shipping_email: data.email,
    //       shipping_phone: data.phone,
    //       shipping_address: data.address,
    //       shipping_city: data.city,
    //       shipping_state: data.state,
    //       shipping_zip: data.zip,
    //       shipping_country: data.country,
    //     }
    //   : data

    // post(route('checkout.process'), submitData)
  }


  return (
    <UserLayout>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="flex justify-between items-center">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-black">Your Addresses</h2>
                <p className="text-gray-600 mt-1">
                  {`Hello ${user_address.name} `}
                </p>
            </div>
            
              <Link href={route('user.register-vendor')} type='button' className=' mx-4 bg-indigo-700 text-white px-4 py-2 rounded-2xl hover:bg-indigo-500 transition-all duration-200'>
              Become a Vendor       </Link>
          </div>
            <div className="p-6">

              {/* <!-- Dashboard Cards --> */}
              {/* <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6"
              >
                <div
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5 border-b bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Orders</h3>
                      <span
                        className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        ><ShoppingBag /></span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4">
                      View and track your orders, download invoices
                    </p>
                    <a
                      href={route('user.orders')}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                    >
                      View Orders
                      <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>

                <div
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5 border-b bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Addresses</h3>
                      <MapIcon className="fas fa-map-marker-alt text-indigo-600" />
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
                </div>
              </div> */}
            </div>
          </div>

          {/* <!-- Recent Orders --> */}
          {/* <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
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
                  {recentOrders.length > 0 ? (
                    recentOrders?.map(({ id, payment_status, total_price, created_at }) => (
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
            
          </div> */}

          <div className="flex flex-col gap-8 lg:flex-row">
          {/* Customer Information Form */}
          <div className="lg:w-2/3">
            <div className="mb-6 overflow-hidden rounded-lg bg-white text-gray-700 shadow-sm">
              <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Billing Details</h2>
                <form onSubmit={handleSubmit}>
                  {billing_data.map((data)=>(
                    
                  
                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2" key={data.id}>
                    <div>
                      <label
                        htmlFor="first_name"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        value={data.billing_first_name || data}
                        onChange={(e) => setData('first_name', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                          errors.first_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.first_name && (
                        <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                          errors.last_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.last_name && (
                        <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={data.billing_phone || data}
                        onChange={(e) => setData('phone', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>
                  </div>
                  ))}

                  <div className="mb-6">
                    <label
                      htmlFor="address"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={data.billing_address || data}
                      onChange={(e) => setData('address', e.target.value)}
                      className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>

                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={data.billing_city || data}
                        onChange={(e) => setData('city', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        State/Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        value={data.state}
                        onChange={(e) => setData('state', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                    </div>
                    <div>
                      <label htmlFor="zip" className="mb-1 block text-sm font-medium text-gray-700">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        value={data.zip}
                        onChange={(e) => setData('zip', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                          errors.zip ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.zip && <p className="mt-1 text-sm text-red-500">{errors.zip}</p>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="country"
                      className="mb-1 block text-black text-sm font-medium "
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      value={data.country}
                      onChange={(e) => setData('country', e.target.value)}
                      className={`w-full text-black rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                        errors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    >
                      <option value="">Select a country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="IN">India</option>
                      <option value="IN">Nigeria</option>
                    </select>
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="notes" className="mb-1 block text-sm font-medium text-gray-700">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      value={data.notes}
                      onChange={(e) => setData('notes', e.target.value)}
                      rows={3}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-md bg-indigo-600 py-3 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {processing ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                  {/* ))} */}
                </form>
              </div>
            </div>
          </div>
        </div>
    </UserLayout>
  )
}
