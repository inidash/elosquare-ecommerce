<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
// use App\Http\Controllers\VendorController;
use App\Http\Controllers\Vendor\VendorController;
use App\Http\Middleware\UserCheckMiddleware;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ContactController;
// use App\Http\Controllers\CategoryController;

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'landingPage')->name('home');
    Route::get('/shop', 'index')->name('shop');
    
    Route::get('/product/{slug}', 'productDetail')->name('product.detail');
    Route::get('/products', 'products')->name('products.all');
    Route::get('/new-arrivals', 'newArrivals')->name('new-arrival');
    // Route::get('/category/{slug}', 'category')->name('category.products');
    Route::get('/category/{slug}', 'showCategory')->name('category.show');
    Route::get('/privacy-policy', 'privacy_policy')->name('privacy.policy');
    Route::get('/terms-conditions', 'terms_and_conditions')->name('terms.conditions');
    Route::get('/top-buyers', 'topBuyers')->name('top.buyers');
    Route::get('/top-vendors', 'topVendors')->name('top.vendors');
    // Route::get('/products/suggestions','suggestProduct')->name('search.suggestions');

    
});

Route::controller(ContactController::class)->group(function(){
    Route::get('/contact', 'contact')->name('contact');
    Route::post('/send', 'send')->name('contact.message');
});

Route::controller(ProductController::class)->group( function() {
    Route::get('/products/suggestions', 'suggestProduct');
    Route::get('/products/search-results', 'searchResults');
    Route::get('/best-sellers', 'BestSellers')->name('best.sellers');

});


// Cart routes
Route::controller(CartController::class)->group(function () {
    Route::get('/cart', 'index')->name('cart.index');
    Route::post('/cart/add/{product}', 'store')->name('cart.store');
    Route::put('/cart/{product}', 'update')->name('cart.update');
    Route::delete('/cart/{product}', 'destroy')->name('cart.delete');
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('Dashboard');
//     })->name('dashboard');
// });
Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    $user = auth()->user();

    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    } elseif ($user->role === 'vendor') {
        return redirect()->route('vendor.dashboard');
    } else {
        return redirect()->route('user.dashboard');
    }
})->name('dashboard');

Route::middleware(['auth', UserCheckMiddleware::class])->prefix('user')->as('user.')->controller(UserController::class)->group(function () {
    Route::get('/dashboard', 'index')->name('dashboard');
    Route::get('/profile/edit', 'edit')->name('profile.edit');
    Route::get('/profile', 'profile')->name('profile');
    // Route::post('/profile', 'update')->name('profile.update');
    Route::get('/orders', 'orders')->name('orders');
    Route::get('/orders/{order}', 'orderDetails')->name('orders.details');
    Route::post('/orders/{order}/cancel', 'cancelOrder')->name('orders.cancel');
    Route::get('/address', 'address')->name('address');

    Route::get('/register-vendor', 'registerVendor')->name('register-vendor');
    Route::post('/register-vendor', 'storeVendor')->name('store-vendor');

    // Become vendor routes
    // Route::get('/register-vendor', 'registerVendor')->name('register-vendor');
    // Route::post('/register-vendor', 'storeVendor')->name('store-vendor');
});

// Route::middleware(['auth', 'verified', 'UserCheckMiddleware'])
//     ->prefix('user')
//     ->as('user.')
//     ->controller(UserController::class)
//     ->group(function () {
//         Route::get('/register-vendor', 'registerVendor')->name('register-vendor');
//         Route::post('/register-vendor', 'storeVendor')->name('store-vendor');
//     });


Route::middleware(['auth'])->group(function () {
    Route::get('/checkout', [CartController::class, 'checkoutForm'])->name('checkout');
    Route::get('/payment', [CartController::class, 'paymentForm'])->name('payment');
    Route::post('/checkout/process', [CartController::class, 'processCheckout'])->name('checkout.process');
    Route::post('/payment/process', [CartController::class, 'processPayment'])->name('payment.process');
    Route::get('/payment/callback', [CartController::class, 'paymentCallback'])->name('callback');
    Route::get('/order-complete/{order}', [CartController::class, 'orderComplete'])->name('order.complete');
});



// Route::get('/vendor/dashboard', function () {
//     return Inertia::render('Ecommerce/Vendor/Dashboard');
// })->name('vendor.dashboard')->middleware(['auth']);

// // --- Vendor dashboard (only for vendors)
// Route::middleware(['auth'])->group(function () {
//     Route::prefix('vendor')->as('vendor.')->controller(VendorController::class)->group(function () {
//         Route::get('/dashboard', 'index')->name('dashboard');
//         Route::get('/profile/edit', 'edit')->name('profile.edit');
//         Route::post('/profile', 'update')->name('profile.update');
//     });
// });


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/vendor.php';