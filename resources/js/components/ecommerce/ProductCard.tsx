import { ProductListItem } from '@/types'
import { router, useForm, usePage } from '@inertiajs/react'
import { Heart, ShoppingBag, ShoppingCart, Star, StarHalf } from 'lucide-react'
import toast, { Toaster } from "react-hot-toast"; 
import { Button } from '../ui/button';
const ProductCard = (product: ProductListItem) => {
  console.log('product:',product)
const { props} =  usePage()
  const form = useForm<{
    option_ids: Record<string, number>
    quantity: number
  }>({
    option_ids: {},
    quantity: 1,
  })

  const handleDetail = (slug: string) => {
    router.visit(route('product.detail', { slug }))
  }

  const addToCart = () => {
    form.post(route('cart.store', product.id), {
      preserveScroll: true,
      preserveState: true,
      onError: (err: any) => {
        console.log(err)
      },
       onSuccess: () => {
        // You can add a success notification here
        // if (props.flash?.success) {
        toast.success('Product added to cart successfully', {
          duration: 3000,
          position: "top-right",
          
        });
      // }
        console.log('Product added to cart successfully')
      },
    })
  }

    //format with commas
  function numberWithCommas(x : string) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

  // const img = product.image && product.image.length > 0 ? product.image[0] : 'https://www.pixel.com/photos/abstract-blur-background-1920x1080-wallpaper-973.jpg'

  return (
    <div className="group overflow-hidden rounded-lg bg-white  shadow-sm">
      <Toaster />
      <div className="relative">
        <img src={product.image} alt="Product" className="h-58 w-full object-cover" />
        {product.isDiscount && (
          <div className="text-black absolute top-0 right-0 m-2 rounded-md bg-red-500 px-2 py-1 text-sm ">
            -{product.discount}%
          </div>
        )}
        <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
          <button
           
            disabled={form.processing}
            className="mx-2 cursor-pointer rounded-full bg-white p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button className="mx-2 rounded-full bg-white p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="p-4 hover:bg-gray-100 cursor-pointer transition-all duration-100" onClick={() => handleDetail(product.slug)}>
        <h3 className="mb-2 text-sm font-medium text-black">{product.name}</h3>
        {/* <p className="mb-3 text-sm text-gray-700">{product.description}...</p> */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <span className="font-bold text-indigo-600">&#8358;{numberWithCommas(product.selling_price)}</span>
            {/* {product.isDiscount && <span className="ml-2 text-gray-700 line-through">$119.99</span>} */}
          </div>
          <div className="flex text-yellow-400">
            <Star size={'12px'} className='fill-current' />
            <Star size={'12px'} className='fill-current' />
            <Star size={'12px'} className='fill-current' />
            <Star size={'12px'} className='fill-current' />
            <StarHalf size={'12px'} className='' />
          </div>
        </div>
      </div>
        <div className="flex gap-4 p-3">
          <Button className='w-full bg-blue-600 text-white sm:text-sm'
             onClick={addToCart}
            disabled={product.quantity < 1}
          >
            {product.quantity < 1 ? 'Out of stock' :
            
            <div className='flex items-center gap-2'>
              <ShoppingCart />
              Add to cart
            </div>
            }
          </Button>
        </div>
    </div>
  )
}

export default ProductCard
