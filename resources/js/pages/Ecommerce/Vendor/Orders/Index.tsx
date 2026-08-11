import OrderTable from '@/components/DataTables/OrderTable'
import AppLayout from '@/layouts/app-layout'
import VendorLayout from '@/layouts/vendor-layout'
import { Head, router, usePage } from '@inertiajs/react'
import { Link, Package2Icon } from 'lucide-react'
import { PackageMinusIcon, Users2Icon, ArrowRightIcon } from 'lucide-react';

 import {
  Package2,
  Users,
  
  ArrowRight,
  Search,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";    
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(value);
};
export default function OrderIndex() {
  const { order_items, filters, statuses, paymentStatuses, can } = usePage().props
console.log('order_items', order_items);
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
    
    { key: 'order.user.name', label: 'Customer Name', sortable: false },
    { key: 'product_name', label: 'Product Name', sortable: false },
    { key: 'total_price', type: 'price', label: 'Total Amount', sortable: true },
    // { key: 'order.status', type: 'badge', label: 'Status', sortable: true },
    { key: 'order.payment_method', label: 'Payment Method', sortable: false },
    { key: 'order.payment_status', type: 'badge', label: 'Payment Status', sortable: true },
    // { key: 'items_count', label: 'Items', sortable: false },
    { key: 'order.created_at', label: 'Order Date', sortable: true },
  ]

  const handleDelete = (id: string) => {
    router.delete(route('vendor.orders.destroy', id), {
      preserveScroll: true,
      onSuccess: () => {
        // toast.success('Order deleted successfully');
      },
      onError: () => {
        // toast.error('Order deletion failed');
      },
    })
  }

  return (
    <VendorLayout >
      <Head title="Orders" />
      <div className="py-6">
        <div className="mx-auto">
          <OrderTable
            data={order_items}
            columns={columns}
            resourceName="Orders"
            singularName="Order"
            routeName="vendor.orders.index"
            filters={filters}
            canViewResource={false}
            canCreateResource={can.create}
            canEditResource={can.edit}
            canDeleteResource={can.delete}
            createRoute=""
            viewRoute="vendor.orders.show"
            editRoute=""
            onDelete={handleDelete}
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
          {/* <div>
            <Card className='bg-gray-100 text-black'>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Sales</CardTitle>
                  
                </div>
                <CardDescription>A list of your recent sales</CardDescription>
              </CardHeader>
              <CardContent>
                {order_items.length === 0 ? (
                  <div className="text-center py-4">
                    <PackageMinusIcon className="mx-auto h-15 w-15 text-gray-300" />
                    <p className="text-sm text-gray-500 font-bold">No recent sales for now.</p>
                    <p className="text-gray-700"> All your most recent sales will appear here.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow  className='bg-gray-700 text-white'>
                        <TableHead className='text-white'>Customer</TableHead>
                        <TableHead className='text-white'>Product Name</TableHead>
                      <TableHead className='text-white'>Date</TableHead>
                      <TableHead className='text-white'>Amount</TableHead>
                      <TableHead className='text-white'>Payment Method</TableHead>
                      <TableHead className='text-white'>Status</TableHead>
                      
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order_items.map((item) => (
                      <TableRow key={item.order.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.order.billing_first_name} {''} {item.order.billing_last_name}</div>
                            <div className="text-sm text-gray-500">
                              {item.order.billing_email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.product.name}</TableCell>
                        <TableCell>{item.order.created_at && new Date(item.order.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>{formatCurrency(item.total_price)}</TableCell>
                        <TableCell>{item.order.payment_method}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.order.status === "completed"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : item.order.status === "Processing"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {item.order.status}
                          </Badge>
                        </TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )} 
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-gray-500">Showing 5 recent Sales</p>
                <Link href="/vendor/orders" className="flex items-center text-sm text-white hover:underline">
                  <Button className="p-0 bg-indigo-700 text-white hover:bg-indigo-800">
                    View All Sales
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div> */}
        </div>
      </div>
    </VendorLayout>
  )
}
