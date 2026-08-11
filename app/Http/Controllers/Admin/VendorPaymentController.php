<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use App\Models\VendorPayment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class VendorPaymentController extends Controller
{
   public function index(Request $request)
    {
    $perPage = $request->input('perPage', 10);
    $search = $request->input('search', '');
    $sort = $request->input('sort', 'id');
    $direction = $request->input('direction', 'desc');

    $payments = VendorPayment::with(['vendor.user:id,name,email']) // eager-load vendor name
        ->select('id', 'vendor_id', 'amount', 'payment_method', 'transaction_reference', 'payment_date', 'created_at')
        ->when($search, function ($query, $search) {
            $query->whereHas('vendor.user', function ($subQuery) use ($search) {
                $subQuery->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            })
            ->orWhere('payment_method', 'like', '%' . $search . '%')
            ->orWhere('transaction_reference', 'like', '%' . $search . '%');
        })
        ->orderBy($sort, $direction)
        ->paginate($perPage)
        ->withQueryString();

    return Inertia::render('Admin/VendorPayments/Index', [
        'payments' => $payments,
        'filters' => [
            'search' => $search,
            'sort' => $sort,
            'direction' => $direction,
            'perPage' => $perPage,
            'page' => $request->input('page', 1),
        ],
        'can' => [
            'create' => true,
            'edit' => true,
            'delete' => true
        ]
    ]);
    }
    public function create()
    {
        $vendors = Vendor::with('user:id,name')->get();
        // dd($vendors);
        return Inertia::render('Admin/VendorPayments/Create', [
            'vendors' => $vendors
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'nullable|string|max:255',
            'transaction_reference' => 'nullable|string|max:255',
            'payment_date' => 'required|date',
            'note' => 'nullable|string',
            'proof' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        if ($request->hasFile('proof')) {
            $validated['proof'] = $request->file('proof')->store('vendor_payments', 'public');
        }
    
        VendorPayment::create($validated);

        return redirect()->route('admin.vendor-payments.index')
            ->with('success', 'Payment recorded successfully.');
    }
}
