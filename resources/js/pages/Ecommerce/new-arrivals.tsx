import HeroSection from '@/components/ecommerce/HeroSection';
import BannerAndSlider from '@/components/ecommerce/Homepage/BannerAndSlider';
import BestSeller from '@/components/ecommerce/Homepage/BestSeller';
import Blog from '@/components/ecommerce/Homepage/Blog';
import Brand from '@/components/ecommerce/Homepage/Brand';
import SpecialOffer from '@/components/ecommerce/Homepage/SpecialOffer';
import ProductCard from '@/components/ecommerce/ProductCard';
import { Button } from '@/components/ui/button';
import EcomLayout from '@/layouts/ecom-layout';
import { Link, usePage } from '@inertiajs/react';
import { ArrowBigRight } from 'lucide-react';

export default function NewArrivals() {
    // console.log('new arrival',new_arrivals)
    const {new_arrivals, best_selling} = usePage().props as any
    // console.log('new arrivals', new_arrivals)
    return (
        <EcomLayout>
                <HeroSection title='New Arrivals' href='/new-arrivals' />
                <div className="container mx-auto my-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {/* <!-- Product Card 1 --> */}
                        {new_arrivals.length > 0 ? (
                            new_arrivals.map((product: any) => <ProductCard key={product.id} {...product} />)
                        ) : (
                            <div className="col-span-4 text-center text-gray-800">No New Arrivals available at the moment.</div>
                        )}
                    </div>
                </div>
                {/* Best selling products */}
                    {best_selling && best_selling.length > 0 && (
                    <div className="mt-12 bg-gray-300 rounded-lg py-12">
                        <div className="container mx-auto px-4">
                            <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-700">Best Selling Products</h2>
                            <Link href="/best-sellers" className="text-indigo-600 hover:text-indigo-800">
                                <Button className='bg-white text-gray-700 cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-200'>
                                    View All
                                    <ArrowBigRight />
                                </Button>
                            </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                            {best_selling.map((product) => (
                                <ProductCard key={product.id} {...product}  />
                            ))}
                            </div>
                        </div>
                    </div>
                    )}
           
        </EcomLayout>
    );
}
