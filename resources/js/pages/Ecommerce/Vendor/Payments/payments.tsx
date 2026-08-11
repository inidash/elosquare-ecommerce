import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
// import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { PackageMinusIcon, Users2Icon, ArrowRightIcon } from 'lucide-react';

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
import VendorLayout from '@/layouts/vendor-layout';
import { stat } from 'fs';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/vendor/dashboard',
  },
  {
    title: 'Profile',
    href: '/vendor/profile',
  },
];
export default function Payment() {

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(value);
};
  const {payments} = usePage().props;
  console.log('payments', payments);
    return (
        <VendorLayout>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 bg-white">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <Card className="m-4 bg-white text-gray-700">
                      <CardHeader>
                        <CardTitle className='text-2xl'>Payment Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow className='bg-black text-white'>
                              <TableHead>Amount</TableHead>
                              <TableHead>Payment Method</TableHead>
                              <TableHead>Payment Date</TableHead>
                              <TableHead>Transaction Ref.</TableHead>
                              <TableHead>Note</TableHead>
                              
                              
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                          {payments.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-4">
                                <PackageMinusIcon className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                <p className="text-gray-500">You don't have any payments yet.</p>
                              </TableCell>
                            </TableRow>
                          )}
                          {payments.map((payment) => (
                            <TableRow key={payment.id}>
                              
                              <TableCell className='text-gray-700 font-semibold'>{formatPrice(payment.amount)}</TableCell>
                              <TableCell className='text-gray-700 font-semibold'>{payment.payment_method}</TableCell>
                              <TableCell className='text-gray-700 font-semibold'>{payment.payment_date}</TableCell>
                              <TableCell className='text-gray-700 font-semibold'>{payment.transaction_reference}</TableCell>
                              <TableCell className='text-gray-700 font-semibold'>{payment.note}</TableCell>
                            </TableRow>
                           ))}
                        </TableBody>
                      </Table>
                      </CardContent>
                    </Card>
                </div>
            </div>
        </VendorLayout>
    );
}
