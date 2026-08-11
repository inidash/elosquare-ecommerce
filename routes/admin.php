<?php

use App\Http\Middleware\AdminCheckMiddleware;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductImageController;
use App\Http\Controllers\Admin\ProductVariationTypeController;
use App\Http\Controllers\Admin\ProductVariationController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\VendorController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\VendorPaymentController;
use App\Http\Controllers\Admin\VendorTransactionController;


Route::middleware(['auth', AdminCheckMiddleware::class])->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
   
    Route::get('/dashboard', function () {
        Route::get('/dashboard', 'dashboard')->name('dashboard');
    });

    Route::controller(VendorController::class)->group(function () {
        Route::put('/vendors/{vendor}/update-status', 'updateStatus')->name('vendor.update-status');
        Route::put('/vendors/{vendor}/update-plan', 'updatePlan')->name('vendor.update-plan');
    });
    
    Route::controller(VendorPaymentController::class)->group(function () {
        Route::get('/vendor-payments', 'index')->name('vendor-payments.index');
        // Route::get('/vendor-payments/{id}', 'show')->name('vendor-payments.show');
        Route::get('/vendor-payments/create', 'create')->name('vendor-payments.create');
        Route::post('/vendor-payments', 'store')->name('vendor-payments.store');
    });
    
    Route::controller(VendorTransactionController:: class)->group(function(){
        Route::get('/transactions', 'index')->name('vendor-transaction.index');
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
            'users' => UserController::class,
            'admins' => AdminController::class,
            'categories' => CategoryController::class,
            'brands' => BrandController::class,
            'products' => ProductController::class,
            'orders' => OrderController::class,
            'vendors' => VendorController::class,
            'dashboard'=>DashboardController::class,
        ]);
    });
});
