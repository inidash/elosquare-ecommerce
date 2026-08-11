<?php

namespace App\Http\Controllers\Vendor;

use App\Models\cr;
use App\Models\VendorSubscription;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\VendorPlanUpgradedMail;
use App\Mail\AdminVendorUpgradeNotification;
use App\Models\Vendor;

class VendorPlanSubscription extends Controller

{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $vendor = auth()->user()->vendor;
        $subscriptions = VendorSubscription::where('vendor_id', $vendor->id)->get();

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

        
        $paymentMethod = $request->input('payment_method');
        // Validate and process the payment here
        $request->validate([
            'payment_method' => 'required|string',
            'amount' => 'required|numeric|min:1',
            // 'description' => 'required|string',
            // 'email' => 'required|email',

        ]);

         $paymentData = [
            'amount' => $request->input('amount') * 100, // in kobo
            'currency' => 'NGN',
            'description' => $request->input('description'),
            'email' => $request->input('email'),
            'callback_url' => route('vendor.upgrade-callback'),
            'metadata' => json_encode([
                'vendor_id' => $vendor->id,
                'description' => $request->input('description'),
                'amount' => $request->input('amount'),
            ]),
        ];
        // dd($paymentData);
         // Initialize Paystack payment
       $url = "https://api.paystack.co/transaction/initialize";

        $fields_string = http_build_query($paymentData);

        //open connection
        if ($paymentMethod === 'paystack') {
            // Paystack payment processing
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $headers = [
                'Authorization: Bearer ' . env('PAYSTACK_SECRET_KEY'),
                'Cache-Control: no-cache',
            ];
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

            $response = curl_exec($ch);
            $err = curl_error($ch);
            curl_close($ch);

            if ($err) {
                Log::error('cURL Error #: ' . $err);
                return back()->with('error', 'Payment initialization failed. Please try again.');
                
            } else {
                
                $result = json_decode($response, true);
                if (!$result['status']) {
                    Log::error('Paystack Error: ' . $result['message']);
                    return back()->with('error', 'Payment initialization failed: ' . $result['message']);
                }
                // Redirect to Paystack payment page
                // return redirect($result['data']['authorization_url']);

                return response()->json([
                        'status' => true,
                        'authorization_url' => $result['data']['authorization_url']
                    ]);

            }
        }   else {
            // For 'card' and 'cod', we proceed to create the order directly
            // return $this->createOrder($request, $cartService);
        }

        // Simulate payment success (replace with Paystack, Stripe, etc.)
        $vendor->update(['plan' => $request->input('description')]);

        return redirect()->route('vendor.products.index')->with('success', 'Your plan has been upgraded successfully!');
    }


    public function processPaymentCallback(Request $request)
    {
        // Handle payment gateway callback here
        $reference = $request->query('reference');
        // $amount = $request->query('amount');
        // $description = $request->query('description');


        // Verify payment with Paystack
        $url = "https://api.paystack.co/transaction/verify/" . rawurlencode($reference);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $headers = [
            'Authorization: Bearer ' . env('PAYSTACK_SECRET_KEY'),
            'Cache-Control: no-cache',
        ];
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);

        if ($err) {
            Log::error('cURL Error #: ' . $err);
            return redirect()->route('vendor.upgrade.plan')->with('error', 'Payment verification failed. Please try again.');
        } else {
            $result = json_decode($response, true);
            if ($result['data']['status'] === 'success') {

                // Payment was successful
                $metadata = $result['data']['metadata'] ?? [];
                //  dd($metadata);
                $vendorId = $metadata['vendor_id'] ?? null;
                $description = $metadata['description'] ?? null;
                $amount = $metadata['amount'] ?? null;
                if (!$vendorId) {
                    return redirect()->route('vendor.upgrade.plan')->with('error', 'Invalid payment metadata. Please contact support.');
                }
                $vendor = Vendor::find($vendorId);
                if (!$vendor) {
                    return redirect()->route('vendor.upgrade.plan')->with('error', 'Vendor not found.');
                }
              
                if($vendor->vendor_status !== 'Approved'){
                    $vendor->update(['vendor_status' => 'Approved']);
                    // onetime payment subscription record
                    if($amount == 100000){
                        // dd($amount);
                        $description = 'Lifetime Plan';
                        $vendor->update(['vendor_plan' => $description]);
                          $vendor->subscriptions()->create([
                            'vendor_id' => $vendorId,
                            'reference' => $result['data']['reference'],
                            'subscription_plan' => $description,
                            'subscription_price' => $amount,
                            'subscription_duration' => 'lifetime',
                            'subscription_status' => 'active',
                            // 'subscription_renewal_date' => now()->addYear(),
                            'subscription_start_date' => now(),
                            // 'subscription_end_date' => now()->addYear(),
                        ]);
                        $plan = $description;
                        $amount = $amount;
                        
                        Mail::to(auth()->user()->email)->send(new VendorPlanUpgradedMail($vendor,$plan, $amount));

                        Mail::to(env('ADMIN_EMAIL'))->send(new AdminVendorUpgradeNotification($vendor,$plan, $amount));

                        return redirect()->route('vendor.products.index')->with('success', 'Your plan has been upgraded successfully!');
                   

                    } else {

                        // duration based subscription record
                        $description = 'Per product plan';
                        $vendor->update(['vendor_plan' => $description]);
                        $vendor->subscriptions()->create([
                            'vendor_id' => $vendorId,
                            'reference' => $result['data']['reference'],
                            'subscription_plan' => $description,
                            'subscription_price' => $amount,
                            'subscription_duration' => '1',
                            'subscription_status' => 'active',
                            'subscription_renewal_date' => now()->addYear(),
                            'subscription_start_date' => now(),
                            'subscription_end_date' => now()->addYear(),
                        ]);
                        $plan = $description;
                        $amount = $amount;
                        
                        Mail::to(auth()->user()->email)->send(new VendorPlanUpgradedMail($vendor,$plan, $amount));
        
                        Mail::to(env('ADMIN_EMAIL'))->send(new AdminVendorUpgradeNotification($vendor,$plan, $amount));
        
                        return redirect()->route('vendor.products.index')->with('success', 'Your plan has been upgraded successfully!');
                    }
                } else {
                    // onetime payment subscription record
                    if($amount == 100000){
                        // dd($amount);
                        $description = 'Lifetime Plan';
                        $vendor->update(['vendor_plan' => $description]);
                          $vendor->subscriptions()->create([
                            'vendor_id' => $vendorId,
                            'reference' => $result['data']['reference'],
                            'subscription_plan' => $description,
                            'subscription_price' => $amount,
                            'subscription_duration' => 'lifetime',
                            'subscription_status' => 'active',
                            // 'subscription_renewal_date' => now()->addYear(),
                            'subscription_start_date' => now(),
                            // 'subscription_end_date' => now()->addYear(),
                        ]);
                        $plan = $description;
                        $amount = $amount;
                        
                        Mail::to(auth()->user()->email)->send(new VendorPlanUpgradedMail($vendor,$plan, $amount));

                        // Mail::to(env('ADMIN_EMAIL'))->send(new AdminVendorUpgradeNotification($vendor,$plan, $amount));

                        return redirect()->route('vendor.products.index')->with('success', 'Your plan has been upgraded successfully!');
                   

                    } else {

                        // duration based subscription record
                        $description = 'Per product plan';
                        $vendor->update(['vendor_plan' => $description]);
                        $vendor->subscriptions()->create([
                            'vendor_id' => $vendorId,
                            'reference' => $result['data']['reference'],
                            'subscription_plan' => $description,
                            'subscription_price' => $amount,
                            'subscription_duration' => '1',
                            'subscription_status' => 'active',
                            'subscription_renewal_date' => now()->addYear(),
                            'subscription_start_date' => now(),
                            'subscription_end_date' => now()->addYear(),
                        ]);
                        $plan = $description;
                        $amount = $amount;
                        
                        Mail::to(auth()->user()->email)->send(new VendorPlanUpgradedMail($vendor,$plan, $amount));
        
                        // Mail::to(env('ADMIN_EMAIL'))->send(new AdminVendorUpgradeNotification($vendor,$plan, $amount));
        
                        return redirect()->route('vendor.products.index')->with('success', 'Your plan has been upgraded successfully!');
                    }
                }

            } else {
                return redirect()->route('vendor.upgrade.plan')->with('error', 'Payment was not successful. Please try again.');
            }
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $vendor = auth()->user()->vendor;

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
    public function show(cr $cr)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(cr $cr)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, cr $cr)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(cr $cr)
    {
        //
    }
}
