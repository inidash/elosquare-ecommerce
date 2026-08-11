import React from 'react';
import { useState, useCallback } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
// import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage} from '@inertiajs/react';
import { EditIcon, Loader2, Upload, UsersIcon, X } from 'lucide-react';
import EcommerceLayout from '@/layouts/ecom-layout';
import { Button } from "@/components/ui/button"

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
import { InternalFloatingPanelProps } from 'node_modules/@headlessui/react/dist/internal/floating';
// import { CategoryItem } from '@/types/categories';

export default function RegisterVendor() {
    // console.log(users);
  //   const {auth} = usePage().props
  //   const { props } = usePage();

  // console.log(auth.user.id); //
    
    const {data, setData, post, processing, errors } = useForm<{
        business_name: string;
        business_address: string;
        state_of_business: string,
        business_number: string;
        business_website: string;
        tax_identification_number: string;
        business_registration_number: string;
        business_description: string;
        class_of_business: string;
        vendor_address: string;
        vendor_city: string;
        vendor_state: string;
        vendor_zip_code: string;
        vendor_country: string;
        vendor_phone: string;
       
    }>({
        
        business_name: '',
        business_address: '',
        state_of_business: '',
        business_number: '',
        business_website: '',
        tax_identification_number: '',
        business_registration_number: '',
        business_description: '',
        class_of_business: '',
        vendor_address: '',
        vendor_city:'',
        vendor_state: '',
        vendor_zip_code: '',
        vendor_country: '',
        vendor_phone: '',
        
    });

    
     const [previewUrls, setPreviewUrls] = useState<(string | null)[]>([]);


    // Submit form handler
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      console.log(data)
    post(route('user.store-vendor'), {
        onSuccess: () => {
            console.log('Vendor registered successfully!');
            // Optionally redirect to vendor dashboard page
            // router.visit(route('vendor.dashboard'))
        },
        onError: (errors) => {
            console.error('Validation errors:', errors);
        },
    });
};

    return (
        <EcommerceLayout title="Vendor Register - Elosquare">
          <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                    {/* Register Form */}
                    <div className="md:w-1/2">
                        <div className="overflow-hidden rounded-lg bg-white text-black shadow-sm">
                            <div className="border-b p-6 flex flex-col items-center">
                                <h2 className="text-lg font-semibold">Register to become a Vendor</h2>
                                <p className="mt-1 text-gray-600">Create your vendor profile to start selling today!</p>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleSubmit}> 
                                  <div className="grid gap-4 py-4">
                                    <div className="flex flex-col md:flex-row gap-4 w-full">
                      
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
                                            <SelectItem value="Corporate">Corporate</SelectItem>
                                            <SelectItem value="Private">Private</SelectItem>
                                        </SelectContent>
                                        </Select>
                                        {errors.class_of_business && <span className="text-red-600">{errors.class_of_business}</span>}
                                    </div>


                                      <div className="w-full grid gap-2">
                                          <Label htmlFor="size">Business Reg Number</Label>
                                          <Input 
                                            id="name" 
                                            type='text' 
                                            name='business_registration_number' 
                                            placeholder="Business Reg Number" 
                                            value={data.business_registration_number}
                                            onChange={(e) => setData('business_registration_number', e.target.value)}
                                            />
                                            {errors.business_registration_number && <span className="text-red-600">{errors.business_registration_number}</span>}
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
                                          <Label htmlFor="size">Business City</Label>
                                          <Input 
                                            id="name" 
                                            type='text' 
                                            name='state_of_business' 
                                            placeholder="Business state" 
                                            value={data.state_of_business}
                                            onChange={(e) => setData('state_of_business', e.target.value)}
                                            />
                                            {errors.state_of_business && <span className="text-red-600">{errors.state_of_business}</span>}
                                      </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                      <div className="w-full grid gap-2">
                                          <Label htmlFor="name">Vendor State</Label>
                                          <Input 
                                            id="name" 
                                            type='text' 
                                            name='vendor_state' 
                                            placeholder="vendor State" 
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
                                            placeholder="vendor Country" 
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
                                            placeholder="vendor ZipCode" 
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
                                            placeholder="vendor Phone Number" 
                                            value={data.vendor_phone}
                                            onChange={(e) => setData('vendor_phone', e.target.value)}
                                            />
                                            {errors.vendor_phone && <span className="text-red-600">{errors.vendor_phone}</span>}
                                      </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                      <div className="w-full grid gap-2">
                                          <Label htmlFor="name">tax identification Number</Label>
                                          <Input 
                                            id="name" 
                                            type='text' 
                                            name='tax_identification_number' 
                                            placeholder="tax number" 
                                            value={data.tax_identification_number}
                                            onChange={(e) => setData('tax_identification_number', e.target.value)}
                                            />
                                            {errors.tax_identification_number && <span className="text-red-600">{errors.tax_identification_number}</span>}
                                      </div>
                                      <div className="w-full grid gap-2">
                                          <Label htmlFor="name">Vendor city</Label>
                                          <Input 
                                            id="name" 
                                            type='text' 
                                            name='vendor_city' 
                                            placeholder="vendor city " 
                                            value={data.vendor_city}
                                            onChange={(e) => setData('vendor_city', e.target.value)}
                                            />
                                            {errors.vendor_city && <span className="text-red-600">{errors.vendor_city}</span>}
                                      </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full grid gap-2">
                                            <Label htmlFor="name">Business Description</Label>
                                            <Textarea id="description" onChange={(e) => setData('business_description', e.target.value)} name='business_description' className='p-2 rounded-md h-40' placeholder="Business Description" />
                                                {errors.business_description && <span className="text-red-600">{errors.business_description}</span>}
                                        </div>

                                            {errors.business_description && <span className="text-red-600">{errors.business_description}</span>}
                                      </div>
                                    <div className="flex justify-end pt-4">
                                      <Button variant={'default'} type="submit" disabled={processing} className='bg-blue-400 text-gray-100'>
                                        {processing ? 'Saving vendor...' : 'Save Vendor'}
                                      </Button>
                                  </div>
                                  </div>
                                </form>
                                <div className="mt-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
</div>
        </EcommerceLayout>


    );
}
