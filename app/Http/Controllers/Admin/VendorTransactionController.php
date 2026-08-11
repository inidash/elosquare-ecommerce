<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Product;
use App\Models\Vendor;
use App\Http\Resources\TransactionResource;

use App\Http\Resources\ProductListResource;

class VendorTransactionController extends Controller
{
    
        // $bestSellingProducts = ProductListResource::collection(Product::query()->limit(5)->orderBy('sales', 'desc')->get())->resolve();


public function index(Request $request)
{
    $perPage = $request->input('perPage', 10);
    $search = $request->input('search', '');
    $sort = $request->input('sort', 'created_at');
    $direction = $request->input('direction', 'desc');
    $status = $request->input('status', '');
    $category = $request->input('category', '');

    $query = Transaction::with(['user', 'product.category', 'vendor'])
        ->when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('product', function ($productQuery) use ($search) {
                    $productQuery->where('name', 'like', '%' . $search . '%')
                        ->orWhere('sku', 'like', '%' . $search . '%');
                })
                ->orWhereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                })
                ->orWhereHas('vendor', function ($vendorQuery) use ($search) {
                    $vendorQuery->where('business_name', 'like', '%' . $search . '%');
                });
            });
        })
        ->when($status, fn($query, $status) => $query->where('status', $status))
        ->when($category, function ($query, $category) {
            $query->whereHas('product', fn($productQuery) => $productQuery->where('category_id', $category));
        })
        ->orderBy($sort, $direction);

    $transactions = $query->paginate($perPage)->withQueryString();
    $transactions->getCollection()->transform(function($item){

        return $item;
    });

    // $transactionsData = TransactionResource::collection($transactions);


        //  dd($transactionsData);
        return Inertia::render('Admin/Transaction/Index', [
            'transactions' => $transactions,
             'filters' => [
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
                'perPage' => $perPage,
                'status' => $status,
                //  'payment_status' => $paymentStatus,
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
                'view' => true,
            ]
        ]);
    }
}
