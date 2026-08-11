import DataTable from '@/components/DataTables/DataTable';
import AppLayout from '@/layouts/app-layout';
import VendorLayout from '@/layouts/vendor-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { TagIcon } from 'lucide-react';

export default function ProductIndex() {
    const { products, filters, can , vendor, vendorSubscription, vendorSubscriptionCount, vendorProductsCount } = usePage().props;
    console.log([ vendorSubscriptionCount, vendorProductsCount]);
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
        { key: 'slug', label: 'Slug', sortable: false },
        { key: 'created_at', type: 'date', label: 'Created At', sortable: true },
    ];

    const handleDelete = (id: string) => {
        router.delete(route('vendor.products.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                // toast.success('User deleted successfully');
            },
            onError: () => {
                // toast.error('User deletion failed');
            },
        });
    };

    return (
        <VendorLayout>
            <Head title="Products" />
            <div className="py-6">
                <div className="mx-auto">
                    {vendor.vendor_status === 'Inactive' || vendor.vendor_status === 'Pending' && (
                        <div className="mb-4 p-4 text-sm text-yellow-800 bg-yellow-300 rounded-lg" role="alert">
                            Your vendor account is currently pending approval or inactive. Please contact support to activate your account and start managing your products.
                        </div>
                    )}

                    { vendor.vendor_plan !==  'Lifetime Plan' && ( vendorSubscriptionCount < vendorProductsCount && (
                        <div className="mb-4 p-4 text-sm text-red-800 bg-red-300 rounded-lg" role="alert">
                            You have reached your product limit for your current subscription plan. Please upgrade your plan to add more products.
                        </div>
                    ))}
                    <DataTable
                        data={products}
                        columns={columns}
                        resourceName="Products"
                        singularName="Product"
                        routeName="vendor.products.index"
                        filters={filters}
                        canViewResource={false}
                        canCreateResource={true}
                        canEditResource={true}
                        canDeleteResource={true}
                        createRoute="vendor.products.create"
                        viewRoute="vendor.products.show"
                        editRoute="vendor.products.edit"
                        onDelete={handleDelete}
                        icon={TagIcon}
                    />
                </div>
            </div>
        </VendorLayout>
    );
}
