<?php

namespace App\Http\Controllers;

// use App\Http\Controllers\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Vendor;
use App\Http\Requests\VendorStoreRequest;
use App\Http\Requests\VendorUpdateRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use Inertia\Response;
use App\Models\OrderItem;
use App\Models\Order;

class VendorDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    //    $user = Auth::user();
    // $vendor = Vendor::where('user_id', $user->id)->first();
    $vendorId = auth()->id();
    // dd('vendor id', $vendorId);
        
        $vendor = Vendor::where('user_id', auth()->id())->first();
        //dd('vendor dash', $vendor);
         $vendorId = $vendor->id;
        //  dd('vendor id', $vendorId);


      
        $stats = [
        'total_products' => $vendor->products()->count(),
        'total_order' => $vendor->orderItems()->with(['product', 'order'])->count(),
    ];
    dd('stats', $stats);
    // Get all order items for this vendor
     $orderItems = $vendor->orderItems()->with(['product', 'order'])->limit(4)->get();
    $products = $vendor->products()->with('category')->limit(5)->get();
        
        // $stats = [
        //     'total_products' =>Product::where('vendor_id', $vendorId)->count(),
        //     'total_order' => $vendor->orderItems()->with(['product', 'order'])->count(),
        //     'pending_orders' => Order::where('user_id', $user->id)->where('status', 'pending')->count(),
        // ];
        // Get all order items for this vendor
        // $orderItems = $vendor->orderItems()->limit(5)->get();
        // Optionally eager load product details
        
        // $orderItems = $vendor->orderItems()->with('product')->get();
        //  dd('venorder order', $orderItems);

        // eager load both product and order
        // $orderItems = $vendor->orderItems()->with(['product', 'order'])->limit(4)->get();
        // $products = $vendor->products()->with('category')->limit(5)->get();
        //   dd('vendor products', $products); 

    return Inertia::render('Ecommerce/Vendor/dashboard', [
        'stats' => $stats,
        'order_items' => $orderItems,
        'products' => $products,
    ]);
    }


    public function profile()
    {

        $vendor = auth()->user()->vendor;
        // dd('vendor profile', $vendor);
        return Inertia::render('Ecommerce/Vendor/profile', [
            'vendor' => $vendor,
        ]);
    }

    // public function accountDetails()
    // {
    //     $vendor = auth()->user()->vendor; 
    //     $account = $vendor->accountDetail;
        
    //     return Inertia::render('Ecommerce/Vendor/account-details', [
    //         'vendor' => $vendor,
    //         'account' => $account,
    //     ]);
    // }

    // public function payment()
    // {
    //     return Inertia::render('Ecommerce/Vendor/payment', [
    //         'vendor' => auth()->user()->vendor,
    //     ]);
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       
        // return Inertia::render('Ecommerce/Vendor/register');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VendorStoreRequest $request): RedirectResponse
    {
        //
        
    // Update the user role to vendor
   

       $data = $request->validated();
    $data['user_id'] = Auth::id();

    // Prevent duplicate vendor for the same user
    if (Vendor::where('user_id', Auth::id())->exists()) {
        return redirect()->route('vendor.dashboard');
    }

    // Create vendor correctly
    $vendor = Vendor::create($data);

    // Update user role
    $user = Auth::user();
    $user->role = 'vendor';
    $user->save();
    dd(Auth::user()->role);

    return redirect()->route('vendor.dashboard')
                     ->with('success', 'Welcome aboard! Your vendor account has been created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
