<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use Inertia\Inertia;

class ProductController extends Controller
{
    //
    public function suggestProduct(Request $request)
    {
        $query = $request->get('query', '');

        $products = Product::query()
            ->with(['category']) // eager load category for grouping
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                ->orWhere('slug', 'like', "%{$query}%")
                ->orWhereHas('category', fn($cat) => $cat->where('name', 'like', "%{$query}%"))
                ->orWhereHas('vendor', fn($ven) => $ven->where('name', 'like', "%{$query}%"));
            })
            ->limit(10)
            ->get()
            ->map(function ($product) use ($query) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'highlighted' => preg_replace(
                        "/(" . preg_quote($query, '/') . ")/i",
                        '<strong>$1</strong>',
                        e($product->name)
                    ),
                    'slug' => $product->slug,
                    'category' => $product->category?->name,
                    'image' => $product->getFirstImageUrl('images', 'thumb'),
                ];
            });

        return response()->json($products);
    }

    public function searchResults(Request $request)
    {
        $query = $request->get('query', '');

        $products = Product::query()
            ->with('category', 'vendor')
            ->where('name', 'like', "%{$query}%")
            ->orWhere('slug', 'like', "%{$query}%")
            ->orWhereHas('category', fn($q) => $q->where('name', 'like', "%{$query}%"))
            ->paginate(12);

        return Inertia::render('Ecommerce/Products/search-result', [
            'query' => $query,
            'products' => $products,
        ]);
    }

    public function BestSellers(){
        $bestSellingProducts = ProductListResource::collection(Product::query()->limit(15)->orderBy('sales', 'desc')->get())->resolve();
        $newArrivals = ProductListResource::collection(Product::newArrivals()->take(5)->get())->resolve();
        return inertia::render('Ecommerce/best-sellers', [
            'best_sellers'=> $bestSellingProducts,
            'new_products' => $newArrivals,
        ]);
    }
}
