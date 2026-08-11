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
export default function Profile() {

  const {vendor} = usePage().props;
  console.log('profile', vendor);
    return (
        <VendorLayout>
            <Head title="Profile Details" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                  <Card className='bg-white text-gray-700'>
                    <CardHeader>
                      <CardTitle className='text-2xl'>Vendor Profile</CardTitle>
                      <CardDescription>Manage your vendor profile information</CardDescription>
                    </CardHeader>
                    <CardContent className=" flex justify-around p-4">
                      <div className='px-4'>
                        <div className='mb-4'><strong>Business Name:</strong> <p>{vendor.business_name}</p></div>
                        <div className='mb-4'><strong>Business Address:</strong><p>{vendor.business_address}</p></div>
                        <div className='mb-4'><strong>Business class:</strong> <p>{vendor.class_of_business}</p></div>
                        <div className='mb-4'><strong>Business Number:</strong> <p>{vendor.business_number}</p></div>
                        <div className='mb-4'><strong>State of Business:</strong> <p className="capitalize">{vendor.state_of_business}</p></div>
                        <div className='mb-4'><strong>Tax Identification Number:</strong> <p className="capitalize">{vendor.tax_identification_number}</p></div>
                        <div className='mb-4'><strong>Business Registration Number:</strong> <p>{vendor.business_registration_number}</p></div>
                        
                      </div>
                      <div>
                        <div className='mb-4'><strong>Vendor Address:</strong> <p>{vendor.vendor_address}</p></div>
                        <div className='mb-4'><strong>Vendor State:</strong> <p>{vendor.vendor_state}</p></div>
                        <div className='mb-4'><strong>Vendor Phone:</strong> <p>{vendor.vendor_phone}</p></div>
                        <div className='mb-4'><strong>Vendor Status:</strong> <p className="capitalize">{vendor.vendor_status}</p></div>
                        <div className='mb-4'><strong>Vendor Plan:</strong> <p className="capitalize">{vendor.vendor_plan}</p></div>
                        <div className='mb-4'><strong>Vendor Registration Date:</strong> <p>{new Date(vendor.created_at).toLocaleString()}</p></div>
                      </div>
                    </CardContent>
                    <div className='px-4 bg-white text-gray-700 p-4 rounded-2xl mx-4'><strong>Business Description:</strong>
                      <div className="mt-2 ">
                        <p>{vendor.business_description}</p>
                      </div>
                    </div>
                  </Card>
                </div>
            </div>
        </VendorLayout>
    );
}
