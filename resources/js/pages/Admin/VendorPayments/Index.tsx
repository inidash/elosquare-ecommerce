import DataTable from '@/components/DataTables/DataTable';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { TagIcon } from 'lucide-react';

export default function VendorPayments() {
    const { payments, filters, can } = usePage().props;
    console.log('payments', payments)
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
        { key: 'amount', label: 'Amount', sortable: false, type: 'currency', design: 'rec' },
        { key: 'payment_method', label: 'Payment Method', sortable: false },
        { key: 'transaction_reference', label: 'Transaction Reference', sortable: false },
        { key: 'created_at', type: 'date', label: 'Created At', sortable: true },
    ];

    const handleDelete = (id: string) => {
        router.delete(route('admin.vendor-payments.destroy', id), {
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
            <Head title="Vendor Payments" />
            <div className="py-6">
                <div className="mx-auto">
                    <DataTable
                        data={payments}
                        columns={columns}
                        resourceName="Payments"
                        singularName="Payment"
                        routeName="admin.vendor-payments.index"
                        filters={filters}
                        canViewResource={false}
                        canCreateResource={true}
                        canEditResource={true}
                        canDeleteResource={true}
                        createRoute="admin.vendor-payments.create"
                        viewRoute="admin.vendor-payments.show"
                        editRoute="admin.vendor-payments.edit"
                        onDelete={handleDelete}
                        icon={TagIcon}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
