import React from 'react';
import { useState, useCallback } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
// import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { EditIcon, Loader2, Upload, UsersIcon, X } from 'lucide-react';
import EcommerceLayout from '@/layouts/ecom-layout';
import { Button } from "@/components/ui/button"

import {
  Card,
//   CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { CategoryItem } from '@/types/categories';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vendors',
        href: '/vendors/create',
    },
];

const products = [
        'user_id',
        'business_name', 
        'business_address', 
        'business_number', 
        'website',
        'tax_identification_number',
        'business_registration_number',
        'business_description',
        'class_of_business',
        'vendor_address',
        'vendor_city',
        'vendor_state',
        'vendor_zip_code',
        'vendor_country',
        'vendor_phone',
        'vendor_status'
    ];

    interface Users {
        id: string;
        name: string;
    }

export default function CreateVendor({users}: {users: Users[]}) {
    console.log(users);
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const {data, setData, post, processing, errors, reset } = useForm<{
        user_id: string;
        business_name: string;
        business_address: string;
        business_number: string;
        business_website: string;
        tax_identification_number: string;
        business_reg_number: string;
        business_description: string;
        class_of_business: string;
        vendor_address: string;
        vendor_city: string;
        vendor_state: string;
        vendor_zip_code: string;
        vendor_country: string;
        vendor_phone: string;
        vendor_status: string;
    }>({
        user_id: '',
        business_name: '',
        business_address: '',
        business_number: '',
        business_website: '',
        tax_identification_number: '',
        business_reg_number: '',
        business_description: '',
        class_of_business: '',
        vendor_address: '',
        vendor_city: '',
        vendor_state: '',
        vendor_zip_code: '',
        vendor_country: '',
        vendor_phone: '',
        vendor_status: '',
    });

    
     const [previewUrls, setPreviewUrls] = useState<(string | null)[]>([]);

    // Handle file change
    

    // Handle Drop function

    // Submit form handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      console.log('vendor:',data)
        // Submit form request
        post('/create');
  
    }
    return (
        <EcommerceLayout >
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="w-full mx-auto">
                  <CardHeader>
                    <CardTitle className='flex items-center justify-around'>
                      <h3>Vendors</h3>  
                      <span className=' mx-auto'>
                        Add Vendors to ELOSQUARE.
                      </span>
                    </CardTitle>
                    {/* <CardAction>
                      
                    </CardAction>  */}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}> 
                      <div className="grid gap-4 py-4">
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                          <div className="w-[50%] grid gap-2">
                              <Label htmlFor="name">Select the User</Label>
                                <Select  name="user_id" onValueChange={(value) => setData('user_id', value)}>
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Select the User" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users?.map((user: any) => (
                                            <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                                        ))
                                        }
                                    </SelectContent>
                                </Select>
                                {errors.user_id && <span className="text-red-600">{errors.user_id}</span>}
                          </div>
                          </div>
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full grid gap-2">
                              <Label htmlFor="name">Business Name</Label>
                              <Input 
                                id="name" 
                                type='text' 
                                name='business_name' 
                                placeholder="Business Name" 
                                value={data.business_name}
                                onChange={(e) => setData('business_name', e.target.value)}
                                />
                                {errors.business_name && <span className="text-red-600">{errors.business_name}</span>}
                          </div>
                          <div className="w-full grid gap-2">
                              <Label htmlFor="size">Business Address</Label>
                              <Input 
                                id="name" 
                                type='text' 
                                name='business_address' 
                                placeholder="Business Address" 
                                value={data.business_address}
                                onChange={(e) => setData('business_address', e.target.value)}
                                />
                                {errors.business_address && <span className="text-red-600">{errors.business_address}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full grid gap-2">
                              <Label htmlFor="name">Business Number</Label>
                              <Input 
                                id="name" 
                                type='text' 
                                name='business_number' 
                                placeholder="Business Number" 
                                value={data.business_number}
                                onChange={(e) => setData('business_number', e.target.value)}
                                />
                                {errors.business_number && <span className="text-red-600">{errors.business_number}</span>}
                          </div>
                          <div className="w-full grid gap-2">
                              <Label htmlFor="size">Business Website</Label>
                              <Input 
                                id="name" 
                                type='text' 
                                name='business_website' 
                                placeholder="Business Website" 
                                value={data.business_website}
                                onChange={(e) => setData('business_website', e.target.value)}
                                />
                                {errors.business_website && <span className="text-red-600">{errors.business_website}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full grid gap-2">
                            <Label htmlFor="parent"> Class of Business</Label>
                            <Select  name="business_class" onValueChange={(value) => setData('class_of_business', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Class of Business" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="apple">Corporate</SelectItem>
                                <SelectItem value="banana">Private</SelectItem>
                            </SelectContent>
                            </Select>
                            {errors.class_of_business && <span className="text-red-600">{errors.class_of_business}</span>}
                        </div>


                          <div className="w-full grid gap-2">
                              <Label htmlFor="size">Business Reg Number</Label>
                              <Input 
                                id="name" 
                                type='text' 
                                name='business_reg_number' 
                                placeholder="Business Reg Number" 
                                value={data.business_reg_number}
                                onChange={(e) => setData('business_reg_number', e.target.value)}
                                />
                                {errors.business_reg_number && <span className="text-red-600">{errors.business_reg_number}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full grid gap-2">
                              <Label htmlFor="name">Vendor Address</Label>
                              <Input 
                                id="name" 
                                type='text' 
                                name='vendor_address' 
                                placeholder="Vendor Address" 
                                value={data.vendor_address}
                                onChange={(e) => setData('vendor_address', e.target.value)}
                                />
                                {errors.vendor_address && <span className="text-red-600">{errors.vendor_address}</span>}
                          </div>
                          <div className="w-full grid gap-2">
                              <Label htmlFor="size">Vendor City</Label>
                              <Input 
                                id="name" 
                                type='text' 
                                name='vendor_city' 
                                placeholder="Vendor City" 
                                value={data.vendor_city}
                                onChange={(e) => setData('vendor_city', e.target.value)}
                                />
                                {errors.vendor_city && <span className="text-red-600">{errors.vendor_city}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full grid gap-2">
                              <Label htmlFor="name">Vendor State</Label>
                              <Input 
                                id="name" 
                                type='text' 
                                name='vendor_state' 
                                placeholder="Vendor State" 
                                value={data.vendor_state}
                                onChange={(e) => setData('vendor_state', e.target.value)}
                                />
                                {errors.vendor_state && <span className="text-red-600">{errors.vendor_state}</span>}
                          </div>
                          <div className="w-full grid gap-2">
                              <Label htmlFor="size">Vendor Country</Label>
                              <Input 
                                id="name" 
                                type='text' 
                                name='vendor_country' 
                                placeholder="Vendor Country" 
                                value={data.vendor_country}
                                onChange={(e) => setData('vendor_country', e.target.value)}
                                />
                                {errors.vendor_country && <span className="text-red-600">{errors.vendor_country}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full grid gap-2">
                              <Label htmlFor="name">Vendor ZipCode</Label>
                              <Input 
                                id="name" 
                                type='text' 
                                name='vendor_zipcode' 
                                placeholder="Vendor ZipCode" 
                                value={data.vendor_zip_code}
                                onChange={(e) => setData('vendor_zip_code', e.target.value)}
                                />
                                {errors.vendor_zip_code && <span className="text-red-600">{errors.vendor_zip_code}</span>}
                          </div>
                          <div className="w-full grid gap-2">
                              <Label htmlFor="size">Vendor Phone Number</Label>
                              <Input 
                                id="name" 
                                type='text' 
                                name='vendor_phone' 
                                placeholder="Vendor Phone Number" 
                                value={data.vendor_phone}
                                onChange={(e) => setData('vendor_phone', e.target.value)}
                                />
                                {errors.vendor_phone && <span className="text-red-600">{errors.vendor_phone}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full grid gap-2">
                                <Label htmlFor="name">Business Name</Label>
                                <Textarea id="description" onChange={(e) => setData('business_description', e.target.value)} name='business_description' className='bg-gray-900 p-2 rounded-md h-40' placeholder="Business Description" />
                                    {errors.business_description && <span className="text-red-600">{errors.business_description}</span>}
                            </div>

                                {errors.business_description && <span className="text-red-600">{errors.business_description}</span>}
                          </div>
                        <div className="flex justify-end pt-4">
                          <Button type="submit" disabled={processing} className='bg-blue-500 text-white'>
                            {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Vendor'}
                          </Button>
                      </div>
                      </div>
                    </form>
                </CardContent>
                </Card>
                
            </div>
        </EcommerceLayout>


    );
}
