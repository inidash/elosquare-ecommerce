import EcomLayout from '@/layouts/ecom-layout'
import React from 'react'
import Cart from '../Ecommerce/Cart'

export default function index() {
  return (
    <EcomLayout>
      <Cart cartCount={0} cartItems={[]} />
    </EcomLayout>
  )
}
