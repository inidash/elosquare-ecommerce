import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
// import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
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
import { format } from 'path';
import VendorLayout from '@/layouts/vendor-layout';
import { stat } from 'fs';

// Dummy data
const analyticsData = {
  totalProducts: 254,
  totalUsers: 1823,
  totalCategories: 32,
  totalInventoryValue: 543920,
};

const recentProducts = [
  {
    id: 1,
    name: "Ergonomic Chair",
    category: "Furniture",
    price: 199.99,
    stock: 24,
    status: "In Stock",
    image: "/api/placeholder/60/60",
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    category: "Electronics",
    price: 1999.99,
    stock: 12,
    status: "Low Stock",
    image: "/api/placeholder/60/60",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    category: "Audio",
    price: 129.99,
    stock: 45,
    status: "In Stock",
    image: "/api/placeholder/60/60",
  },
  {
    id: 4,
    name: "Office Desk",
    category: "Furniture",
    price: 349.99,
    stock: 8,
    status: "Low Stock",
    image: "/api/placeholder/60/60",
  },
  {
    id: 5,
    name: "Smart Watch Series 8",
    category: "Wearables",
    price: 399.99,
    stock: 0,
    status: "Out of Stock",
    image: "/api/placeholder/60/60",
  },
];

const recentSales = [
  {
    id: 1,
    customer: "John Doe",
    email: "john@example.com",
    product: "Ergonomic Chair",
    date: "2025-04-24",
    amount: 199.99,
    status: "Completed",
  },
  {
    id: 2,
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "MacBook Pro M3",
    date: "2025-04-23",
    amount: 1999.99,
    status: "Processing",
  },
  {
    id: 3,
    customer: "Robert Johnson",
    email: "robert@example.com",
    product: "Wireless Earbuds",
    date: "2025-04-22",
    amount: 129.99,
    status: "Completed",
  },
  {
    id: 4,
    customer: "Emily Davis",
    email: "emily@example.com",
    product: "Office Desk",
    date: "2025-04-21",
    amount: 349.99,
    status: "Completed",
  },
  {
    id: 5,
    customer: "Michael Wilson",
    email: "michael@example.com",
    product: "Smart Watch Series 8",
    date: "2025-04-20",
    amount: 399.99,
    status: "Cancelled",
  },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        // href: dashboard().url,
        href: '/dashboard',
    },
   
    
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(value);
};

  // const columns = [
  //         {
  //             key: 'index',
  //             label: '#',
  //             sortable: false,
  //             type: 'IndexColumn',
  //             width: '80px',
  //             render: (item: any, index: number) => {
  //                 return (filters.page - 1) * filters.perPage + index + 1;
  //             },
  //         },
  //         { key: 'image', label: 'Image', sortable: false, type: 'image', design: 'rec' },
  //         { key: 'name', label: 'Name', sortable: true },
  //         // { key: 'slug', label: 'Slug', sortable: false },
  //         { key: 'created_at', type: 'date', label: 'Created At', sortable: true },
  //     ];
  
      // const handleDelete = (id: string) => {
      //     router.delete(route('admin.products.destroy', id), {
      //         preserveScroll: true,
      //         onSuccess: () => {
      //             // toast.success('User deleted successfully');
      //         },
      //         onError: () => {
      //             // toast.error('User deletion failed');
      //         },
      //     });
      // };

      //orders   
      const orders_columns = [
    // {
    //   key: 'index',
    //   label: '#',
    //   sortable: false,
    //   type: 'IndexColumn',
    //   width: '80px',
    //   render: (item: any, index: number) => {
    //     return (filters.page - 1) * filters.perPage + index + 1
    //   },
    // },
    { key: 'order_number', label: 'Order Number', sortable: true },
    { key: 'customer_name', label: 'Customer Name', sortable: false },
    // { key: 'customer_email', label: 'Customer Email', sortable: false },
    { key: 'total_price', type: 'price', label: 'Total Amount', sortable: true },
    { key: 'status', type: 'badge', label: 'Status', sortable: true },
    // { key: 'payment_status', type: 'badge', label: 'Payment Status', sortable: true },
    // { key: 'payment_method', label: 'Payment Method', sortable: false },
    { key: 'items_count', label: 'Items', sortable: false },
    { key: 'created_at', label: 'Order Date', sortable: true },
  ]

  // const handleOrderDelete = (id: string) => {
  //   router.delete(route('admin.orders.destroy', id), {
  //     preserveScroll: true,
  //     onSuccess: () => {
  //       // toast.success('Order deleted successfully');
  //     },
  //     onError: () => {
  //       // toast.error('Order deletion failed');
  //     },
  //   })
  // }

export default function Dashboard() {

  const {stats, order_items, products, vendor} = usePage().props;
  console.log('items', stats);
    return (
        <VendorLayout>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    
                        <div className="p-6 bg-gray-50 min-h-screen">
                          <div className="mb-8">
                            <p className="text-3xl font-bold text-gray-900 mb-2">Vendor Dashboard</p>
                            <p className="text-gray-500">
                              Welcome back! Here's an overview of your store.
                            </p>
                          </div>

                          {/* Analytics Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                            {/* Total Products Card */}
                            <Card className="shadow-sm hover:shadow-md transition-shadow bg-gray-600 text-white">
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-sm font-mediu">
                                    Total Products
                                  </CardTitle>
                                  <div className="p-2 bg-blue-100 rounded-lg">
                                    <Package2 size={18} className="text-blue-600" />
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">
                                  {stats.total_products}
                                </div>
                              </CardContent>
                              
                            </Card>

                            {/* Total Inventory Value Card */}
                            <Card className="shadow-sm hover:shadow-md transition-shadow bg-gray-600 text-white">
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-sm font-medium">
                                    Total Sales
                                  </CardTitle>
                                  <div className="p-2 bg-amber-100 rounded-lg">
                                    <span className="text-2xl text-black">&#8358;</span>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">
                                  {formatCurrency(stats.total_sales)}
                                </div>
                              </CardContent>
                              
                            </Card>
                          </div>

                          {/* Recent Products Table */}
                          <div className="mb-8 ">
                            <Card className='bg-gray-100 text-black'>
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <CardTitle>Recent Products</CardTitle>
                                  
                                </div>
                                <CardDescription>A list of your recent products</CardDescription>
                              </CardHeader>
                              <CardContent>
                                {products.length === 0 ? (
                                  <div className="text-center py-4">
                                    <PackageMinusIcon className="mx-auto h-15 w-15 text-gray-500" />  <p>No recent products for now</p>
                                  </div>
                                ) : (
                                  <Table className='bg-gray-100'>
                                    <TableHeader className='text-black font-bold'>
                                      <TableRow className='bg-gray-700'>
                                        <TableHead  className='text-white'>Product</TableHead>
                                          <TableHead  className='text-white'>Category</TableHead>
                                      <TableHead  className='text-white'>Price</TableHead>
                                      <TableHead  className='text-white'>Quantity</TableHead>
                                      <TableHead  className='text-white'>Stock</TableHead>
                                      
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {products.map((product) => (
                                      <TableRow key={product.id}>
                                        <TableCell>
                                          <div className="flex items-center gap-3">
                                            
                                            <span className="font-medium">{product.name}</span>
                                          </div>
                                        </TableCell>
                                        <TableCell>{product.category?.name}</TableCell>
                                        <TableCell>{formatCurrency(product.selling_price)}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>
                                          {product.quantity > 2 ? (
                                          <Badge className= "bg-green-100 text-green-800 hover:bg-green-100">
                                            In Stock
                                          </Badge>
                                          ) : product.quantity < 2 ? (
                                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                              Low Stock
                                            </Badge>
                                            ) : ( 
                                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                                              Out of Stock
                                            </Badge>
                                          )}
                                        </TableCell>
                                        
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              )}
                              </CardContent>
                              <CardFooter className="flex justify-between">
                                <p className="text-sm text-gray-500">Showing 5 most recent products</p>
                                <Link href="/vendor/products" className="flex items-center text-sm text-blue-600 hover:underline">
                                  <Button className="p-0  bg-indigo-700 text-white hover:bg-indigo-800">
                                    View All Products
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                  </Button>
                                </Link>
                              </CardFooter>
                            </Card>
                          </div>

                          {/* Recent Sales Table */}
                          <div>
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
                          </div>
                        </div>
                      {/* );
                    }; */}
                </div>
            </div>
        </VendorLayout>
    );
}
