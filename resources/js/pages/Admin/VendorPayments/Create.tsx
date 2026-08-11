import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Calendar, Calendar1, CreditCard, CreditCardIcon, DollarSignIcon, FileText, ImageIcon, Loader2, Save, TagIcon, Trash2, Upload, User, User2Icon } from 'lucide-react';
import { useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: 'dashboard' },
    { title: 'categories', href: route('admin.categories.index') },
    { title: 'Create Category', href: '' },
];

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    parent_id: number | null;
    image: string;
    created_at: string;
    updated_at: string;
}

interface CategoryWithPath extends Category {
    path: string;
    level: number;
}

export default function Create() {

    const {vendors} = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
       
        vendor_id: '',
        amount: '',
        payment_method: '',
        transaction_reference: '',
        payment_date: '',
        note: '',
         image: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);

        const normalizeParentId = data.parent_id === 'none' ? null : Number(data.parent_id);
        console.log(data)
        post(route('admin.vendor-payments.store'), {
            data: {
                ...data,
                parent_id: normalizeParentId,
            },
            preserveScroll: true,
            onProgress: (progress) => {
                if (progress.percentage) {
                    setUploadProgress(progress.percentage);
                }
            },
            onSuccess: () => {
                setIsUploading(false);
                setUploadProgress(0);
            },
            onError: () => {
                setIsUploading(false);
                setUploadProgress(0);
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setData('image', null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="fron-gray-50 min-h-screen bg-gradient-to-br to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
                <Card className="overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800">
                    <CardHeader>
                        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
                            <Card className="overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800">
                                <CardHeader>
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/20 dark:bg-primary/30 rounded-xl p-3 shadow-sm backdrop-blur-sm">
                                                <User className="text-primary dark:text-primary-light" size={24} />
                                            </div>
                                            <div>
                                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create Category</h1>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Add new category</p>
                                            </div>
                                        </div>

                                        <Link href={route('admin.categories.index')}>
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

                                <CardContent className="p-0">
                                    <form onSubmit={handleSubmit} className="p-6">
                                        <div className="mx-auto max-w-xl space-y-6">
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="name"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    <span  className="text-primary dark:text-primary-light">
                                                       &#8358; Amount
                                                    </span>
                                                </Label>

                                                <div className="group relative">
                                                    <Input
                                                        id="amount"
                                                        name="amount"
                                                        value={data.amount}
                                                        onChange={(e) => setData('amount', e.target.value)}
                                                        className="focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20 h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500"
                                                        placeholder="Enter amount"
                                                        required
                                                        autoFocus
                                                    />
                                                    <span className="group-hover:text-primary dark:group-hover:text-primary-light absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors dark:text-gray-500">
                                                        &#8358;
                                                    </span>
                                                </div>

                                                {errors.amount && (
                                                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                                                        <AlertCircle size={14} />
                                                        <span>{errors.amount}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="parent_id"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    <CreditCardIcon size={14} className="text-primary dark:text-primary-light" />
                                                    Payment Method
                                                </Label>

                                                <Select value={data.payment_method ?? 'none'} onValueChange={(value) => setData('payment_method', value)}>
                                                    <SelectTrigger className="h-12 w-full">
                                                        <SelectValue placeholder="Select Vendor" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="none" className="text-gray-500">
                                                            Select Payment Method
                                                        </SelectItem>
                                                                <SelectItem  value="credit_card" className="pl-2">
                                                                    Credit Card
                                                                </SelectItem>
                                                                <SelectItem  value="paypal" className="pl-2">
                                                                    PayPal
                                                                </SelectItem>
                                                                <SelectItem  value="bank_transfer" className="pl-2">
                                                                    Bank Transfer
                                                                </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.payment_method && (
                                                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                                                        <AlertCircle size={14} />
                                                        <span>{errors.payment_method}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="name"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    <TagIcon size={14} className="text-primary dark:text-primary-light" />
                                                    Transaction Reference
                                                </Label>

                                                <div className="group relative">
                                                    <Input
                                                        id="transaction_reference"
                                                        name="transaction_reference"
                                                        value={data.transaction_reference}
                                                        onChange={(e) => setData('transaction_reference', e.target.value)}
                                                        className="focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20 h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500"
                                                        placeholder="Enter transaction reference"
                                                        required
                                                        autoFocus
                                                    />
                                                    <CreditCard
                                                        size={18}
                                                        className="group-hover:text-primary dark:group-hover:text-primary-light absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors dark:text-gray-500"
                                                    />
                                                </div>

                                                {errors.transaction_reference && (
                                                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                                                        <AlertCircle size={14} />
                                                        <span>{errors.transaction_reference}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="name"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    <Calendar size={14} className="text-primary dark:text-primary-light" />
                                                    Payment Date
                                                </Label>

                                                <div className="group relative">
                                                    <Input
                                                        id="payment_date"
                                                        type="date"
                                                        name="payment_date"
                                                        value={data.payment_date}
                                                        onChange={(e) => setData('payment_date', e.target.value)}
                                                        className="focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20 h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500"
                                                        placeholder="Enter payment date"
                                                        required
                                                        autoFocus
                                                    />
                                                    <Calendar1
                                                        size={18}
                                                        className="group-hover:text-primary dark:group-hover:text-primary-light absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors dark:text-gray-500"
                                                    />
                                                </div>

                                                {errors.payment_date && (
                                                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                                                        <AlertCircle size={14} />
                                                        <span>{errors.payment_date}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="description"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    <FileText size={14} className="text-primary dark:text-primary-light" />
                                                    Description
                                                </Label>

                                                <Textarea
                                                    id="note"
                                                    name="note"
                                                    value={data.note}
                                                    onChange={(e) => setData('note', e.target.value)}
                                                    className="focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20 min-h-24 w-full rounded-lg border border-gray-200 bg-white/80 p-4 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100"
                                                    placeholder="Enter category description"
                                                />

                                                {errors.note && (
                                                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                                                        <AlertCircle size={14} />
                                                        <span>{errors.note}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="parent_id"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    <User2Icon size={14} className="text-primary dark:text-primary-light" />
                                                    Vendor
                                                </Label>

                                                <Select value={data.vendor_id ?? 'none'} onValueChange={(value) => setData('vendor_id', value)}>
                                                    <SelectTrigger className="h-12 w-full">
                                                        <SelectValue placeholder="Select Vendor" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="none" className="text-gray-500">
                                                            No Vendor
                                                        </SelectItem>
                                                        {vendors &&
                                                            vendors.map((vendor) => (
                                                                <SelectItem key={vendor.id} value={String(vendor.id)} className="pl-2">
                                                                    <span
                                                                        className="inline-block"
                                                                        
                                                                    >
                                                                         {vendor.user.name} {`vendor store:${vendor.business_name}`}
                                                                    </span>
                                                                </SelectItem>
                                                            ))} 
                                                    </SelectContent>
                                                </Select>
                                                {errors.vendor_id && (
                                                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                                                        <AlertCircle size={14} />
                                                        <span>{errors.vendor_id}</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="image"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    <ImageIcon size={14} className="text-primary dark:text-primary-light" />
                                                    Payment Image
                                                </Label>

                                                <div className="group relative">
                                                    {!imagePreview ? (
                                                        <div
                                                            className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white/80 p-4 text-center transition-all hover:border-gray-300 dark:border-gray-600 dark:bg-gray-800/80 dark:hover:border-gray-500"
                                                            onClick={() => fileInputRef.current?.click()}
                                                        >
                                                            <Upload size={24} className="mb-2 text-gray-400 dark:text-gray-500" />
                                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to upload</p>
                                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 5MB</p>
                                                        </div>
                                                    ) : (
                                                        <div className="relative h-40 w-full overflow-hidden rounded-lg border border-gray-200 bg-white/80 transition-all dark:border-gray-600 dark:bg-gray-800/80">
                                                            <img src={imagePreview} alt="Category preview" className="h-full w-full object-cover" />
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all hover:bg-black/40">
                                                                <div className="flex gap-2 opacity-0 hover:opacity-100">
                                                                    <Button
                                                                        type="button"
                                                                        variant="secondary"
                                                                        size="sm"
                                                                        className="rounded-full"
                                                                        onClick={() => fileInputRef.current?.click()}
                                                                    >
                                                                        <Upload size={16} />
                                                                    </Button>
                                                                    <Button
                                                                        type="button"
                                                                        variant="secondary"
                                                                        size="sm"
                                                                        className="rounded-full"
                                                                        onClick={clearImage}
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        id="image"
                                                        name="image"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>

                                                {isUploading && data.image && (
                                                    <div className="mt-2">
                                                        <Progress value={uploadProgress} className="h-2 w-full bg-gray-200 dark:bg-gray-700" />
                                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{uploadProgress}% uploaded</p>
                                                    </div>
                                                )}

                                                {errors.image && (
                                                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                                                        <AlertCircle size={14} />
                                                        <span>{errors.image}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="pt-4">
                                                <Button type="submit" className="w-full" disabled={processing}>
                                                    <Save size={16} className="mr-2" />
                                                    {processing ? <div className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</div> : 'Save Payment'}
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
