import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import DataTable from '@/components/DataTables/DataTable';
import OrderTable from '@/components/DataTables/OrderTable'
import AppLayout from '@/layouts/app-layout';
// import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Users2Icon, TagIcon, Package2Icon } from 'lucide-react';

 import {
  Package2,
  Users,
  BarChart3,
  DollarSign,
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

//orders   
      const orders_columns = [
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

  const handleOrderDelete = (id: string) => {
    router.delete(route('admin.orders.destroy', id), {
      preserveScroll: true,
      onSuccess: () => {
        // toast.success('Order deleted successfully');
      },
      onError: () => {
        // toast.error('Order deletion failed');
      },
    })
  }


export default function Dashboard() {
  const {dashboard_count, products, filters, orders, statuses, paymentStatuses, can } = usePage().props;
  console.log(products)

  const columns = [
          {
              key: 'index',
              label: '#',
              sortable: false,
              type: 'IndexColumn',
              width: '80px',
              render: (item: any, index: number) => {
                  return (filters.page - 1) * filters.perPage + index + 1;
              },
          },
          { key: 'image', label: 'Image', sortable: false, type: 'image', design: 'rec' },
          { key: 'name', label: 'Name', sortable: true },
          // { key: 'slug', label: 'Slug', sortable: false },
          { key: 'created_at', type: 'date', label: 'Created At', sortable: true },
      ];
  
      const handleDelete = (id: string) => {
          router.delete(route('admin.products.destroy', id), {
              preserveScroll: true,
              onSuccess: () => {
                  // toast.success('User deleted successfully');
              },
              onError: () => {
                  // toast.error('User deletion failed');
              },
          });
      };

      //orders   
      const orders_columns = [
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

  const handleOrderDelete = (id: string) => {
    router.delete(route('admin.orders.destroy', id), {
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here's an overview of your store.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Products
              </CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package2 size={18} className="text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard_count.total_products}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            {/* <Link href=''> */}
              <Button
              variant="link"
              className="p-0 h-auto text-blue-600 flex items-center"
            >
              View details <ArrowRight size={16} className="ml-1" />
            </Button>
            {/* </Link> */}
          </CardFooter>
        </Card>

        {/* Total Users Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Users
              </CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <Users size={18} className="text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard_count.total_users}</div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="link"
              className="p-0 h-auto text-green-600 flex items-center"
            >
              View details <ArrowRight size={16} className="ml-1" />
            </Button>
          </CardFooter>
        </Card>

        {/* Total Categories Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Vendors
              </CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 size={18} className="text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard_count.total_vendors}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="link"
              className="p-0 h-auto text-purple-600 flex items-center"
            >
              View details <ArrowRight size={16} className="ml-1" />
            </Button>
          </CardFooter>
        </Card>

        {/* Total Inventory Value Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Orders Subtotal
              </CardTitle>
              <div className="p-2 bg-amber-100 rounded-lg">
                <DollarSign size={18} className="text-amber-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(dashboard_count.total_sales)}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="link"
              className="p-0 h-auto text-amber-600 flex items-center"
            >
              View details <ArrowRight size={16} className="ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Products Table */}
      <div className="mb-8">
        {/* <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Products</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search products..."
                    className="pl-8 w-64"
                  />
                </div>
                <Button>Add Product</Button>
              </div>
            </div>
            <CardDescription>A list of your recent products</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          product.status === "In Stock"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : product.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-gray-500">
              Showing 5 of {analyticsData.totalProducts} products
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card> */}
        <DataTable
          data={products}
          columns={columns}
          resourceName="Products"
          singularName="Product"
          routeName="admin.products.index"
          filters={filters}
          canViewResource={false}
          canCreateResource={false}
          canEditResource={false}
          canDeleteResource={false}
          // admin.products.create
          createRoute="admin.products.index"
          viewRoute="admin.products.index" //admin.products.show
          editRoute="admin.products.index" //admin.products.edit
          onDelete={handleDelete}
          icon={TagIcon}
        />
      </div>

      {/* Recent Sales Table */}
      <div>
        <OrderTable
          data={orders}
          columns={orders_columns}
          resourceName="Orders"
          singularName="Order"
          routeName="admin.orders.index"
          filters={filters}
          canViewResource={true}
          canCreateResource={can.create}
          canEditResource={can.edit}
          canDeleteResource={can.delete}
          createRoute=""
          viewRoute="admin.orders.show"
          editRoute=""
          onDelete={handleOrderDelete}
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
    </div>
  {/* );
}; */}
                </div>
            </div>
        </AppLayout>
    );
}
