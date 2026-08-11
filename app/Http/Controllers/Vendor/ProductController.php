<?php

namespace App\Http\Controllers\Vendor;

use App\Helpers\ImageUploader;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductStoreUpdateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\VendorSubscription;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ProductController extends Controller
{
     public function index(Request $request): Response
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'desc');

        // $products = Product::select('id', 'name', 'slug', 'created_at')
        //     ->when($search, function ($query, $search) {
        //         $query->where('name', 'like', '%' . $search . '%');
        //     })
        //     ->orderBy($sort, $direction)
        //     ->paginate($perPage)->withQueryString();
        $vendor = auth()->user()->vendor;
        $vendorSubscription = $vendor->subscriptions()->latest()->first();
        $vendorSubscriptionCount = VendorSubscription::where('vendor_id', $vendor->id)->count();
        $vendorProductsCount = $vendor->products()->count();
        $products = Product::select('id','vendor_id', 'name', 'slug', 'created_at')
            ->where('vendor_id', $vendor->id)
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->orderBy($sort, $direction)
            ->paginate($perPage)->withQueryString();
        $products->getCollection()->transform(function ($product) {
            $product->image = $product->getFirstImageUrl('images', 'thumb');
            return $product;
        });
        
        return Inertia::render('Ecommerce/Vendor/Products/Index', [
            'products' => $products,
            'vendor' => $vendor,
            'vendorSubscription' => $vendorSubscription,
            'vendorSubscriptionCount' => $vendorSubscriptionCount,
            'vendorProductsCount' => $vendorProductsCount,
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

    public function create(Request $request)
    {
        $vendor = auth()->user()->vendor;
        $vendorSubscriptionCount = VendorSubscription::where('vendor_id', $vendor->id)->count();
        $vendorSubscription = $vendor->subscriptions()->latest()->first();
        $vendorProductsCount = $vendor->products()->count();
        // Restrict free plan to 1 products
        if ($vendor->vendor_plan === 'free' && $vendor->products()->count() > 0) {
            // dd('limit reached');
            return redirect()->route('vendor.upgrade.plan')
            ->with('warning', 'You’ve reached your product limit. Upgrade to continue selling.');
        }

        // restrict pending vendors from adding products
        if ($vendor->vendor_status !== 'Approved') {
            return redirect()->route('vendor.dashboard')
            ->with('error', 'Your vendor account is still pending approval. You cannot add products at this time.');
        }

        if($vendor->vendor_plan !==  'Lifetime Plan'){
            if($vendorSubscriptionCount < $vendorProductsCount){
                return redirect()->route('vendor.upgrade.plan')
                ->with('warning', 'You’ve reached your product limit. Upgrade to continue selling.');
            } else {

                $brands = Brand::select('id', 'name')->get();
                $categories = Category::select('id', 'name', 'parent_id')->with('descendants')->isParent()->get();
                $flattenedCategies = $this->flattenCategories($categories);
                return Inertia::render('Ecommerce/Vendor/Products/Create', [
                    'vendor' => $vendor,
                    'brands' => $brands,
                    'categories' => $flattenedCategies,
                    'vendorSubscription' => $vendorSubscription,
                    'vendorSubscriptionCount' => $vendorSubscriptionCount,
                    'vendorProductsCount' => $vendorProductsCount,

                ]);

                // update vendor subscription plan to null after uploading products within limit
                $vendor->vendor_plan = 'null';
                $vendor->save();
                dd('plan updated to:', $vendor->vendor_plan);
            }
        } else {
             $brands = Brand::select('id', 'name')->get();
                $categories = Category::select('id', 'name', 'parent_id')->with('descendants')->isParent()->get();
                $flattenedCategies = $this->flattenCategories($categories);
                return Inertia::render('Ecommerce/Vendor/Products/Create', [
                    'vendor' => $vendor,
                    'brands' => $brands,
                    'categories' => $flattenedCategies,
                    'vendorSubscription' => $vendorSubscription,
                    'vendorSubscriptionCount' => $vendorSubscriptionCount,
                    'vendorProductsCount' => $vendorProductsCount,

                ]);
        }
    }

    public function store(ProductStoreRequest $request): RedirectResponse
    {
         $vendor = auth()->user()->vendor;
         
        $vendorSubscriptionCount = VendorSubscription::where('vendor_id', $vendor->id)->count();
        $vendorSubscription = $vendor->subscriptions()->latest()->first();
        $vendorProductsCount = $vendor->products()->count();

    // Restrict free plan to 1 products
        if ($vendor->vendor_plan === 'free' && $vendor->products()->count() === 1) {
            // dd('limit reached');
            return redirect()->route('vendor.upgrade.plan')
            ->with('warning', 'You’ve reached your product limit. Upgrade to continue selling.');
        }
        if($vendor->vendor_plan !== 'Lifetime Plan'){
            $vendor->vendor_plan = 'null';
            $vendor->save();
            $data = $request->only('name', 'description', 'status', 'brand_id', 'category_id', 'price','selling_price', 'quantity', 'barcode', 'sku');
            $data['vendor_id'] = auth()->user()->vendor->id;
            // Apply price adage (markup)
            
            $price = $data['price'];
            if ($price <= 5000) {
                    // $price = $data['price'];
                    $data['selling_price'] = $data['price'] * 0.15 + $data['price'];
                    $product = Product::create($data);
                    return redirect()->route('vendor.products.edit', $product->id)->with('success', 'Product created successfully.');
            } else {
                
                $data['selling_price'] = $data['price'] * 0.10 + $data['price'];
                $product = Product::create($data);
            return redirect()->route('vendor.products.edit', $product->id)->with('success', 'Product created successfully.');
            }
            
        } else {

            $data = $request->only('name', 'description', 'status', 'brand_id', 'category_id', 'price','selling_price', 'quantity', 'barcode', 'sku');
            $data['vendor_id'] = auth()->user()->vendor->id;
          // Apply price adage (markup)
           
          $price = $data['price'];
          if ($price <= 5000) {
                // $price = $data['price'];
                $data['selling_price'] = $data['price'] * 0.15 + $data['price'];
                $product = Product::create($data);
                return redirect()->route('vendor.products.edit', $product->id)->with('success', 'Product created successfully.');
          } else {
                
                $data['selling_price'] = $data['price'] * 0.10 + $data['price'];
                $product = Product::create($data);
            return redirect()->route('vendor.products.edit', $product->id)->with('success', 'Product created successfully.');
            }
        }
       
    }

    public function edit($id): Response
    {
        $product = Product::findOrFail($id);
        $product->image = asset('storage/' . $product->image);
        $brands = Brand::select('id', 'name')->get();
        $categories = Category::select('id', 'name', 'parent_id')->with('descendants')->isParent()->get();
        $flattenedCategies = $this->flattenCategories($categories);
        return Inertia::render('Ecommerce/Vendor/Products/Edit', [
            'product' => $product,
            'brands' => $brands, 
            'categories' => $flattenedCategies
        ]);
    }

    public function update(ProductUpdateRequest $request, Product $product): RedirectResponse
    {
        $data = $request->only('name', 'description', 'status', 'brand_id', 'category_id', 'price', 'quantity', 'barcode', 'sku');
        $price = $data['price'];
        if ($price <= 5000) {
             $data['selling_price'] = $data['price'] * 0.15 + $data['price'];
            $product->update($data);
            
            return redirect()->route('vendor.products.index')->with('success', 'Product updated successfully.');
        } else {
             $data['selling_price'] = $data['price'] * 0.15 + $data['price'];
            $product->update($data);

            return redirect()->route('vendor.products.index')->with('success', 'Product updated successfully.');
        }
    }

    public function destroy($id): RedirectResponse
    {
        $product = Product::findOrFail($id);
        ImageUploader::deleteImage($product->image);
        $product->delete();
        return redirect()->route('vendor.products.index')->with('success', 'Product deleted successfully.');
    }


    public function flattenCategories($categories, $prefix = '', $result = [])
    {
        foreach ($categories as $category) {
            $path = $prefix ? "$prefix > $category->name" : $category->name;

            $result[] = [
                'id' => $category->id,
                'name' => $category->name,
                'path' => $path,
                'level' => substr_count($path, '>'),
            ];

            if ($category->descendants && $category->descendants->count() > 0) {
                $result = $this->flattenCategories($category->descendants, $path, $result);
            }
        }
        return $result;
    }

    
}


