<?php

namespace App\Http\Controllers;

use App\Helpers\ImageUploader;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductStoreUpdateRequest;
use App\Http\Requests\ProductUpdateRequest;
use Illuminate\Http\RedirectResponse;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Vendor;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Display the  home page.
     */

    public function landingPage(){

        $user = Auth::user();

        $topVendors = Vendor::withCount('transactions')->orderBy('points', 'desc')->take(5)->get();
        $featuredProducts = ProductListResource::collection(Product::query()->where('is_featured', true)->orderBy('created_at', 'desc')->limit(5)->get())->resolve();
        
        $topUsers = User::where('role', 'user')->withCount('transactions')->orderBy('points', 'desc')->take(5)->get();
       
        return Inertia::render('home', [
            'top_vendors' => $topVendors,
            'top_users' => $topUsers,
            'featured_products' => $featuredProducts,
        ]);
    }

    public function topBuyers(Request $request)
    {
        $search = $request->input('search', '');
        $perPage = $request->input('perPage', 20);

        $users = User::where('role', 'user')
            ->whereHas('transactions') // only users who bought products
            ->withCount('transactions') // total products bought
            // ->withSum('transactions as total_amount_spent', 'total_price') // total money spent
            ->when($search, function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%");
            })
            ->orderBy('transactions_count', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Ecommerce/top-buyers', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'perPage' => $perPage,
            ]
        ]);
    }

    public function topVendors(Request $request)
    {
        $search = $request->input('search', '');
        $perPage = $request->input('perPage', 20);

        $vendors = Vendor::whereHas('transactions') // only vendors with sales
            ->withCount('transactions') // total products sold
            // ->withSum('transactions as total_sales_amount', 'total_price') // total sales amount
            ->when($search, function ($q) use ($search) {
                $q->where('business_name', 'like', "%$search%")
                  ->orWhere('vendor_state', 'like', "%$search%");
            })
            ->orderBy('transactions_count', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Ecommerce/top-vendors', [
            'vendors' => $vendors,
            'filters' => [
                'search' => $search,
                'perPage' => $perPage,
            ]
        ]);
    }
    public function index(Request $request)
    {
        $bestSellingProducts = ProductListResource::collection(Product::query()->limit(5)->orderBy('sales', 'desc')->get())->resolve();
        // dd($bestSellingProducts);
        $specialOffers = ProductListResource::collection(Product::query()->where('is_special_offer', true)->limit(5)->get())->resolve();
        $newArrivals = ProductListResource::collection(Product::newArrivals()->take(5)->get())->resolve(); 
    // dd('new arrivals', $newArrivals);
        $brands = Brand::query()->select('id', 'name', 'slug', 'image')->get()->map(function ($brand) {
            $brand->image = asset('storage/' . $brand->image);
            return $brand;
            
        });
        return Inertia::render('Ecommerce/shop', [
            'title' => 'Welcome to Our Store',
            'description' => 'Explore our wide range of products and enjoy exclusive offers.',
            'bestSellingProducts' => $bestSellingProducts,
            'specialOffers' => $specialOffers,
            'brands' => $brands,
            'new_arrivals' => $newArrivals,
        ]);
    }

    public function products() {
       $products =  ProductListResource::collection(Product::query()->orderBy('sales', 'desc')->get())->resolve();
             // Get featured products
    // $featuredProducts = Product::featured()->take(8)->get();
        return Inertia::render('Ecommerce/products', [
            // 'featured_products' => $featuredProducts,
            'products' => $products,
        ]);
    

        // dd('products', $products);
        //     $products->getCollection()->transform(function ($product) {
        //     $product->image = $product->getFirstImageUrl('images', 'thumb');
        //     return $product;
        // });
        
    }

    public function newArrivals(){
        
    $newArrivals = ProductListResource::collection(Product::newArrivals()->take(10)->get())->resolve();
    $bestSellingProducts = ProductListResource::collection(Product::query()->limit(5)->orderBy('sales', 'desc')->get())->resolve();
        return Inertia::render('Ecommerce/new-arrivals', [
            // 'featured_products' => $featuredProducts,
            'new_arrivals' => $newArrivals,
            'best_selling' => $bestSellingProducts,
        ]);
    }

    public function getByCategory($slug)
    {
        
         $category = Category::where('slug', $slug)->firstOrFail();

        $productsByCategory = ProductListResource::collection(
            Product::query()
                ->where('category_id', $category->id)
                ->orderBy('created_at', 'desc')
                ->get()
        )->resolve();

        return Inertia::render('Shop/Category', [
            'category' => $category->name,
            'products' => $productsByCategory,
        ]);
    }

    public function productDetail(Request $request, $slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        $productResource = new ProductResource($product);
        $relatedProducts = ProductListResource::collection(
            Product::where('category_id', $product->category_id)
                ->where('id', '!=', $product->id)
                ->limit(5)
                ->get()
        );
        $vendorProducts = ProductListResource::collection(
            Product::where('vendor_id', $product->vendor_id)
                ->where('id', '!=', $product->id)
                ->limit(5)
                ->get()
        );
        return Inertia::render('Ecommerce/ProductDetail', [
            'product' => $productResource->resolve(),
            'variationOptions' => request('options', []),
            'relatedProducts' => $relatedProducts->resolve(),
            'vendorProducts' => $vendorProducts->resolve(),
        ]);
    }

    public function showCategory($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        // Fetch products under this category
        $products = ProductListResource::collection($category->products()->take(8)->get()
    )->resolve();
           
        return Inertia::render('Ecommerce/category/show', [
            'category' => $category,
            'products' => $products,
        ]);
    }

    public function privacy_policy(){

        return Inertia::render('Ecommerce/privacy-policy');
    }

    public function terms_and_conditions(){

        return Inertia::render('Ecommerce/terms-conditions');
    }
    
}
