import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
// import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { PackageMinusIcon, Users2Icon, ArrowRightIcon, Plus, PlusIcon } from 'lucide-react';

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
    title: 'Vendor Payments',
    href: '/vendor/payments',
  },
];
export default function AccountDetails() {

  const {vendor, account} = usePage().props;
  console.log('vendor', vendor);
  console.log('account', account);
    return (
        <VendorLayout>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] bg-white flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <div className="flex justify-between p-4 items-center">
                  <div>
                    <CardTitle className='text-2xl text-gray-700'>Account Details</CardTitle>
                    <CardDescription>Manage your account details information</CardDescription>
                  </div>
                  <div>
                    <Link href="/vendor/add-account-details">
                      <Button className="text-gray-300 cursor-pointer transition-all duration-200 hover:bg-gray-500" variant="outline" size="sm">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add/Edit Details
                      </Button>
                    </Link> 
                  </div>
                </div>
                    {account != null ? 
                // <Card className="mb-4 bg-white text-gray-700">
                  <div className="flex flex-col md:flex-row gap-4">
                    <CardContent>
                        <div className="text-gray-700">
                          <p className="mb-4 "><strong>Bank Name:</strong> {account.bank_name} </p>
                          <p className="mb-4 "><strong>Account Number:</strong> {account.account_number} </p>
                          <p className="mb-4"><strong>Account Name:</strong> {account.account_name}</p>
                          <p className="mb-4"><strong>Bank Branch:</strong> {account.bank_branch}</p>
                          <p className="mb-4"><strong>Account Type:</strong> {account.account_type}</p>
                          <p className="mb-4"><strong>SWIFT Code:</strong> {account.swift_code}</p>
                        </div>
                    </CardContent>
                  </div>
            // </Card>
            :(
              <div className="flex flex-col text-gray-700  justify-center items-center">
                <PackageMinusIcon size={60} />
                <p className="font-bold text-center">Your are yet to add your account details</p>
              </div>
            )} 
          </div>
        </div>
      </VendorLayout>
    );
}
