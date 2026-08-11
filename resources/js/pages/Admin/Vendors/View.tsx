import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, FileText, ImageIcon, Save, TagIcon, Trash2, Upload, User } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast"; 


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: 'dashboard' },
    { title: 'Vendors', href: route('admin.vendors.index') },
    { title: 'Vendor Details', href: '' },
];


interface Vendor {
  id: number;
  business_name: string;
  business_address: string;
  email: string;
  phone: string;
  status: "pending" | "approved" | "inactive";
  plan_type: "free" | "paid";
  created_at: string;
}

interface Subscription {
  id: number;
  plan_name: string;
  amount: string;
  start_date: string;
  end_date: string;
  status: string;
}

interface Payment {
  id: number;
  user: {
    name: string;
  };
  amount: string;
  payment_method: string;
  payment_date: string;
  payment_reference: string;
}

interface Subscription {
  id: number;
  subscription_plan: string;
  subscription_price: string;
  subscription_duration: string;
  subscription_status: string;
  subscription_renewal_date: string;
  subscription_start_date: string;
  subscription_end_date: string;
}

interface Payment {
  id: number;
  user: {
    name: string;
  };
  amount: string;
  payment_method: string;
  payment_date: string;
  payment_reference: string;
}

interface AccountDetails {
  id: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  vendor_id: number;
}
interface VendorDetailsProps {
  vendor: Vendor;
  subscriptions?: Subscription[];
  payments?: Payment[];
  account_details?: AccountDetails[];
}

const VendorDetails = () => {
  const { vendor, payments, subscriptions, account_details } = usePage().props;
  // Form for status update
  const {
    data: statusData,
    setData: setStatusData,
    put: putStatus,
    processing: statusProcessing,
  } = useForm({
    status: vendor.status,
  });

  // Form for plan update
  const {
    data: planData,
    setData: setPlanData,
    put: putPlan,
    processing: planProcessing,
  } = useForm({
    plan_type: vendor.plan_type,
  });

  const submitStatus = (e: React.FormEvent) => {
    e.preventDefault();
    putStatus(route("admin.vendor.update-status", vendor.id), {
      preserveScroll: true,
      onSuccess: () => {
        // optional: toast or alert
        toast.success('vendor status updated successfully', {
          duration: 3000,
          position: "top-right",
          
        });
      },
    });
  };

  const submitPlan = (e: React.FormEvent) => {
    e.preventDefault();
    putPlan(route("admin.vendor.update-plan", vendor.id), {
      preserveScroll: true,
      onSuccess: () => {
        // optional: toast or alert
        toast.success('vendor plan updated successfully', {
          duration: 3000,
          position: "top-right",
          
        });      
      },
    });
  };
  // useEffect(() => {
  //     if (props.flash?.success) {
  //       toast.success(props.flash.success, {
  //         duration: 3000,
  //         position: "bottom-right",
          
  //       });
  //     }
  //   }, [props.flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vendor Details" />
            <div className="fron-gray-50 min-h-screen bg-gradient-to-br to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
              <Toaster />
                <Card className="overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800">
                    <CardHeader>
                        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
                            <Card className="overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800 mb-4">
                                <CardHeader>
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/20 dark:bg-primary/30 rounded-xl p-3 shadow-sm backdrop-blur-sm">
                                                <User className="text-primary dark:text-primary-light" size={24} />
                                            </div>
                                            <div>
                                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Vendor Details</h1>
                                                {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">edit a category</p> */}
                                            </div>
                                        </div>

                                        <Link href={route('admin.vendors.index')}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center gap-2 text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                <ArrowLeft size={16} />
                                                Back
                                            </Button>
                                        </Link>
                                    </div>
                                </CardHeader>

                                <CardContent className=" flex justify-between">
                                    <div className='px-4'>
                                      <div className='mb-4'><strong>Business Name:</strong> {vendor.business_name}</div>
                                      <div className='mb-4'><strong>Business Address:</strong> {vendor.business_address}</div>
                                      <div className='mb-4'><strong>Business class:</strong> {vendor.class_of_business}</div>
                                      <div className='mb-4'><strong>Business Number:</strong> {vendor.business_number}</div>
                                      <div className='mb-4'><strong>State of Business:</strong> <span className="capitalize">{vendor.state_of_business}</span></div>
                                      <div className='mb-4'><strong>Tax ID Number:</strong> <span className="capitalize">{vendor.tax_identification_number}</span></div>
                                      <div className='mb-4'><strong>Business REG. NO.:</strong> {vendor.business_registration_number}</div>
                                      
                                    </div>
                                    <div>
                                   
                                      <div className='mb-4'><strong>Vendor Name:</strong> {vendor.user.name}</div>
                                      <div className='mb-4'><strong>Vendor Email:</strong> {vendor.user.email}</div>
                                      <div className='mb-4'><strong>Vendor Address:</strong> {vendor.vendor_address}</div>
                                      <div className='mb-4'><strong>Vendor State:</strong> {vendor.vendor_state}</div>
                                      <div className='mb-4'><strong>Vendor Phone:</strong> {vendor.vendor_phone}</div>
                                      <div className='mb-4'><strong>Vendor Status:</strong> <span className="capitalize">{vendor.vendor_status}</span></div>
                                      <div className='mb-4'><strong>Vendor Plan:</strong> <span className="capitalize">{vendor.vendor_plan}</span></div>
                                      <div className='mb-4'><strong>Created At:</strong> {new Date(vendor.created_at).toLocaleString()}</div>
                                    </div>
                                </CardContent>
                                <div className='px-4 mb-4 bg-gray-900 p-4 rounded-2xl mx-4'><strong>Business Description:</strong> 
                                  <div className="mt-2 ">
                                    <p>{vendor.business_description}</p>
                                  </div>
                                </div>
                                <div className='px-4 bg-gray-900 p-4 rounded-2xl mx-4'>
                                  <p className='mb-3 '></p><strong>Bank Details:</strong> 
                                  <div className="mt-2 ">
                                    {account_details && account_details.length > 0 ? (
                                      <ul>
                                        {account_details.map((account) => (
                                          <li key={account.id} className='my-4'>
                                            <p className='mb-3'><strong>Bank Name:</strong> {account.bank_name}</p>
                                            <p className='mb-3'><strong>Account Number:</strong> {account.account_number}</p>
                                            <p className='mb-3'><strong>Account Name:</strong> {account.account_name}</p>
                                            <p className='mb-3'><strong>Account Type:</strong> {account.account_type}</p>
                                            <p className='mb-3'><strong>Swift Code:</strong> {account.swift_code}</p>
                                            <p className='mb-3'><strong>Bank Branch:</strong> {account.bank_branch}</p>

                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p>No bank details available.</p>
                                    )}
                                  </div>
                                </div>
                            </Card>
                            {/* Forms side by side */}
                            <div className="grid md:grid-cols-2 gap-6 mb-4">
                              {/* Update Status Form */}
                              <Card className='overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800'>
                                <CardHeader>
                                  <CardTitle>Update Vendor Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <form onSubmit={submitStatus} className="space-y-4">
                                    <div>
                                      <label className="block text-sm font-medium mb-1">Vendor Status</label>
                                      <Select
                                        value={statusData.status}
                                        onValueChange={(value) => setStatusData("status", value)}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Pending">Pending</SelectItem>
                                          <SelectItem value="Approved">Approved</SelectItem>
                                          <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <Button type="submit" disabled={statusProcessing}>
                                      {statusProcessing ? (
                                        <>
                                          <Loader2 className="animate-spin h-4 w-4 mr-2" /> Updating...
                                        </>
                                      ) : (
                                        "Update Status"
                                      )}
                                    </Button>
                                  </form>
                                </CardContent>
                              </Card>

                              {/* Update Plan Form */}
                              <Card className='overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800'>
                                <CardHeader>
                                  <CardTitle>Upgrade Vendor Plan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <form onSubmit={submitPlan} className="space-y-4">
                                    <div>
                                      <label className="block text-sm font-medium mb-1">Plan Type</label>
                                      <Select
                                        value={planData.plan_type}
                                        onValueChange={(value) => setPlanData("plan_type", value)}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select plan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="free">Free</SelectItem>
                                          <SelectItem value="paid">Paid</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <Button type="submit" disabled={planProcessing}>
                                      {planProcessing ? (
                                        <>
                                          <Loader2 className="animate-spin h-4 w-4 mr-2" /> Updating...
                                        </>
                                      ) : (
                                        "Upgrade Plan"
                                      )}
                                    </Button>
                                  </form>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Subscription Table */}
                            <Card className='overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800'>
                              <CardHeader>
                                <CardTitle>Subscription Records</CardTitle>
                              </CardHeader>
                              <CardContent>
                                {subscriptions.length === 0 ? (
                                  <div className="text-sm text-gray-500">No subscription records found.</div>
                                ) : (
                                  <Table>
                                    <TableHeader>
                                      <TableRow className='bg-gray-700'>
                                        {/* <TableHead className='font-bold text-white'>Plan Name</TableHead> */}
                                        <TableHead className='font-bold text-white'>Amount</TableHead>
                                        <TableHead className='font-bold text-white'>Duration</TableHead>
                                        <TableHead className='font-bold text-white'>Status</TableHead>
                                        <TableHead className='font-bold text-white'>Renewal Date</TableHead>
                                        <TableHead className='font-bold text-white'>Start Date</TableHead>
                                        <TableHead className='font-bold text-white'>End Date</TableHead>
                                        
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody> 
                                      {subscriptions.map((sub) => (
                                        <TableRow key={sub.id}>
                                          {/* <TableCell>{sub.subscription_plan}</TableCell> */}
                                          <TableCell>₦{sub.subscription_price}</TableCell>
                                          <TableCell>{sub.subscription_duration}</TableCell>
                                          <TableCell>{sub.subscription_status}</TableCell>
                                          <TableCell>{sub.subscription_renewal_date}</TableCell>
                                          <TableCell>{sub.subscription_start_date}</TableCell>
                                          <TableCell>{sub.subscription_end_date}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                )}
                              </CardContent>
                            </Card>
                            {/* Payment Information */}
                            <Card className='my-4 overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800'>
                              <CardHeader>
                                <CardTitle>Payment Records</CardTitle>
                              </CardHeader>
                              <CardContent>
                                {payments.length === 0 ? (
                                  <div className="text-sm text-gray-500">No payment records for now.</div>
                                ) : (
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        {/* <TableHead>Name</TableHead> */}
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Payment Method</TableHead>
                                        <TableHead>Payment Date</TableHead>
                                        <TableHead>Transaction Reference</TableHead>
                                        <TableHead>Description</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody> 
                                      {payments.map((item) => (
                                        <TableRow key={item.id}>
                                          {/* <TableCell>{item.user.name}</TableCell> */}
                                          <TableCell>&#8358;{item.amount}</TableCell>
                                          <TableCell>{item.payment_method}</TableCell>
                                          <TableCell>{item.payment_date}</TableCell>
                                          <TableCell>{item.transaction_reference}</TableCell>
                                          <TableCell>{item.note}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                )}
                              </CardContent>
                            </Card>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
export default VendorDetails;
