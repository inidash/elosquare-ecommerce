<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Mail\BuyerOrderConfirmationMail;
use App\Mail\VendorOrderNotificationMail;
use App\Mail\AdminNewOrderMail;
use App\Mail\LowStockAlertMail;
use App\Mail\OrderConfirmationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;

class CartController extends Controller
{
    public function index(CartService $cartService)
    {
        return Inertia::render(
            'Ecommerce/Cart',
            [
                'cartItems' => $cartService->getCartItems(),
            ]
        );
    }

    public function store(Request $request, Product $product, CartService $cartService)
    {
        $request->mergeIfMissing((['quantity' => 1]));

        $data = $request->validate([
            'option_ids' => ['nullable', 'array'],
            'quantity' => ['nullable', 'integer', 'min:1'],
        ]);
        $cartService->addItemCart($product, $data['quantity'], $data['option_ids']);

        return back()->with('success', 'Item added to cart successfully.');
    }

    public function update(Request $request, Product $product, CartService $cartService)
    {
        $request->validate([
            'quantity' => ['integer', 'min:1']
        ]);

        $optionIds = $request->input('option_ids') ?: [];
        $quantity = $request->input('quantity');
        $cartService->updateItemQuantity($product->id, $quantity, $optionIds);

        return back()->with('success', 'Item quantity updated successfully.');
    }

    public function destroy(Request $request, Product $product, CartService $cartService)
    {
        $optionIds = $request->input('option_ids') ?: [];
        $cartService->removeItemFromCart($product->id, $optionIds);

        return back()->with('success', 'Item removed from cart successfully.');
    }

    public function checkoutForm(CartService $cartService)
    {
        // Ensure user is authenticated
        $user = auth()->user();
        if (!$user) {
            return redirect()->route('login')->with('error', 'Please log in to proceed to checkout.');
        }
        // Check if cart is empty
        $cartItems = $cartService->getCartItems();
        if (empty($cartItems)) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        // Get existing checkout data from session if available
        $billingData = session('checkout.billing', []);
        $shippingData = session('checkout.shipping', []);

        // Determine if shipping is same as billing
        $sameAsBilling = empty($shippingData) ||
            ($billingData && $shippingData &&
                $billingData['first_name'] === $shippingData['first_name'] &&
                $billingData['last_name'] === $shippingData['last_name'] &&
                $billingData['email'] === $shippingData['email'] &&
                $billingData['phone'] === $shippingData['phone'] &&
                $billingData['address'] === $shippingData['address'] &&
                $billingData['city'] === $shippingData['city'] &&
                $billingData['state'] === $shippingData['state'] &&
                $billingData['zip'] === $shippingData['zip'] 
            );

        return Inertia::render('Ecommerce/Checkout', [
            'cartItems' => $cartItems,
            'totalQuantity' => $cartService->getTotalQuantity(),
            'totalPrice' => $cartService->getTotalPrice(),
            'subtotal' => $cartService->getSubTotal(),
            'shipping' => 0,
            'tax' => 0,
            'billingData' => $billingData,
            'shippingData' => $shippingData,
            'sameAsBilling' => $sameAsBilling,
        ]);
    }

    // Show payment form
    public function paymentForm(CartService $cartService)
    {
        // Check if billing information exists in session
        if (!session('checkout.billing')) {
            return redirect()->route('checkout')->with('error', 'Please complete billing information first.');
        }

        //check cart empty
        if ($cartService->getTotalQuantity() == 0) {
            return redirect()->route('cart')->with('error', 'Your cart is empty.');
        }

        return Inertia::render('Ecommerce/Payment', [
            'cartItems' => $cartService->getCartItems(),
            'totalPrice' => $cartService->getTotalPrice(),
            'totalQuantity' => $cartService->getTotalQuantity(),
            'subtotal' => $cartService->getSubTotal(),
            'shipping' => 0,
            'tax' => 0,
            'billing' => session('checkout.billing'),
            'shipping' => session('checkout.shipping'),
        ]);
    }

    public function processCheckout(Request $request, CartService $cartService)
    {
        // Validate billing information
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip' => 'required|string|max:20',
            
            'notes' => 'nullable|string|max:1000',
            // Shipping fields - make them required since we're copying from billing
            'shipping_first_name' => 'required|string|max:255',
            'shipping_last_name' => 'required|string|max:255',
            'shipping_email' => 'required|email|max:255',
            'shipping_phone' => 'required|string|max:20',
            'shipping_address' => 'required|string|max:500',
            'shipping_city' => 'required|string|max:255',
            'shipping_state' => 'required|string|max:255',
            'shipping_zip' => 'required|string|max:20',
            
        ]);

        // Store billing/shipping info in session for payment page
        session([
            'checkout.billing' => [
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'city' => $validated['city'],
                'state' => $validated['state'],
                'zip' => $validated['zip'],
               
                'notes' => $validated['notes'] ?? '',
            ],
            'checkout.shipping' => [
                'first_name' => $validated['shipping_first_name'],
                'last_name' => $validated['shipping_last_name'],
                'email' => $validated['shipping_email'],
                'phone' => $validated['shipping_phone'],
                'address' => $validated['shipping_address'],
                'city' => $validated['shipping_city'],
                'state' => $validated['shipping_state'],
                'zip' => $validated['shipping_zip'],
                
            ]
        ]);

        // Redirect to payment page
        return redirect()->route('payment');
    }

    

    public function processPayment(Request $request, CartService $cartService)
    {
        // Check if billing information exists in session
         Log::info('Billing Session:', [session('checkout.billing')]);
        if (!session('checkout.billing')) {
            return redirect()->route('checkout')->with('error', 'Please complete billing information first.');
        }
        $request->validate([
            'payment_method' => 'required|string|in:card,paystack,cod',
        ]);

        $paymentMethod = $request->payment_method;
        $paymentData = [
            'amount' => $cartService->getTotalPrice() * 100, // in kobo
            'currency' => 'NGN',
            'description' => 'Payment for order',
            'email' => session('checkout.billing.email'),
            'callback_url' => route('callback', ['order' => 'ORDER_ID_PLACEHOLDER']),
        ];
        // Initialize Paystack payment
       $url = "https://api.paystack.co/transaction/initialize";

        $fields_string = http_build_query($paymentData);

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
            try {
                
                DB::beginTransaction();
    
                $billingData = session('checkout.billing');
                $shippingData = session('checkout.shipping');
                $cartItems = $cartService->getCartItems();
    
                if (empty($cartItems)) {
                    return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
                }
    
                // Create the order
                $order = Order::create([
                    'order_number' => Order::generateOrderNumber(),
                    'user_id' => auth()->id(),
                    'payment_method' => $request->payment_method,
                    'payment_status' => 'pending',
                    'status' => 'pending',
                    'subtotal' => $cartService->getSubTotal(),
                    'tax_amount' => 0, // You can calculate tax based on your business logic
                    'shipping_amount' => 0, // You can calculate shipping based on your business logic
                    'discount_amount' => 0,
                    'total_price' => $cartService->getTotalPrice(),
                    'billing_first_name' => $billingData['first_name'],
                    'billing_last_name' => $billingData['last_name'],
                    'billing_email' => $billingData['email'],
                    'billing_phone' => $billingData['phone'],
                    'billing_address' => $billingData['address'],
                    'billing_city' => $billingData['city'],
                    'billing_state' => $billingData['state'],
                    'billing_zip' => $billingData['zip'],
                    
                    'shipping_first_name' => $shippingData['first_name'],
                    'shipping_last_name' => $shippingData['last_name'],
                    'shipping_address' => $shippingData['address'],
                    'shipping_city' => $shippingData['city'],
                    'shipping_state' => $shippingData['state'],
                    'shipping_zip' => $shippingData['zip'],
                    
                    'customer_notes' => $billingData['notes'] ?? null,
                ]);
    
                // Create order items
                foreach ($cartItems as $cartItem) {
                    $product = Product::find($cartItem['product_id']);
    
                    if (!$product) {
                        continue;
                    }
    
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'product_sku' => $product->sku,
                        'product_description' => $product->description,
                        'product_image' => $cartItem['image'],
                        'unit_price' => $cartItem['price'],
                        'total_price' => $cartItem['price'] * $cartItem['quantity'],
                        'quantity' => $cartItem['quantity'],
                        'variation_type_option_ids' => $cartItem['option_ids'] ?? [],
                        'variation_data' => $cartItem['options'] ?? [],
                    ]);
                }

                // create transactions
                 Transaction::create([
                            'user_id' => auth()->id(),
                            'vendor_id' => $product->vendor_id,
                            'product_id' => $product->id,
                            'amount' => $cartItem['price'] * $cartItem['quantity'],
                            'location' => $product->vendor->vendor_state ?? 'N/A',
                            'transaction_status' => 'completed',
                        ]);

                try {
                        $orderedQty = isset($cartItem['quantity']) ? intval($cartItem['quantity']) : 0;
                        if ($orderedQty <= 0) {
                            Log::warning("Invalid ordered quantity", ['product_id' => $product->id, 'orderedQty' => $orderedQty]);
                        
                        }

                        // Atomically decrement stock (ensures we don't go negative) and increment sales
                        // Use decrement/increment for safety and DB-level atomicity
                        $product->decrement('quantity', $orderedQty);
                        $product->increment('sales', $orderedQty);

                        if($cartItem['price'] > 10000){
                             // increase vendor and user points by 1
                            $vendor = $product->vendor;
                            $vendor->increment('points', 1);
                            $user = auth()->user();
                            $user->increment('points', 1);
                        }

                        // Refresh product model so $product->quantity is up-to-date
                        $product->refresh();

                        Log::info('Product updated after order', [
                            'product_id' => $product->id,
                            'new_quantity' => $product->quantity,
                            'new_sales' => $product->sales,
                            'ordered_qty' => $orderedQty,
                        ]);

                        // If stock is low (threshold you choose), notify vendor.
                        // Use queue() so email sending doesn't block request.
                        $lowStockThreshold = 2; // change as needed
                        if ($product->quantity <= $lowStockThreshold) {
                            $vendor = $product->vendor; // ensure relationship exists

                            if ($vendor && !empty($vendor->user->email)) {
                                // Queue the mail (requires queue driver; fallback to send if you haven't configured queues)
                                try {
                                    if (config('mail.use_queue', true)) {
                                        Mail::to($vendor->user->email)->queue(new LowStockAlertMail($vendor, $product));
                                    } else {
                                        Mail::to($vendor->user->email)->send(new LowStockAlertMail($vendor, $product));
                                    }

                                    Log::info('Low stock email queued/sent', [
                                        'product_id' => $product->id,
                                        'vendor_email' => $vendor->user->email,
                                        'quantity' => $product->quantity,
                                    ]);
                                } catch (\Exception $mailEx) {
                                    Log::error('Failed to send low-stock mail', [
                                        'error' => $mailEx->getMessage(),
                                        'product_id' => $product->id,
                                        'vendor_email' => $vendor->email ?? null,
                                    ]);
                                }
                            } else {
                                Log::warning('Vendor missing or vendor email missing for low stock alert', ['product_id' => $product->id]);
                            }
                        }
                    } catch (\Exception $e) {
                        // Log errors; don't break the whole order creation
                        Log::error('Error updating product stock/sales', [
                            'message' => $e->getMessage(),
                            'product_id' => $product->id ?? null,
                            'cartItem' => $cartItem,
                        ]);
                    }
    
                // Clear the cart
                $cartService->clearCart();
    
                // Clear session data
                session()->forget(['checkout.billing', 'checkout.shipping']);
    
                DB::commit();

                // Send to Buyer

                try {
                    $order->load('orderItems');
                    \Log::info("Attempting to send Buyer email to {$order->billing_email}");
                    Mail::to($order->billing_email)->send(new OrderConfirmationMail($order));
                    \Log::info("Buyer email successfully sent to {$order->billing_email}");
                } catch (\Exception $e) {
                    \Log::error("Failed to send Buyer mail", [
                        'email' => $order->billing_email,
                        'error' => $e->getMessage(),
                    ]);
                }

                // Send to Admin
                $adminEmail = config('mail.admin.address');
                \Log::info("Sending Admin email to: " . $adminEmail);
                Mail::to($adminEmail)->send(new AdminNewOrderMail($order));
                // Send to each vendor
                $vendors = $order->orderItems->groupBy(fn($item) => $item->product->vendor_id);
                foreach ($vendors as $vendorId => $items) {
                    $vendor = $items->first()->product->vendor;
                    \Log::info("Sending Vendor email to: " . $vendor->user->email);
                    Mail::to($vendor->user->email)->send(new VendorOrderNotificationMail($vendor, $order, $items));
                }
    
                // Redirect to order confirmation page
                return redirect()->route('order.complete', $order->id)->with('success', 'Order placed successfully!');
            } catch (\Exception $e) {
                DB::rollBack();
    
                Log::error('Order creation failed: ' . $e->getMessage());
    
                return back()->with('error', 'Failed to create order. Please try again.');
            }
        }

    }

      // STEP 2: Paystack callback (after payment)
    public function paymentCallback(Request $request, CartService $cartService)
    {
        // Check if billing information exists in session
        if (!session('checkout.billing')) {
            return redirect()->route('checkout')->with('error', 'Please complete billing information first.');
        }


        $reference = $request->query('reference');
        if (!$reference) {
            
            return back()->with('error', 'Payment reference missing.');
        }

        // Verify payment
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
            Log::error('Paystack Verify Error: ' . $err);
            return back()->with('error', 'Payment verification failed.');
        }

        $result = json_decode($response, true);
        
        if ($result['status'] && $result['data']['status'] === 'success') {
            // dd('result', [$result['data']['status'], session('checkout.billing'),session('checkout.shipping'), $cartService->getCartItems()]);
            // Save order after successful payment
            try {
                DB::beginTransaction();

                $billingData = session('checkout.billing');
                $shippingData = session('checkout.shipping');
                $cartItems = $cartService->getCartItems();

                if (empty($cartItems)) {
                    return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
                }

                // Create the order
                $order = Order::create([
                    'order_number' => $reference,
                    'user_id' => auth()->id(),
                    'payment_method' => 'paystack',
                    'payment_status' => 'completed',
                    'status' => 'completed',
                    'subtotal' => $cartService->getSubTotal(),
                    'tax_amount' => 0, // You can calculate tax based on your business logic
                    'shipping_amount' => 0, // You can calculate shipping based on your business logic
                    'discount_amount' => 0,
                    'total_price' => $cartService->getTotalPrice(),
                    'billing_first_name' => $billingData['first_name'],
                    'billing_last_name' => $billingData['last_name'],
                    'billing_email' => $billingData['email'],
                    'billing_phone' => $billingData['phone'],
                    'billing_address' => $billingData['address'],
                    'billing_city' => $billingData['city'],
                    'billing_state' => $billingData['state'],
                    'billing_zip' => $billingData['zip'],
                    
                    'shipping_first_name' => $shippingData['first_name'],
                    'shipping_last_name' => $shippingData['last_name'],
                    'shipping_address' => $shippingData['address'],
                    'shipping_city' => $shippingData['city'],
                    'shipping_state' => $shippingData['state'],
                    'shipping_zip' => $shippingData['zip'],
                    
                    'customer_notes' => $billingData['notes'] ?? null,
                ]);

                // Create order items
                foreach ($cartItems as $cartItem) {
                    $product = Product::find($cartItem['product_id']);

                    if (!$product) {
                        continue;
                    }

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'product_sku' => $product->sku,
                        'product_description' => Str::limit(strip_tags($product->description), 200), // ✅ shorten safely
                        'product_image' => $cartItem['image'],
                        'unit_price' => $cartItem['price'],
                        'total_price' => $cartItem['price'] * $cartItem['quantity'],
                        'quantity' => $cartItem['quantity'],
                        'variation_type_option_ids' => $cartItem['option_ids'] ?? [],
                        'variation_data' => $cartItem['options'] ?? [],
                    ]);

                    // create transactions
                    // foreach ($cartItems as $cartItem) {
                    //     $product = Product::find($cartItem['product_id']);
                    //     if (!$product) {
                    //         continue;
                    //     }
                        Transaction::create([
                            'user_id' => auth()->id(),
                            'vendor_id' => $product->vendor_id,
                            'product_id' => $product->id,
                            'amount' => $cartItem['price'] * $cartItem['quantity'],
                            'location' => $product->vendor->vendor_state ?? 'N/A',
                            'transaction_status' => 'completed',
                        ]);
                    // }


                    try {
                        $orderedQty = isset($cartItem['quantity']) ? intval($cartItem['quantity']) : 0;
                        if ($orderedQty <= 0) {
                            Log::warning("Invalid ordered quantity", ['product_id' => $product->id, 'orderedQty' => $orderedQty]);
                            continue;
                        }

                        // Atomically decrement stock (ensures we don't go negative) and increment sales
                        // Use decrement/increment for safety and DB-level atomicity
                        $product->decrement('quantity', $orderedQty);
                        $product->increment('sales', $orderedQty);

                        if($cartItem['price'] > 10000){
                             // increase vendor and user points by 1
                            $vendor = $product->vendor;
                            $vendor->increment('points', 1);
                            $user = auth()->user();
                            $user->increment('points', 1);
                        }

                        // Refresh product model so $product->quantity is up-to-date
                        $product->refresh();

                        Log::info('Product updated after order', [
                            'product_id' => $product->id,
                            'new_quantity' => $product->quantity,
                            'new_sales' => $product->sales,
                            'ordered_qty' => $orderedQty,
                        ]);

                        // If stock is low (threshold you choose), notify vendor.
                        // Use queue() so email sending doesn't block request.
                        $lowStockThreshold = 2; // change as needed
                        if ($product->quantity <= $lowStockThreshold) {
                            $vendor = $product->vendor; // ensure relationship exists

                            if ($vendor && !empty($vendor->user->email)) {
                                // Queue the mail (requires queue driver; fallback to send if you haven't configured queues)
                                try {
                                    if (config('mail.use_queue', true)) {
                                        Mail::to($vendor->user->email)->queue(new LowStockAlertMail($vendor, $product));
                                    } else {
                                        Mail::to($vendor->user->email)->send(new LowStockAlertMail($vendor, $product));
                                    }

                                    Log::info('Low stock email queued/sent', [
                                        'product_id' => $product->id,
                                        'vendor_email' => $vendor->user->email,
                                        'quantity' => $product->quantity,
                                    ]);
                                } catch (\Exception $mailEx) {
                                    Log::error('Failed to send low-stock mail', [
                                        'error' => $mailEx->getMessage(),
                                        'product_id' => $product->id,
                                        'vendor_email' => $vendor->email ?? null,
                                    ]);
                                }
                            } else {
                                Log::warning('Vendor missing or vendor email missing for low stock alert', ['product_id' => $product->id]);
                            }
                        }
                    } catch (\Exception $e) {
                        // Log errors; don't break the whole order creation
                        Log::error('Error updating product stock/sales', [
                            'message' => $e->getMessage(),
                            'product_id' => $product->id ?? null,
                            'cartItem' => $cartItem,
                        ]);
                    }
                }
                // Clear the cart
                $cartService->clearCart();

                // Clear session data
                session()->forget(['checkout.billing', 'checkout.shipping']);

                DB::commit();

                // // Send to Buyer
                // Mail::to($order->billing_email)->queue(new OrderConfirmationMail($order));

                // // Send to Admin
                //  $adminEmail = config('mail.admin.address');
    
                // Mail::to($adminEmail)->queue(new AdminNewOrderMail($order));

                // // Send to each vendor
                // $vendors = $order->orderItems->groupBy(fn($item) => $item->product->vendor_id);
                // foreach ($vendors as $vendorId => $items) {
                //     $vendor = $items->first()->product->vendor;
                //     Mail::to($vendor->user->email)->queue(new VendorOrderNotificationMail($vendor, $order, $items));
                // }
                
                // Send to Buyer

                try {
                    $order->load('orderItems');
                    \Log::info("Attempting to send Buyer email to {$order->billing_email}");
                    Mail::to($order->billing_email)->send(new OrderConfirmationMail($order));
                    \Log::info("Buyer email successfully sent to {$order->billing_email}");
                } catch (\Exception $e) {
                    \Log::error("Failed to send Buyer mail", [
                        'email' => $order->billing_email,
                        'error' => $e->getMessage(),
                    ]);
                }

                // Send to Admin
                $adminEmail = config('mail.admin.address');
                \Log::info("Sending Admin email to: " . $adminEmail);
                Mail::to($adminEmail)->send(new AdminNewOrderMail($order));
                // Send to each vendor
                $vendors = $order->orderItems->groupBy(fn($item) => $item->product->vendor_id);
                foreach ($vendors as $vendorId => $items) {
                    $vendor = $items->first()->product->vendor;
                    \Log::info("Sending Vendor email to: " . $vendor->user->email);
                    Mail::to($vendor->user->email)->send(new VendorOrderNotificationMail($vendor, $order, $items));
                }
                // Send to Buyer

                \Log::info("Sending Buyer email to: " . $order->billing_email);
                Mail::to($order->billing_email)->send(new OrderConfirmationMail($order));



                // Redirect to order confirmation page
                return redirect()->route('order.complete', $order->id)->with('success', 'Order placed successfully!');
            } catch (\Exception $e) {
                DB::rollBack();

                Log::error('Order creation failed: ' . $e->getMessage());

                return back()->with('error', 'Failed to create order. Please try again.');
            }

                // return redirect()->route('orders.complete')->with('success', 'Payment successful! Your order has been placed.');
        }

        // return redirect()->route('checkout')->with('error', 'Payment failed or cancelled.');
        return back()->with('error', 'Failed to create order. Please try again.');

         return Inertia::render('Ecommerce/OrderComplete', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'total_price' => $order->total_price,
                'billing_full_name' => $order->billing_full_name,
                'billing_email' => $order->billing_email,
                'billing_address' => $order->billing_address,
                'billing_city' => $order->billing_city,
                'billing_state' => $order->billing_state,
                'billing_zip' => $order->billing_zip,
                
                'shipping_full_name' => $order->shipping_full_name,
                'shipping_address' => $order->shipping_address,
                'shipping_city' => $order->shipping_city,
                'shipping_state' => $order->shipping_state,
                'shipping_zip' => $order->shipping_zip,
                
                'created_at' => $order->created_at->format('M d, Y H:i'),
                'order_items' => $order->orderItems->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_name' => $item->product_name,
                        'product_image' => $item->product_image,
                        'quantity' => $item->quantity,
                        'unit_price' => $item->unit_price,
                        'total_price' => $item->total_price,
                        'variation_data' => $item->variation_data,
                    ];
                }),
            ],
        ]);
    }


    public function orderComplete(Order $order, Request $request)
    {
        // Ensure the order belongs to the authenticated user
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Ecommerce/OrderComplete', [
             'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'total_price' => $order->total_price,
                'billing_full_name' => $order->billing_full_name,
                'billing_email' => $order->billing_email,
                'billing_address' => $order->billing_address,
                'billing_city' => $order->billing_city,
                'billing_state' => $order->billing_state,
                'billing_zip' => $order->billing_zip,
                
                'shipping_full_name' => $order->shipping_full_name,
                'shipping_address' => $order->shipping_address,
                'shipping_city' => $order->shipping_city,
                'shipping_state' => $order->shipping_state,
                'shipping_zip' => $order->shipping_zip,
                
                'created_at' => $order->created_at->format('M d, Y H:i'),
                'order_items' => $order->orderItems->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_name' => $item->product_name,
                        'product_image' => $item->product_image,
                        'quantity' => $item->quantity,
                        'unit_price' => $item->unit_price,
                        'total_price' => $item->total_price,
                        'variation_data' => $item->variation_data,
                    ];
                }),
            ],
        ]);
    }
}
