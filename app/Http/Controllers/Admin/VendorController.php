<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\Vendor;
use App\Models\VendorPayment;
use App\Models\VendorSubscription;
use App\Models\VendorAccountDetail;
use App\Models\User;
use Inertia\Inertia;


class VendorController extends Controller
{
     public function index(Request $request): Response
    {

        
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');
        $vendors = Vendor::select('id','user_id', 'business_name', 'business_address', 'class_of_business', 'vendor_address', 'vendor_status', 'created_at')

            ->when($search, function ($query, $search) {
                $query->where('business_name', 'like', '%' . $search . '%')
                    ->orWhere('business_address', 'like', '%' . $search . '%')
                    ->orWhere('vendor_address', 'like', '%' . $search . '%');
            })
            // ->where('role', '==', 'vendor')
            ->orderBy($sort, $direction)
            ->paginate($perPage)->withQueryString();
        return Inertia::render('Admin/Vendors/Index', [
            'vendors' => $vendors,
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

    public function edit($id): Response
    {
        $vendor = Vendor::with('user:id,name,email')->findOrFail($id);
        $vendorSubscriptions = $vendor->subscriptions()->get();
        $payments = $vendor->payments()->get();
        $vendorAccountDetails = $vendor->accountDetail()->get();
        // dd('payments', $payments);
        // dd('vendor', $vendor);
        // $categories = Category::select('id', 'name')->with("descendants")->isParent()->get();
        return Inertia::render('Admin/Vendors/View', [
            'vendor' => $vendor,
            'payments' => $payments,
            'subscriptions' => $vendorSubscriptions,
            'account_details' => $vendorAccountDetails,
        ]);
    }

        public function updateStatus(Request $request, Vendor $vendor)
    {
        $request->validate(['status' => 'required|in:Pending,Approved,Inactive']);
        
        $vendor->update(['vendor_status' => $request->status]);
        return redirect()->back()->with('success', 'Vendor status updated successfully.');
    }

    public function updatePlan(Request $request, Vendor $vendor)
    {
        $request->validate(['plan_type' => 'required|in:free,paid']);
        
        $vendor->update(['vendor_plan' => $request->plan_type]);
        return redirect()->back()->with('success', 'Vendor plan updated successfully.');
    }


    

    public function destroy($id): RedirectResponse
    {
        $vendor = Vendor::findOrFail($id);
        
        $vendor->delete();
        return redirect()->route('admin.vendors.index')->with('success', 'Vendor deleted successfully.');
    }
}
