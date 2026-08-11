<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\OrderResource;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        // $perPage = $request->input('perPage', 10);
        // $search = $request->input('search', '');
        // $sort = $request->input('sort', 'created_at');
        // $direction = $request->input('direction', 'desc');
        // $status = $request->input('status', '');
        // $paymentStatus = $request->input('payment_status', '');

        // $vendor = auth()->user()->vendor;
        
        // $query = Order::with(['user', 'orderItems.product'])
        //     ->whereHas('orderItems.product', function ($q) use ($vendor) {
        //         $q->where('vendor_id', $vendor->id);
        //     })
        //     ->when($search, function ($query, $search) {
        //         $query->where(function ($q) use ($search) {
        //             $q->where('order_number', 'like', '%' . $search . '%')
        //                 ->orWhere('billing_first_name', 'like', '%' . $search . '%')
        //                 ->orWhere('billing_last_name', 'like', '%' . $search . '%')
        //                 ->orWhere('billing_email', 'like', '%' . $search . '%')
        //                 ->orWhereHas('user', function ($userQuery) use ($search) {
        //                     $userQuery->where('name', 'like', '%' . $search . '%')
        //                         ->orWhere('email', 'like', '%' . $search . '%');
        //                 });
        //         });
        //     })
        //     ->when($status, function ($query, $status) {
        //         $query->where('status', $status);
        //     })
        //     ->when($paymentStatus, function ($query, $paymentStatus) {
        //         $query->where('payment_status', $paymentStatus);
        //     });

        // if ($direction === 'desc') {
        //     $query->orderBy($sort, 'desc');
        // } else {
        //     $query->orderBy($sort, 'asc');
        // }

        // $orders = $query->paginate($perPage)->withQueryString();
        // // dd('orders', $orders);
        // // Transform the data for the frontend
        // $orders->getCollection()->transform(function ($order) {
        //     // return [
        //     //     'id' => $order->id,
        //     //     'order_number' => $order->order_number,
        //     //     'customer_name' => $order->billing_full_name,
        //     //     'customer_email' => $order->billing_email,
        //     //     'total_price' => $order->total_price,
        //     //     'status' => $order->status,
        //     //     'payment_status' => $order->payment_status,
        //     //     'payment_method' => $order->payment_method,
        //     //     'created_at' => $order->created_at->format('Y-m-d H:i:s'),
        //     //     'items_count' => $order->orderItems->count(),
        //     // ];
        //     return $order;
        // });

        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');
        $status = $request->input('status', '');
        $paymentStatus = $request->input('payment_status', '');

        $vendor = auth()->user()->vendor;

        $query = OrderItem::with(['product', 'order.user'])
            ->whereHas('product', function ($q) use ($vendor) {
                $q->where('vendor_id', $vendor->id);
            })
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->whereHas('order', function ($orderQuery) use ($search) {
                        $orderQuery->where('order_number', 'like', '%' . $search . '%')
                            ->orWhere('billing_first_name', 'like', '%' . $search . '%')
                            ->orWhere('billing_last_name', 'like', '%' . $search . '%')
                            ->orWhere('billing_email', 'like', '%' . $search . '%')
                            ->orWhereHas('user', function ($userQuery) use ($search) {
                                $userQuery->where('name', 'like', '%' . $search . '%')
                                    ->orWhere('email', 'like', '%' . $search . '%');
                            });
                    });
                });
            })
            ->when($status, function ($query, $status) {
                $query->whereHas('order', function ($orderQuery) use ($status) {
                    $orderQuery->where('status', $status);
                });
            })
            ->when($paymentStatus, function ($query, $paymentStatus) {
                $query->whereHas('order', function ($orderQuery) use ($paymentStatus) {
                    $orderQuery->where('payment_status', $paymentStatus);
                });
            });

        $query->orderBy($sort, $direction);

        $orderItems = $query->paginate($perPage)->withQueryString();

        $orderItems->getCollection()->transform(function ($item) {
            // You can customize this transformation as needed
            return [
                'id' => $item->id,
                'product_name' => $item->product ? $item->product->name : 'N/A',
                'quantity' => $item->quantity,
                'unit_price' => $item->unit_price,
                'total_price' => $item->total_price,
                'order' => [
                    'id' => $item->order->id,
                    'order_number' => $item->order->order_number,
                    'status' => $item->order->status,
                    'payment_status' => $item->order->payment_status,
                    'payment_method' => $item->order->payment_method,
                    'created_at' => $item->order->created_at->format('Y-m-d H:i:s'),
                    'user' => [
                        'id' => $item->order->user ? $item->order->user->id : null,
                        'name' => $item->order->user ? $item->order->user->name : 'Guest',
                        'email' => $item->order->user ? $item->order->user->email : null,
                    ],
                ],
            ];
        });

        return Inertia::render('Ecommerce/Vendor/Orders/Index', [
            'order_items' => $orderItems,
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
                'delete' => false,
                // 'view' => true,
            ]
        ]);
    }

    // public function show(OrderItem $order): Response
    // {
    //     dd($order);
    //     $order->load([ 'orderItems.product.brand', 'orderItems.product.category']);
    //      dd($order);
    //     return Inertia::render('Ecommerce/Vendor/Orders/Show', [
    //         'order' => new OrderResource($order)
    //     ]);
    // }

    public function show(Order $order): Response
{
    // Get the logged-in vendor
    // $vendorId = auth()->id();
$vendor = auth()->user()->vendor;
  $vendorId = $vendor->id;
  dd($vendorId);
    // Load only this vendor’s order items and related product info
    $order->load([
        'user', // The buyer
        'orderItems' => function ($query) use ($vendorId) {
            $query->whereHas('product', function ($q) use ($vendorId) {
                $q->where('vendor_id', $vendorId);
            })->with([
                'product.brand',
                'product.category',
                'product.vendor.user', // Optional, if you want vendor’s user info too
            ]);
        },
    ]);


    return Inertia::render('Ecommerce/Vendor/Orders/Show', [
        'order' => new OrderResource($order),
    ]);
}


//     public function show(OrderItem $order): Response
// {
//     $vendor = auth()->user()->vendor;
//     $vendorId = $vendor->id;
//     // dd($order);
//     // $order->load([
//     //     // 'user',
//     //     'orderItems' => function ($query) use ($vendorId) {
//     //         $query->whereHas('product', function ($q) use ($vendorId) {
//     //             $q->where('vendor_id', $vendorId);
//     //         })->with(['product.brand', 'product.category']);
//     //     }
//     // ]);
//     dd($order);
//     $order->load([
//         // 'user',
//         'product' => function ($query) use ($vendorId) {
//             $query->whereHas('product', function ($q) use ($vendorId) {
//                 $q->where('vendor_id', $vendorId);
//             })->with(['product.brand', 'product.category']);
//         }
//     ]);
//     return Inertia::render('Ecommerce/Vendor/Orders/Show', [
//         'order' => new OrderResource($order)
//     ]);
// }


    public function update(Request $request, Order $order): RedirectResponse
    {
        $request->validate([
            'status' => 'required|string|in:pending,confirmed,preparing,ready_for_pickup,out_for_delivery,delivered,completed,cancelled',
            'payment_status' => 'nullable|string|in:pending,paid,failed,refunded',
            'tracking_number' => 'nullable|string|max:255',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        try {
            $oldStatus = $order->status;
            $newStatus = $request->status;

            // Update order
            $order->update([
                'status' => $newStatus,
                'payment_status' => $request->payment_status ?? $order->payment_status,
                'tracking_number' => $request->tracking_number ?? $order->tracking_number,
                'admin_notes' => $request->admin_notes ?? $order->admin_notes,
            ]);

            // Update timestamps based on status
            if ($newStatus === 'delivered' && $oldStatus !== 'delivered') {
                $order->update(['delivered_at' => now()]);
            } elseif ($newStatus === 'out_for_delivery' && $oldStatus !== 'out_for_delivery') {
                $order->update(['shipped_at' => now()]);
            }

            // Handle inventory updates for cancelled orders
            if ($newStatus === 'cancelled' && $oldStatus !== 'cancelled') {
                foreach ($order->orderItems as $item) {
                    if ($item->product) {
                        // For now, we'll just log this. You might want to implement
                        // more sophisticated inventory management
                        Log::info("Order cancelled - product {$item->product->name} quantity {$item->quantity} should be returned to inventory");
                    }
                }
            }

            return redirect()->back()->with('success', 'Order updated successfully');
        } catch (\Exception $e) {
            Log::error('Order update failed: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update order. Please try again.');
        }
    }

    public function destroy(Order $order): RedirectResponse
    {
        try {
            $order->delete();
            return redirect()->route('vendor.orders.index')->with('success', 'Order deleted successfully');
        } catch (\Exception $e) {
            Log::error('Order deletion failed: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete order. Please try again.');
        }
    }
}
