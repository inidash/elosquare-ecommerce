import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Link, usePage } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Flame } from 'lucide-react';
import { Button } from '../ui/button';

export default function TopVendors() {
    const { top_vendors} = usePage().props as any;
    return (
        // <div className="bg-white py-12">
        <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row  items-center md:justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-gray-500 rounded-2xl blur opacity-20" />
              <div className="relative bg-gradient-to-r from-blue-500 to-gray-500 p-3 rounded-2xl">
                <Flame className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-gray-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Leading Vendors
              </h2>
              <p className="text-lg text-slate-600 font-medium">
                A short list of leading vendors in the marketplace.
              </p>
            </div>
          </div>
            <Link href='/top-vendors'>
            
                <Button
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm border-blue-200 text-blue-600 hover:bg-gray-200 font-semibold px-6 py-2 rounded-xl shadow-lg cursor-pointer"
                >
                    See All 
                </Button>
            </Link>
        </div>

        {/* Deals Carousel */}
        <div className="relative">
            <div className="container bg-gray-300 rounded-lg py-4 my-4 mx-auto px-4">
                {/* <h2 className="mb-8 text-center text-2xl font-bold text-gray-700">Top Vendors</h2> */}

                <div className="swiper brand-slider">
                    <div className="swiper-wrapper items-center py-4">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={0}
                            slidesPerView={5}
                            breakpoints={{
                                350: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            // navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            className="swiper-wrapper items-center py-4"
                        >
                            {top_vendors.map((vendor, index) => (
                                <SwiperSlide key={vendor.id} className="swiper-slide p-4 text-center">
                                    <div className="relative flex flex-col h-60 items-center rounded-lg bg-gray-500 p-6">
                                         <div
                                            className={`
                                                absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold 
                                                ${index === 0
                                                    ? "bg-yellow-500 text-white"
                                                    : index === 1
                                                    ? "bg-gray-400 text-white"
                                                    : index === 2
                                                    ? "bg-orange-600 text-white"
                                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}
                                            `}
                                        >
                                            #{index + 1}
                                        </div>
                                    <p  className='py-2'><strong>Vendor:</strong> {vendor.business_name}</p>
                                    <p className='py-2'><strong>Vendor State:</strong> {vendor.vendor_state}</p>
                                    <p className=' py-2'><strong>Vendor Points:</strong> {vendor.points}</p>
                                    <p className=' py-2'><strong>Products Sold:</strong> {vendor.transactions_count}</p>
                                    {index === 0 && (
                                            <div className="absolute inset-0 rounded-2xl pointer-events-none bg-yellow-300/10 blur-2xl"></div>
                                        )}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        </div>
      </div>

      {/* <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style> */}
    </section>
    );
}
