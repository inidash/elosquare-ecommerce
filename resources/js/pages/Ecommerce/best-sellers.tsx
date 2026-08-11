import HeroSection from '@/components/ecommerce/HeroSection';
import BannerAndSlider from '@/components/ecommerce/Homepage/BannerAndSlider';
import BestSeller from '@/components/ecommerce/Homepage/BestSeller';
import Blog from '@/components/ecommerce/Homepage/Blog';
import Brand from '@/components/ecommerce/Homepage/Brand';
import NewArrivals from '@/components/ecommerce/Homepage/NewArrivals';
import SpecialOffer from '@/components/ecommerce/Homepage/SpecialOffer';
import ProductCard from '@/components/ecommerce/ProductCard';
import { Button } from '@/components/ui/button';
import EcomLayout from '@/layouts/ecom-layout';
import { Link, usePage } from '@inertiajs/react';
import { ArrowBigRight } from 'lucide-react';


// Update the getSafeImageUrl function to handle different types of image inputs
// const getSafeImageUrl = (imageUrl: any, fallback: string = '/placeholder-image.jpg'): string => {
//   if (!imageUrl) {
//     return fallback
//   }

export default function BestSellers() {
    

    const {best_sellers, new_products} = usePage().props as any
    console.log(new_products)
    
    return (
        <EcomLayout>
            <HeroSection title='Best Sellers' href='/best-sellers' />
           <div className="container mx-auto my-5 px-4">
             
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {/* <!-- Product Card 1 --> */}
                    {best_sellers.length > 0 ? (
                        best_sellers.map((product: any) => <ProductCard key={product.id} {...product} />)
                    ) : (
                        <div className="col-span-4 text-center text-gray-800">No Products available at the moment.</div>
                    )}
                </div>
               {/* New Products */}
               {new_products && new_products.length > 0 && (
                <div className="mt-12 bg-gray-300 rounded-lg py-12">
                    <div className="container mx-auto px-4">
                        <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-700">New Products</h2>
                        <Link href="/new-arrivals" className="text-indigo-600 hover:text-indigo-800">
                            <Button className='bg-white text-gray-700 cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-200'>
                                View All
                                <ArrowBigRight />
                            </Button>
                        </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {new_products.map((product) => (
                            <ProductCard key={product.id} {...product}  />
                        ))}
                        </div>
                    </div>
                </div>
                )}
           </div>
        </EcomLayout>
    );
}
