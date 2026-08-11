<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index(Request $request) : Response 
    {

        $perPage = $request->input('perPage', 3);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $products = Product::select('id', 'name', 'slug', 'created_at')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->orderBy($sort, $direction)
            ->limit(2)
              ->paginate($perPage)->withQueryString();

        $products->getCollection()->transform(function ($product) {
            $product->image = $product->getFirstImageUrl('images', 'thumb');
            return $product;
        });

        $perPage = $request->input('perPage', 3);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');
        $status = $request->input('status', '');
        $paymentStatus = $request->input('payment_status', '');

        $query = Order::with(['user', 'orderItems.product'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('order_number', 'like', '%' . $search . '%')
                        ->orWhere('billing_first_name', 'like', '%' . $search . '%')
                        ->orWhere('billing_last_name', 'like', '%' . $search . '%')
                        ->orWhere('billing_email', 'like', '%' . $search . '%')
                        ->orWhereHas('user', function ($userQuery) use ($search) {
                            $userQuery->where('name', 'like', '%' . $search . '%')
                                ->orWhere('email', 'like', '%' . $search . '%');
                        });
                });
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($paymentStatus, function ($query, $paymentStatus) {
                $query->where('payment_status', $paymentStatus);
            });

        if ($direction === 'desc') {
            $query->orderBy($sort, 'desc')->limit(5);
        } else {
            $query->orderBy($sort, 'asc')->limit(5);
        }

        $orders = $query->paginate($perPage)->withQueryString();

        // Transform the data for the frontend
        $orders->getCollection()->transform(function ($order) {
            return [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->billing_full_name,
                'customer_email' => $order->billing_email,
                'total_price' => $order->total_price,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'payment_method' => $order->payment_method,
                'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                'items_count' => $order->orderItems->count(),
            ];
        });

        $dashboardCount = [
            'total_products' => Product::all()->count(),
            'total_users' => User::all()->count(),
            'total_vendors' => Vendor::all()->count(),
            'total_sales' => Order::all()->sum('subtotal'),
        ];
            
        return Inertia::render('Admin/Dashboard/Index', [
            'dashboard_count' => $dashboardCount,
            'products' => $products,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
                // 'perPage' => $perPage,
                // 'page' => $request->input('page', 1),
            ],
            'orders' => $orders,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
                'perPage' => $perPage,
                'status' => $status,
                'payment_status' => $paymentStatus,
                'page' => $request->input('page', 1),
            ],
            'statuses' => [
                'pending' => 'Pending',
                'confirmed' => 'Confirmed',
                'preparing' => 'Preparing',
                'ready_for_pickup' => 'Ready for Pickup',
                'out_for_delivery' => 'Out for Delivery',
                'delivered' => 'Delivered',
                'completed' => 'Completed',
                'cancelled' => 'Cancelled',
            ],
            'paymentStatuses' => [
                'pending' => 'Pending',
                'paid' => 'Paid',
                'failed' => 'Failed',
                'refunded' => 'Refunded',
            ],
            'can' => [
                'create' => false,
                'edit' => true,
                'delete' => false
            ],
        ]);
    }
}
