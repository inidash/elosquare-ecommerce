<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductImageController extends Controller
{
    
    public function index(Request $request, $id) 
    {
        $product = Product::findOrFail($id);
        $images = [];
        // dd($product->getMedia('images'));
        $product->getMedia('images')->each(function ($media) use (&$images) {
            $images[] = [
                'id' => $media->id,
                'url' => asset($media->getUrl()),
            ];
        });

        //   dd('images', $images);

        return Inertia::render('Ecommerce/Vendor/Products/Images/Index', [
            'images' => $images,
            'product' => $product,
        ]);
    }

    public function store(Request $request, Product $product)
    {

        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|max:2048', // max 2MB per image
        ]);

        foreach ($request->file('images', []) as $image) {
            $product->addMedia($image)
                ->toMediaCollection('images');
        }

        return redirect()->back()
            ->with('success', 'Images uploaded successfully.');
    }

    public function destroy(Request $request, $imageId)
    {
        $media = Media::findOrFail($imageId);
        $media->delete();
        return redirect()->back()
            ->with('success', 'Image deleted successfully.');
    }
}
