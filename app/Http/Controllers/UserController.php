<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Vendor;
// use App\Http\Requests\VendorStoreRequest;
use App\Http\Requests\VendorUpdateRequest;
use App\Http\Requests\VendorStoreRequest;
use App\Mail\VendorWelcomeMessage;
use Illuminate\Support\Facades\Mail;
// use App\Http\Controllers\RedirectResponse;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\OrderResource;
use App\Mail\OrderCancelledUserMail;
use App\Mail\OrderCancelledVendorMail;
use App\Mail\OrderCancelledAdminMail;
use App\Mail\AdminNewVendorNotification;



class UserController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();

        // get users order
        $recentOrders = Order::where('user_id', $user->id)
        ->with(['orderItems.product'])
        ->orderBy('created_at', 'desc')
        ->limit(5)
        ->get()
        ->map(function ($order) {
            return [
                'id' => $order->order_number,
                'status' => $order->status,
                'payment_status' =>$order->payment_status,
                'total_price' => $order->total_price,
                'created_at' => $order->created_at->format('M-d-Y'),
                'items_count' =>$order->orderItems->count(),
            ];
        });
 
        // order stats
        $orderStats = [
            'total_order' =>Order::where('user_id', $user->id)->count(),
            'completed' => Order::where('user_id', $user->id)->where('status', 'completed')->count(),
            'pending' => Order::where('user_id', $user->id)->where('status', 'pending')->count(),
        ];
         $billing_address = Order::where('user_id', $user->id)->limit(1)->get();
        // $billingaddress = Order::get()->where('user_id', $user->id);
        // dd('billing address', $billingaddress);

        // wishlist
        // $wishList = Cart::where('user_id', $user->id)->where('save_for_later', true)->count();

        //user address
        $useraddress = [
            'name'=> $user->name,
            'email'=> $user->email,
            'phone'=> $user->phone,
            'address'=> $user->address,
            'avarta'=> $user->avarta,
        ];
        return Inertia::render('Ecommerce/User/Dashboard', [
            'user' => [
                'id' =>$user->id,
                'name'=> $user->name,
                'email'=> $user->email,
                'phone'=> $user->phone,
                'address'=> $user->address,
                'avarta'=> $user->avarta,
            ],
            'dashboardData' => [
                'recentOrders' => $recentOrders,
                'orderStats' => $orderStats,
                // 'wishList' => $wishList,
                'userAddress' =>$useraddress,
                'billingAddress' =>$billing_address,
            ],
        ]);
    }

    public function registerVendor(Request $request)
    {
        $user = Auth::user();
        if (Vendor::where('user_id', $user->id)->exists()) {
            return redirect()->route('vendor.dashboard');
        }
        return Inertia::render('Ecommerce/User/register-vendor');
    }

    public function storeVendor(VendorStoreRequest $request): RedirectResponse
    {
        // dd('controller reached', $request->all());
        $user = Auth::user();

        // Prevent duplicate vendor entries
        if (Vendor::where('user_id', $user->id)->exists()) {
            return redirect()->route('ecommerce.vendor.dashboard');
        }

        // Create vendor record
        $data = $request->validated();
        $data['user_id'] = $user->id;
        // $data['user_id'] = auth()->id(); // automatically assign current logged-in user
        $data['vendor_status'] = 'Pending';
        // dd('data', $data);
        Vendor::create($data);

         $user = Auth::user();
        $user->role = 'vendor';
        $user->save();
        $vendorId = auth()->user()->vendor->id;
        
        $vendor = Vendor::findOrFail($vendorId);

        $VendorEmail = $user->email;
        
        // dd($user->role, $user->wasChanged('role'));
        // // Update user role
        // $user->role = 'vendor';
        // $user->save();
        Mail::to($user->email)->send(new VendorWelcomeMessage($vendor));

        // admin email
        $adminEmail = config('mail.admin.address');
        Mail::to($adminEmail)->send(new AdminNewVendorNotification($vendor));

        return redirect()->route('vendor.dashboard')
                        ->with('success', 'Welcome aboard! Your vendor account has been created.');
    }

    public function orders(Request $request) {

        $user = Auth::user();

         $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');
        $status = $request->input('status', '');
        $paymentStatus = $request->input('payment_status', '');
         
        // get users order
        $recentOrders = Order::with(['user', 'orderItems.product'])
    ->where('user_id', auth()->id())
        
        // ->with(['orderItems.product'])
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
            $recentOrders->orderBy($sort, 'desc');
        } else {
            $recentOrders->orderBy($sort, 'asc');
        }

        $orders = $recentOrders->paginate($perPage)->withQueryString();
    
        // Transform the data for the frontend
        $orders->getCollection()->transform(function ($order) {
            // dd('order to orderitems',$order->orderItems);
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
        // ->orderBy('created_at', 'desc')
        // ->get()
        // ->map(function ($order) {
        //     return [
        //         'id' => $order->id,
        //         'order_number' => $order->order_number,
        //         'status' => $order->status,
        //         'payment_status' =>$order->payment_status,
        //         'payment_method' => $order->payment_method,
        //         'total_price' => $order->total_price,
        //         'created_at' => $order->created_at->format('M-d-Y'),
        //         'items_count' =>$order->orderItems->count(),
        //     ];
        // });
        // order stats
        $orderStats = [
            'total_order' =>Order::where('user_id', $user->id)->count(),
            'completed_order' => Order::where('user_id', $user->id)->where('status', 'completed')->count(),
            'pending_orders' => Order::where('user_id', $user->id)->where('status', 'pending')->count(),
        ];

        // wishlist
        // $wishList = Cart::where('user_id', $user->id)->where('save_for_later', true)->count();

        return Inertia::render('Ecommerce/User/Order/index', [
            'user' => [
                'id' =>$user->id,
                'name'=> $user->name,
                'email'=> $user->email,
                'phone'=> $user->phone,
                'address'=> $user->address,
                
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
                'edit' => false,
                'delete' => false
            ],
                // 'recentOrders' => $recentOrders,
                'orderStats' => $orderStats,

        ]);
    }


    public function orderDetails(Order $order): Response
{
    // Only allow the owner of the order
    if ($order->user_id !== auth()->id()) {
        abort(403, 'Unauthorized');
    }

    $user = Auth::user();
    $order->load(['user','orderItems.product.brand', 'orderItems.product.category']);
    // dd('order details', $order);
    return Inertia::render('Ecommerce/User/Order/order-details', [
        'order' => new OrderResource($order),
    ]);
}

    public function cancelOrder($id)
    {
        $order = Order::with('orderItems.product')->findOrFail($id);
        // dd('order', $order);
        // restore stock
        foreach ($order->orderItems as $item) {
            $product = $item->product;
            $product->quantity += $item->quantity;
            $product->save();
        }

        // only refund if it was paid online
        // if ($order->payment_method === 'paystack' && $order->payment_status === 'paid') {

        //     $refund = $this->refundPaystackPayment($order->transaction_reference);

        //     if (isset($refund['status']) && $refund['status'] == true) {
        //         $order->status = 'cancelled';
        //         $order->refund_status = 'refunded';
        //         $order->save();

        //         return back()->with('success', 'Order cancelled and refund processed successfully');
        //     } else {
        //         return back()->with('error', 'Refund failed: ' . ($refund['message'] ?? 'Unable to process refund'));
        //     }
        // }

        // if unpaid or cash on delivery
        $order->status = 'cancelled';
        $order->save();

         /**
     *  SENDING EMAILS ON ORDER CANCELLATION
     */

    // 1. Send to user
    \Log::info("Sending User email to: " . $order->user->email);
    Mail::to($order->user->email)->send(new OrderCancelledUserMail($order));

    // 2. Send to each vendor whose product was in the order
   
    foreach ($order->orderItems as $item) {
        $vendorEmail = $item->product->vendor->user->email ?? null;

        if ($vendorEmail) {
            \Log::info("Sending Vendor email to: " . $vendorEmail);
            Mail::to($vendorEmail)->send(new OrderCancelledVendorMail($item));
        }
    }

    // 3. Send to admin(s)
    // $admins = ['admin@example.com', 'support@example.com']; // add more if needed
    $adminEmail = config('mail.admin.address');
    \Log::info("Sending Admin email to: " . $adminEmail);
    Mail::to($adminEmail)->send(new OrderCancelledAdminMail($order));
        return back()->with('success', 'Order cancelled successfully');
    }

    public function address() {

        $user = Auth::user();
         //user address
        $useraddress = [
            'name'=> $user->name,
            'email'=> $user->email,
            'phone'=> $user->phone,
            'aaddress'=> $user->address,
            'avarta'=> $user->avarta,
        ];
        // get user billing address from orders
        $billing_address = Order::where('user_id', $user->id)->limit(1)->get();
        
        return Inertia::render('Ecommerce/User/address/address', [
            'user_address' => $useraddress,
            'billing_data' =>$billing_address,
        ]);
    }

    public function profile(){
         $user = Auth::user();
         //user address
        $useraddress = [
            'name'=> $user->name,
            'email'=> $user->email,
            'phone'=> $user->phone,
            'address'=> $user->address,
            'avarta'=> $user->avarta,
        ];

        return Inertia::render('Ecommerce/User/Profile/index', [
            'user_profile' => $useraddress,
        ]);
    }

}
