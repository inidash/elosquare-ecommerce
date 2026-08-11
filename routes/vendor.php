<?php

use App\Http\Middleware\VendorCheckMiddleware;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Admin\UserController;

use App\Http\Controllers\Vendor\ProductController;
use App\Http\Controllers\Vendor\ProductImageController;
use App\Http\Controllers\Vendor\ProductVariationTypeController;
use App\Http\Controllers\Vendor\ProductVariationController;
use App\Http\Controllers\Vendor\OrderController;
use App\Http\Controllers\Vendor\VendorController;
use App\Http\Controllers\VendorDashboardController;
use App\Http\Controllers\Vendor\VendorAccountDetailController;
use App\Http\Controllers\Vendor\VendorPaymentController;
use App\Http\Controllers\Vendor\VendorPlanSubscription;




Route::middleware(['auth', VendorCheckMiddleware::class])->group(function () {
    Route::prefix('vendor')->name('vendor.')->group(function () {

    Route::controller(VendorController::class)->group(function () {

                Route::get('/dashboard', 'index')->name('dashboard');
                Route::get('/profile/edit', 'edit')->name('profile.edit');
                Route::get('/profile', 'profile')->name('profile');
                Route::get('/register-vendor', 'registerVendor')->name('register-vendor');
                Route::post('/register-vendor', 'storeVendor')->name('store-vendor');
                // Route::get('/upgrade', 'upgrade')->name('upgrade');
               
                // Route::get('/payment', 'payment')->name('payment');
                Route::post('/upgrade', 'processUpgrade')->name('upgrade.process');
            });
    
    Route::controller(VendorAccountDetailController::class)->group(function () {
        Route::get('/account-details', 'index')->name('account.details');
        Route::get('/add-account-details', 'addAccountDetails')->name('add.account.details');
        Route::post('/add-account-details', 'store')->name('account.store');
        Route::post('/account/update', 'update')->name('account.update');
    });

    Route::controller(VendorPlanSubscription::class)->group(function () {
        Route::get('/subscriptions', 'index')->name('subscriptions.index');
        Route::get('/upgrade', 'upgrade')->name('upgrade.plan');
        Route::post('/upgrade-process', 'processUpgrade')->name('upgrade-process');
        Route::get('/callback', 'processPaymentCallback')->name('upgrade-callback');
    });
   Route::controller(VendorPaymentController::class)->group(function () {
       Route::get('/payments', 'index')->name('payments.payment');

   });

        Route::group(['prefix' => 'products', 'as' => 'products.'], function () {
            Route::controller(ProductImageController::class)->group(function () {
                Route::group(['prefix' => 'images', 'as' => 'images.'], function () {
                    Route::get('/{produt}', 'index')->name('index');
                    Route::post('/{product}/store', 'store')->name('store');
                    Route::delete('/delete/{id}', 'destroy')->name('destroy');
                });
            });

            Route::controller(ProductVariationTypeController::class)->group(function () {
                Route::group(['prefix' => 'variation-types', 'as' => 'variation-types.'], function () {
                    Route::get('/{produt}', 'index')->name('index');
                    Route::post('/{product}/store', 'store')->name('store');
                    Route::delete('/delete/{variationType}', 'destroy')->name('destroy');
                });
            });

            Route::controller(ProductVariationController::class)->group(function () {
                Route::group(['prefix' => 'variations', 'as' => 'variations.'], function () {
                    Route::get('/{produt}', 'index')->name('index');
                    Route::post('/{product}/update', 'update')->name('update');
                });
            });
        }); 

        Route::resources([
            // 'users' => UserController::class,
            'products' => ProductController::class,
            'orders' => OrderController::class,
            'vendors-management' => VendorController::class,
            // 'dashboard'=>DashboardController::class,
        ]);
    });
});

