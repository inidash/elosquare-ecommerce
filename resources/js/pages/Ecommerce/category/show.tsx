import HeroSection from '@/components/ecommerce/HeroSection';
import BannerAndSlider from '@/components/ecommerce/Homepage/BannerAndSlider';
import BestSeller from '@/components/ecommerce/Homepage/BestSeller';
import Blog from '@/components/ecommerce/Homepage/Blog';
import Brand from '@/components/ecommerce/Homepage/Brand';
import SpecialOffer from '@/components/ecommerce/Homepage/SpecialOffer';
import ProductCard from '@/components/ecommerce/ProductCard';
import EcomLayout from '@/layouts/ecom-layout';
import { usePage } from '@inertiajs/react';

export default function CategoryPage() {
    // console.log(products)
    const { category, products } = usePage().props;
    console.log([category,products]);
    return (
        <EcomLayout>
            <HeroSection title={category.name} />
           <div className="container mx-auto">
             {/* <BannerAndSlider /> */}
             
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {/* <!-- Product Card 1 --> */}
                    {products.length > 0 ? (
                        products.map((product: any) => <ProductCard key={product.id} {...product} />)
                    ) : (
                        <div className="col-span-4 text-center text-gray-800">No Products available at the moment.</div>
                    )}
                </div>
            {/* <SpecialOffer /> */}
            {/* <Brand /> */}
           </div>
        </EcomLayout>
    );
}
