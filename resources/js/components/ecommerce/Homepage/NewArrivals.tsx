import { usePage } from '@inertiajs/react';
import ProductCard from '../ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowBigRight } from 'lucide-react';

export default function NewArrivals() {
    const { new_arrivals } = usePage().props as any;
    console.log("new arrivals:", new_arrivals);
console.log('new arival',new_arrivals)
    return (
        // <div className="bg-white py-12">
            <div className="container mx-auto px-4 my-4">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">New Products</h2>
                    <a href="/new-arrivals" className="text-indigo-600 hover:text-indigo-800">
                        <Button className='bg-white text-gray-700 cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-200'>
                            View All
                            <ArrowBigRight />
                        </Button>
                    </a>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {/* <!-- Product Card 1 --> */ }
                     {new_arrivals.length > 0 ? (
                        new_arrivals.map((product: any) => <ProductCard key={product.id} {...product} />)
                    ) : (
                        <div className="col-span-4 text-center text-gray-800">No new arrivals available at the moment.</div>
                    )}
                </div>
            </div> 
        // </div>
    );
}
