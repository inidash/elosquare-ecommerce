import BannerAndSlider from '@/components/ecommerce/Homepage/BannerAndSlider';
import BestSeller from '@/components/ecommerce/Homepage/BestSeller';
import Blog from '@/components/ecommerce/Homepage/Blog';
import Brand from '@/components/ecommerce/Homepage/Brand';
import SpecialOffer from '@/components/ecommerce/Homepage/SpecialOffer';
import EcomLayout from '@/layouts/ecom-layout';
import NewArrivals from '@/components/ecommerce/Homepage/NewArrivals';

export default function Shop() {
    return (
        <EcomLayout>
            <div className="bg-gray-400 py-4">
                <BannerAndSlider />
                <BestSeller />
                {/* <Brand /> */}
                <NewArrivals />
                
            </div>
        </EcomLayout>
    );
}

// https://red-goldfish-575176.hostingersite.com/