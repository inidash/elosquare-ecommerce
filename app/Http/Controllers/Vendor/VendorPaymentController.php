<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\VendorPayment;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VendorPaymentController extends Controller
{
    public function index()
    {
        $vendor = auth()->user()->vendor;
       
        $payments = $vendor->payments()->latest()->get();
         
        return Inertia::render('Ecommerce/Vendor/Payments/payments', [
             'payments' => $payments
        ]);
    }
}
