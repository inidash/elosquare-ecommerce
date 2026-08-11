import { usePage } from '@inertiajs/react';
import ProductCard from '../ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowBigRight } from 'lucide-react';

export default function BestSeller() {
    const { shop } = usePage().props as any;
    console.log("Best Selling Products:", bestSellingProducts);

    return (
        // <div className="bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-700">Best Sellers</h2>
                    <a href="/best-sellers" className="text-indigo-600 hover:text-indigo-800">
                       <Button className='bg-white text-gray-700 cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-200'>
                            View All
                            <ArrowBigRight />
                        </Button>
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {/* <!-- Product Card 1 --> */}
                    {bestSellingProducts.length > 0 ? (
                        bestSellingProducts.map((product: any) => <ProductCard key={product.id} {...product} />)
                    ) : (
                        <div className="col-span-4 text-center text-gray-800">No best sellers available at the moment.</div>
                    )}
                </div>
            </div> 
        // {/* </div> */}
    );
}
