import DataTable from '@/components/DataTables/DataTable';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Users } from 'lucide-react';

export default function VendorIndex() {
    const { vendors, filters, can } = usePage<{ users: any[], filters: any, can: any }>().props;
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
        { key: 'business_name', label: 'Business Name', sortable: true },
        { key: 'business_address', label: 'Business Address', sortable: true },
        { key: 'class_of_business', label: 'Class of business', sortable: true },
        { key: 'created_at', type: 'date', label: 'Created At', sortable: true },
    ];

    const handleDelete = (id: string) => {
        router.delete(route('admin.vendors.destroy', id), {
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
        <AppLayout>
            <Head title="Vendors" />
            <div className="py-6">
                <div className="mx-auto">
                    <DataTable
                        data={vendors}
                        columns={columns}
                        resourceName="Vendors"
                        singularName="Vendor"
                        routeName="admin.vendors.index"
                        filters={filters}
                        canViewResource={true}
                        canCreateResource={false}
                        canEditResource={false}
                        canDeleteResource={true}
                        viewRoute="admin.vendors.edit"
                        editRoute="admin.users.edit"
                        onDelete={handleDelete}
                        icon={Users}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
