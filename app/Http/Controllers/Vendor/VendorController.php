<?php

namespace App\Http\Controllers\Vendor;
use App\Http\Controllers\Controller;
use App\Models\Vendor;
use App\Models\Product;
use App\Models\OrderItem;
use App\Models\Order;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
        $vendorId = auth()->user()->vendor->id;
        
        $vendor = Vendor::findOrFail($vendorId);
      

        
        $stats = [
            'total_products' =>$vendor->products()->count(),
            'total_order' => $vendor->orderItems()->with(['product', 'order'])->count(),
            'total_sales' => $vendor->orderItems()->sum('total_price'),
            // 'pending_orders' => Order::where('user_id', $user->id)->where('status', 'pending')->count(),
        ];
        
        // Get all order items for this vendor
        // $orderItems = $vendor->orderItems()->limit(5)->get();
        // Optionally eager load product details
        
        // $orderItems = $vendor->orderItems()->with('product')->get();
        //  dd('venorder order', $orderItems);

        // eager load both product and order
        $orderItems = $vendor->orderItems()->with(['product', 'order'])->limit(4)->get();
        $products = $vendor->products()->with('category')->limit(5)->get();
        //   dd('vendor products', $products);  

        return Inertia::render('Ecommerce/Vendor/dashboard', [
            'stats' => $stats,
            'order_items' => $orderItems,
            'products' => $products,
            'vendor' => $vendor,
        ]);
    }

    // Todo: vendor plan upgrade
     public function upgrade()
    {
        $vendor = auth()->user()->vendor;
        $email = auth()->user()->email;

        return Inertia::render('Ecommerce/Vendor/upgrade-plan', [
            'vendor' => $vendor,
            'email' => $email,
        ]);
    }

    //TODO: process vendor plan upgrade
    public function processUpgrade(Request $request)
    {
        $vendor = auth()->user()->vendor;

        // Simulate payment success (replace with Paystack, Stripe, etc.)
        $vendor->update(['plan' => 'paid']);

        return redirect()->route('vendor.products.index')->with('success', 'Your plan has been upgraded successfully!');
    }


    public function profile()
    {

        $vendor = auth()->user()->vendor;
        // dd('vendor profile', $vendor);
        return Inertia::render('Ecommerce/Vendor/profile', [
            'vendor' => $vendor,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Ecommerce/Vendor/register');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Vendor $vendor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vendor $vendor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vendor $vendor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vendor $vendor)
    {
        //
    }
}
