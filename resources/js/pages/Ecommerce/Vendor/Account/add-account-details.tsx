import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
// import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { PackageMinusIcon, Users2Icon, ArrowRightIcon, Plus, PlusIcon, Loader2 } from 'lucide-react';

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { s } from 'node_modules/framer-motion/dist/types.d-DSjX-LJB';

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

interface AccountData {
  account_name: string;
  account_number: string;
  bank_name: string;
  bank_branch: string;
  account_type: string;
  swift_code: string;
}

export default function AccountDetails() {

  const {props} = usePage<{account : AccountData}>();
  const account = props.account || {};
  
  console.log('account', account);
  const hasAccountDetails = !!props.account;

  const {data, setData, post, processing, errors} = useForm<{
    account_name: string,
    account_number: string,
    bank_name: string,
    bank_branch: string,
    account_type: string,
    swift_code: string,
    
  }>({
   bank_name: account.bank_name || "",
    account_name: account.account_name || "",
    account_number: account.account_number || "",
    bank_branch: account.bank_branch || "",
    account_type: account.account_type || "",
    swift_code: account.swift_code || "",
    
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('form data', data);
     post('/vendor/add-account-details');
  };

  return (
        <VendorLayout>
          <Head title="Add Account Details" />
          <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
              <div className="relative min-h-[100vh] bg-white flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <div className="flex justify-between p-4 items-center">
                  <div>
                    <CardTitle className='text-2xl text-gray-700'>{ hasAccountDetails ? 'Update Account Details' : 'Add Account Details' }</CardTitle>
                    <CardDescription>Manage your account details information</CardDescription>
                  </div>
                </div>
                <Card className="m-4 bg-white text-gray-700">
                  <div className="flex flex-col md:flex-row gap-4">
                    <CardContent className=' w-full'>
                        <form onSubmit={handleSubmit} method="POST" className="space-y-4">
                            <div className="flex gap-4">
                                <div className='w-full'>
                                    <label htmlFor="account_holder_name" className="block mb-2 font-medium">Account Holder Name</label>
                                    <Input 
                                        id="account_holder_name" 
                                        name="account_holder_name" 
                                        placeholder="Enter account holder name"
                                        value={data.account_name} 
                                        className=''
                                        onChange={(e)=>setData('account_name', e.target.value)}
                                    />
                                    {errors.account_name && (
                                        <div className="text-red-500">{errors.account_name}</div>
                                    )}
                                </div>
                                
                                <div className='w-full'>
                                    <label htmlFor="account_number" className="block mb-2 font-medium">Account Number</label>
                                    <Input 
                                        id="account_number" 
                                        name="account_number" 
                                        value={data.account_number} 
                                        placeholder="Enter account number" 
                                        onChange={(e)=>setData('account_number', e.target.value)}
                                        />
                                    {errors.account_number && (
                                        <div className="text-red-500">{errors.account_number}</div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className='w-full'>
                                    <label htmlFor="bank_name" className="block mb-2 font-medium">Bank Name</label>
                                    <Input 
                                        id="bank_name" 
                                        name="bank_name" 
                                        value={data.bank_name} 
                                        placeholder="Enter bank name" 
                                        onChange={(e)=>setData( 'bank_name', e.target.value)}
                                        />
                                    {errors.bank_name && (
                                        <div className="text-red-500">{errors.bank_name}</div>
                                    )}
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="bank_branch" className="block mb-2 font-medium">Bank Branch</label>
                                    <Input 
                                        id="bank_branch" 
                                        name="bank_branch" 
                                        value={data.bank_branch} 
                                        placeholder="Enter bank branch" 
                                        onChange={(e)=>setData('bank_branch', e.target.value)}
                                        />
                                    {errors.bank_branch && (
                                        <div className="text-red-500">{errors.bank_branch}</div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-4">

                              <div className='w-full'>
                                      <label htmlFor="swift_code" className="block mb-2 font-medium">Swift Code</label>
                                      <Input 
                                          id="swift_code" 
                                          name="swift_code" 
                                          value={data.swift_code} 
                                          placeholder="Enter swift code" 
                                          onChange={(e)=>setData('swift_code', e.target.value)}
                                          />
                                      {errors.swift_code && (
                                          <div className="text-red-500">{errors.swift_code}</div>
                                      )}
                                  </div>
                              <div className='w-full'>
                                  <label htmlFor="account_type" className="block mb-2 font-medium">Account Type</label>
                                  <Select  name="account_type" onValueChange={(value) => setData('account_type', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Account Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="savings">Savings</SelectItem>
                                        <SelectItem value="current">Current</SelectItem>
                                    </SelectContent>
                                  </Select>
                              {errors.account_type && (
                                <div className="text-red-500">{errors.account_type}</div>
                              )}
                              </div>
                            </div>
                            <Button type="submit" disabled={processing} className="w-full bg-gray-800 text-white">
                              {processing ? <div className="flex gap-2"><Loader2 className="animate-spin" /> Submitting...</div> : hasAccountDetails ? 'Update Account Details' : 'Add Account Details'}
                            </Button>
                        </form>
                    </CardContent>
                  </div>
                </Card>
            </div>
          </div>
        </VendorLayout>
    );
}
