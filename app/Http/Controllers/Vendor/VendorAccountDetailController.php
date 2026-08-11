<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class VendorAccountDetailController extends Controller
{
    /**
     * Display vendor's account detail page.
     *
     * If no record exists, render the same page with empty fields.
     */
    public function index()
    {
        $vendor = auth()->user()->vendor;
        
        $account = $vendor->accountDetail; // null if not created yet
        
        return Inertia::render('Ecommerce/Vendor/Account/account-details', [
            'account' => $account,
            'vendor' => $vendor
        ]);
    }

    /**
     * Store a newly created account detail.
     */

    public function addAccountDetails()
    {
        $vendor = auth()->user()->vendor;
        $account = $vendor->accountDetail; // null if not created yet

        return Inertia::render('Ecommerce/Vendor/Account/add-account-details', [
            'account' => $account
        ]);
    }       
    public function store(Request $request)
    {
        $vendor = auth()->user()->vendor;
        

        $validated = $request->validate([
            'bank_name' => 'required|string|max:255',
            'account_name' => 'required|string|max:255',
            'account_number' => 'required|string|max:50',
            'swift_code' => 'nullable|string|max:50',
            'bank_branch' => 'nullable|string|max:255',
            'account_type' => 'required|string|max:100',
            'swift_code' => 'nullable|string|max:50',
        ]);

        // Ensure vendor doesn’t create multiple records
        // if ($vendor->accountDetail) {
        //     return redirect()->route('vendor.account.details')
        //     ->with('error', 'Account details already exist. Please update instead.');
        // }
        $vendorId = $vendor->id;
        $validated['vendor_id'] = $vendorId;
        // dd($validated);

        $vendor->accountDetail()->updateOrCreate([], $validated);

        return redirect()->route('vendor.account.details')
            ->with('success', 'Account details added successfully.');
    }

    /**
     * Update existing vendor account detail.
     */
    public function update(Request $request)
    {
        $vendor = auth()->user()->vendor;

        $validated = $request->validate([
            'bank_name' => 'required|string|max:255',
            'account_name' => 'required|string|max:255',
            'account_number' => 'required|string|max:50',
            'swift_code' => 'nullable|string|max:50',
            'bank_branch' => 'nullable|string|max:255',
            'account_type' => 'required|string|in:savings,current',
            'swift_code' => 'nullable|string|max:50',
        ]);
        dd($validated);
        $vendor->accountDetail()->updateOrCreate([], $validated);

        return redirect()->route('vendor.account.index')
            ->with('success', 'Account details updated successfully.');
    }
}
