import DeleteDialog from '@/components/DeleteDialog'
import UserOrderTable from '@/components/DataTables/UserOrderTable'
import { Button } from '@/components/ui/button'
import UserLayout from '@/layouts/user-layout'
import { Link, usePage } from '@inertiajs/react'
import { MapIcon, Package2Icon, ShoppingBag } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import React, { useState } from 'react'

export default function Order() {
// console.log(dashboardData.recentOrders)

const { user, orders, filters, statuses, paymentStatuses, can } = usePage().props
  console.log('orders', orders)
  const columns = [
    {
      key: 'index',
      label: '#',
      sortable: false,
      type: 'IndexColumn',
      width: '80px',
      render: (item: any, index: number) => {
        return (filters.page - 1) * filters.perPage + index + 1
      },
    },
    // { key: 'order_number', label: 'Order Number', sortable: true },
    { key: 'customer_name', label: 'Customer Name', sortable: false },
    // { key: 'customer_email', label: 'Customer Email', sortable: false },
    { key: 'total_price', type: 'price', label: 'Total Amount', sortable: true },
    { key: 'status', type: 'badge', label: 'Order Status', sortable: true },
    { key: 'payment_status', type: 'badge', label: 'Payment Status', sortable: true },
    { key: 'payment_method', label: 'Payment Method', sortable: false },
    { key: 'items_count', label: 'Items', sortable: false },
    { key: 'created_at', label: 'Order Date', sortable: true },
  ]


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
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [itemToCancel, setItemToCancel] = useState<any>(null);
  const handleCancelOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCancelDialog(true);
  }
  return (
    <UserLayout>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="flex justify-between items-center">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-black">Orders History</h2>
                <p className="text-gray-600 mt-1">
                  {`Hello ${user.name} `}
                </p>
            </div>
            
              <Link href={route('user.register-vendor')} type='button' className=' mx-4 bg-indigo-700 text-white px-4 py-2 rounded-2xl hover:bg-indigo-500 transition-all duration-200'>
              Become a Vendor       </Link>
          </div>
          {/* <!-- Recent Orders --> */}
          <UserOrderTable
            data={orders}
            columns={columns}
            resourceName="Orders"
            singularName="Order"
            routeName="user.orders"
            filters={filters}
            canViewResource={true}
            canCreateResource={can.create}
            canEditResource={can.edit}
            canDeleteResource={can.delete}
            createRoute=""
            viewRoute="user.orders.details"
            editRoute=""
            // onDelete={handleDelete}
            icon={Package2Icon}
            additionalFilters={{
              status: {
                label: 'Status',
                options: Object.entries(statuses).map(([value, label]) => ({ value, label })),
                value: filters.status,
              },
              payment_status: {
                label: 'Payment Status',
                options: Object.entries(paymentStatuses).map(([value, label]) => ({
                  value,
                  label,
                })),
                value: filters.payment_status,
              },
            }}
          />            
          </div> 
          
    </UserLayout>

  )
}
