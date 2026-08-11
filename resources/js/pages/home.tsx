import ComingSoon from '@/components/ecommerce/ComingSoon'
import FeatureSection from '@/components/ecommerce/Features'
import HeroCarousel from '@/components/ecommerce/HeroIndex'
import ProductDisplay from '@/components/ecommerce/ProductDisplay'
import TopBuyers from '@/components/ecommerce/TopBuyers'
import TopVendors from '@/components/ecommerce/TopVendors'
import Navbar from '@/components/NavBar'
import EcomLayout from '@/layouts/ecom-layout'
import IndexLayout from '@/layouts/IndexLayout'
import React from 'react'

export default function Home() {
  return (
   
        <IndexLayout>
          <HeroCarousel />
          <FeatureSection />
          <ComingSoon />
          <ProductDisplay />
          <TopVendors />
          <TopBuyers />
        </IndexLayout>
        
    
  )
}
