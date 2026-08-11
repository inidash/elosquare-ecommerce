import DataTable from '@/components/DataTables/DataTable'
import OrderTable from '@/components/DataTables/OrderTable'
import AppLayout from '@/layouts/app-layout'
import { Head, router, usePage } from '@inertiajs/react'
import { BookCheckIcon, Package2Icon } from 'lucide-react'

export default function OrderIndex() {
  const { transactions,filters, statuses, paymentStatuses, can } = usePage().props
console.log('data',transactions)
  const columns = [
    {
      key: 'index',
      label: '#',
      sortable: false,
      type: 'IndexColumn',
      width: '80px',
      render: (item: any, index: number) => {
        return (filters.page - 1) * filters.perPage + index + 1
      },
    },
    { key: 'user.name', label: 'User Name', sortable: true },
    { key: 'user.points', label: 'User Total Points', sortable: false },
    { key: 'vendor.business_name', label: 'Vendor Store', sortable: false },
    { key: 'vendor.points',  label: 'Vendor Total Points', sortable: true },
    // { key: 'ven', type: 'badge', label: 'Status', sortable: true },
    { key: 'location', label: 'Vendor Location', sortable: false },
    { key: 'product.name',  label: 'Product name', sortable: true },
   
    // { key: 'order.payment_method', label: 'Payment Method', sortable: false },
    { key: 'transaction_status', type: 'badge', label: 'Transaction Status', sortable: true },
    // { key: 'payment_status', type: 'badge', label: 'Payment Status', sortable: true },
    // { key: 'status', type: 'badge', label: 'Payment Status', sortable: true },
    // { key: 'items_count', label: 'Items', sortable: false },
    { key: 'created_at', type: 'date', label: 'Transaction Date', sortable: true },
  ]

  const handleDelete = (id: string) => {
    router.delete(route('admin.orders.destroy', id), {
      preserveScroll: true,
      onSuccess: () => {
        // toast.success('Order deleted successfully');
      },
      onError: () => {
        // toast.error('Order deletion failed');
      },
    })
  }

  return (
    <AppLayout>
      <Head title="Transactions" />
      <div className="py-6">
        <div className="mx-auto">
          <OrderTable
            data={transactions}
            columns={columns}
            resourceName="Transactions"
            singularName="Transaction"
            routeName="admin.transactions.index"
            filters={filters}
            canViewResource={false}
            canCreateResource={can.create}
            canEditResource={can.edit}
            canDeleteResource={can.delete}
            createRoute=""
            viewRoute="admin.transaction.show"
            editRoute=""
            onDelete={handleDelete}
            icon={Package2Icon}
            additionalFilters={{
              status: {
                label: 'Status',
                options: Object.entries(statuses).map(([value, label]) => ({ value, label })),
                value: filters.status,
              },
              payment_status: {
                label: 'Payment Status',
                options: Object.entries(paymentStatuses).map(([value, label]) => ({
                  value,
                  label,
                })),
                value: filters.payment_status,
              },
            }}
          />
        </div>
      </div>
    </AppLayout>
  )
}
