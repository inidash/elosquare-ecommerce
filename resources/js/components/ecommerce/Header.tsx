// import { Link, usePage } from '@inertiajs/react';
// import { ChevronDown, Facebook, Instagram, Menu, Search, ShoppingCart, Twitter, User } from 'lucide-react';
// import { useState } from 'react';
// import CategoryMenuItem from './CategoryMenuItem';
// import { Button } from '../ui/button';
// import SearchBar from './SearchBar';




// export default function EcommerceHeader() {
//     const { parentCategories, auth, cartCount = 0 } = usePage().props as any;
//     const [isCartOpen, setIsCartOpen] = useState(false);
//     const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
//     const [isLanguageOpen, setIsLanguageOpen] = useState(false);
//     const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
//     const [isSubCategoriesOpen, setIsSubCategoriesOpen] = useState(false);

//     return (
//         <>
//             {/* Top Header */}
//             {/* <div className="bg-gray-800 py-2 text-white">
//                 <div className="container mx-auto flex items-center justify-between px-4">
                    
//                     <div className="flex items-center space-x-6">
//                         Currency Dropdown
//                         <div className="relative">
//                             <button onClick={() => setIsCurrencyOpen(!isCurrencyOpen)} className="flex items-center space-x-1 hover:text-gray-300">
//                                 <span>USD</span>
//                                 <ChevronDown className="h-3 w-3" />
//                             </button>
//                             {isCurrencyOpen && (
//                                 <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-md bg-white text-gray-800 shadow-lg">
//                                     <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
//                                         USD - US Dollar
//                                     </Link>
//                                     <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
//                                         EUR - Euro
//                                     </Link>
//                                     <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
//                                         GBP - British Pound
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>

//                         Language Dropdown
//                         <div className="relative">
//                             <button onClick={() => setIsLanguageOpen(!isLanguageOpen)} className="flex items-center space-x-1 hover:text-gray-300">
//                                 <span>English</span>
//                                 <ChevronDown className="h-3 w-3" />
//                             </button>
//                             {isLanguageOpen && (
//                                 <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-md bg-white text-gray-800 shadow-lg">
//                                     <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
//                                         English
//                                     </Link>
//                                     <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
//                                         Français
//                                     </Link>
//                                     <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
//                                         Español
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div> */}

//             {/* Main Header */}
//             <header className="bg-gray-800 text-white py-4 shadow-sm">
//                 <div className="container mx-auto flex items-center justify-between px-4">
//                     <Link href="/" className="text-2xl font-bold text-white">
//                         Elosquare
//                     </Link>

//                     <div className="mx-8 max-w-xl flex-1">
//                         <div className="relative">
//                             {/* <input
//                                 type="text"
//                                 placeholder="Search for products..."
//                                 className="w-full rounded-full border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                             /> */}
//                             <SearchBar />
//                             {/* <button className="absolute top-0 right-0 h-full px-4 text-gray-500 hover:text-indigo-600">
//                                 <Search className="h-5 w-5" />
//                             </button> */}
//                         </div>
//                     </div>

//                     <div className="flex items-center space-x-6">
//                         {/* Cart Dropdown */}
//                         <div className="relative">
//                             <Link href={route('cart.index')} className="relative hover:text-indigo-600">
//                                 <ShoppingCart className="h-6 w-6 text-blue-300" />
//                                 {cartCount > 0 && (
//                                     <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
//                                         {cartCount}
//                                     </span>
//                                 )}
//                             </Link>
//                         </div>

//                         {/* Conditional Auth Section */}
//                         {auth.user ? (
//                             <div className="flex items-center space-x-4">
//                                 <Link href={route('dashboard')} className="flex items-center space-x-1 text-gray-300 hover:text-indigo-600">
//                                     <User className="h-5 w-5" />
//                                     <span>{auth.user.name}</span>
//                                 </Link>
//                                 <Link href={route('logout')} method="post" as="button" className="text-gray-300 hover:text-indigo-600">
//                                     Logout
//                                 </Link>
//                             </div>
//                         ) : (
//                             <div className="flex space-x-4">
//                                 <Link href="/login" type='button' className="text-gray-300 hover:text-indigo-600  ">
//                                     Login
//                                 </Link>
//                                 <span className="text-gray-300">|</span>
//                                 <Link href="/register" className="text-gray-300 hover:text-indigo-600">
//                                     <Button className='bg-white text-black hover:bg-transparent hover:border-rounded-2xl hover:text-black transition-all duration-200'>Register</Button>
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </header>

//             {/* Navigation */}
//             <nav className="bg-gray-800 text-white shadow">
//                 <div className="container mx-auto px-4">
//                     <div className='flex justify-between items-center'>
//                         <div className="flex text-white">
//                             <div className="group dropdown relative" x-data="{ open: false }">
//                                 <button
//                                     onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
//                                     className="flex items-center px-4 py-3 hover:text-indigo-600 focus:outline-none"
//                                 >
//                                     <Menu className="mr-2 h-5 w-5" />
//                                     <span>All Categories</span>
//                                     <ChevronDown className="ml-1 h-3 w-3" />
//                                 </button>
//                                 <div x-show="open" className="dropdown-menu absolute left-0 z-50 w-64 rounded-b-md bg-gray-600 text-white shadow-lg">
//                                     {/* <!-- Category with subcategories --> */}
//                                     {parentCategories.length > 0 &&
//                                         parentCategories.map((category: any) => <CategoryMenuItem key={category.id} category={category} />)}
//                                 </div>
//                             </div>

//                             {/* Main Menu */}
//                             <ul className="flex">
//                                 <li>
//                                     <Link href="/" className="flex items-center px-4 py-3  hover:text-indigo-600">
//                                         Home
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link href="/shop" className="flex items-center px-4 py-3  hover:text-indigo-600">
//                                         Shop
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link href="/new-arrivals" className="flex items-center px-4 py-3  hover:text-indigo-600">
//                                         New Arrivals
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link href="/deals" className="flex items-center px-4 py-3  hover:text-indigo-600">
//                                         Deals
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link href="/contact" className="flex items-center px-4 py-3  hover:text-indigo-600">
//                                         Contact
//                                     </Link>
//                                 </li>
//                             </ul>
                            
//                         </div>
//                             <div className="flex space-x-4">
//                                 <Link href="#" className="hover:text-gray-300">
//                                     <Facebook className="h-5 w-5" />
//                                 </Link>
//                                 <Link href="#" className="hover:text-gray-300">
//                                     <Twitter className="h-5 w-5" />
//                                 </Link>
//                                 <Link href="#" className="hover:text-gray-300">
//                                     <Instagram className="h-5 w-5" />
//                                 </Link>
//                             </div>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     );
// }


// import { Link, usePage } from '@inertiajs/react';
// import {
//   Menu,
//   X,
//   ChevronDown,
//   ShoppingCart,
//   User,
//   Facebook,
//   Twitter,
//   Instagram,
// } from 'lucide-react';
// import { useState } from 'react';
// import CategoryMenuItem from './CategoryMenuItem';
// import SearchBar from './SearchBar';
// import { Button } from '../ui/button';

// export default function EcommerceHeader() {
//   const { parentCategories = [], auth, cartCount = 0 } = usePage().props as any;
//   const [isDesktopCategoriesOpen, setIsDesktopCategoriesOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <>
//       {/* Header */}
//       <header className="bg-gray-800 text-white shadow-sm">
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//           {/* Left: logo + categories */}
//           <div className="flex items-center space-x-4">
//             <Link href="/" className="text-2xl font-bold">
//             <img src="/logo.png" alt="logo" className='h-[60px] w-[70px] md:h-[90px] md:w-[110px]' />
//               {/* <span>EloSquare</span> */}
//             </Link>

//             {/* Desktop: categories */}
//             <div
//               className="hidden md:block relative"
//               onMouseEnter={() => setIsDesktopCategoriesOpen(true)}
//               onMouseLeave={() => setIsDesktopCategoriesOpen(false)}
//             >
//               <button
//                 onClick={() => setIsDesktopCategoriesOpen(!isDesktopCategoriesOpen)}
//                 className="flex items-center px-3 py-2 hover:text-indigo-400"
//               >
//                 <Menu className="mr-2 h-5 w-5" />
//                 <span>All Categories</span>
//                 <ChevronDown className="ml-1 h-4 w-4" />
//               </button>

//               {/* Desktop dropdown */}
//               <div
//                 className={`absolute left-0 top-full mt-2 z-50 w-72 rounded-md bg-gray-800 shadow-lg border border-gray-700 transition-all duration-200 ${
//                   isDesktopCategoriesOpen
//                     ? 'opacity-100 visible'
//                     : 'opacity-0 invisible pointer-events-none'
//                 }`}
//               >
//                 {parentCategories.length > 0 ? (
//                   parentCategories.map((c: any) => (
//                     <CategoryMenuItem key={c.id} category={c} />
//                   ))
//                 ) : (
//                   <div className="px-4 py-3 text-gray-300">No categories</div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Search bar (desktop only) */}
//           <div className="hidden md:flex flex-1 justify-center px-4 max-w-xl">
//             <SearchBar />
//           </div>

//           {/* Right actions */}
//           <div className="flex items-center space-x-4">
//             <Link href={route('cart.index')} className="relative hover:text-indigo-400">
//               <ShoppingCart className="h-6 w-6 text-blue-300" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {auth?.user ? (
//               <div className="hidden md:flex items-center space-x-3">
//                 <Link
//                   href={route('dashboard')}
//                   className="flex items-center hover:text-indigo-400"
//                 >
//                   <User className="h-5 w-5 mr-1" />
//                   <span>{auth.user.name}</span>
//                 </Link>
//                 <Link
//                   href={route('logout')}
//                   method="post"
//                   as="button"
//                   className="text-gray-300 hover:text-indigo-400"
//                 >
//                   Logout
//                 </Link>
//               </div>
//             ) : (
//               <div className="hidden md:flex items-center space-x-3">
//                 <Link href="/login" className="hover:text-indigo-400">
//                   Login
//                 </Link>
//                 <span className="text-gray-400">|</span>
//                 <Link href="/register">
//                   <Button className="bg-white text-black hover:bg-transparent hover:border hover:text-white transition-all duration-200">
//                     Register
//                   </Button>
//                 </Link>
//               </div>
//             )}

//             {/* Mobile toggle */}
//             <button
//               className="md:hidden p-2 focus:outline-none"
//               onClick={() => setIsMobileMenuOpen(true)}
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//           </div>
//         </div>

//         {/* Mobile search */}
//         <div className="md:hidden px-4 pb-3">
//           <SearchBar />
//         </div>
//       </header>

//       {/* Main nav */}
//       <nav className="bg-gray-800 text-white">
//         <div className="container mx-auto px-4">
//           <div className="hidden md:flex items-center justify-between">
//             <ul className="flex">
//               <li><Link href="/" className="px-4 py-3 hover:text-indigo-400">Home</Link></li>
//               <li><Link href="/shop" className="px-4 py-3 hover:text-indigo-400">Shop</Link></li>
//               <li><Link href="/new-arrivals" className="px-4 py-3 hover:text-indigo-400">New Arrivals</Link></li>
//               <li><Link href="/deals" className="px-4 py-3 hover:text-indigo-400">Deals</Link></li>
//               <li><Link href="/contact" className="px-4 py-3 hover:text-indigo-400">Contact</Link></li>
//             </ul>

//             <div className="flex items-center space-x-4">
//               <Link href="#" className="hover:text-indigo-400"><Facebook className="h-5 w-5" /></Link>
//               <Link href="#" className="hover:text-indigo-400"><Twitter className="h-5 w-5" /></Link>
//               <Link href="#" className="hover:text-indigo-400"><Instagram className="h-5 w-5" /></Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile slide drawer */}
//       <div
//         className={`fixed inset-0 z-50 md:hidden transition-all ${
//           isMobileMenuOpen ? 'visible' : 'invisible'
//         }`}
//       >
//         <div
//           className={`fixed inset-0 bg-black/50 transition-opacity ${
//             isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
//           }`}
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//         <aside
//           className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white transform transition-transform duration-300 ${
//             isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
//           }`}
//         >
//           <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
//             <div className="text-lg font-bold">Elosquare</div>
//             <button onClick={() => setIsMobileMenuOpen(false)}>
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           <div className="p-4 border-b border-gray-700">
//             <SearchBar />
//           </div>

//           <div className="overflow-y-auto max-h-[calc(100vh-180px)] px-2 pb-8">
//             <div className="text-sm font-semibold px-3 py-2 text-gray-300">
//               Categories
//             </div>
//             {parentCategories.map((cat: any) => (
//               <CategoryMenuItem key={cat.id} category={cat} />
//             ))}
//           </div>
//         </aside>
//       </div>
//     </>
//   );
// }


// import { Link, usePage } from '@inertiajs/react';
// import {
//   Menu,
//   X,
//   ChevronDown,
//   ShoppingCart,
//   User,
//   Facebook,
//   Twitter,
//   Instagram,
// } from 'lucide-react';
// import { useState, useRef, useEffect } from 'react';
// import CategoryMenuItem from './CategoryMenuItem';
// import SearchBar from './SearchBar';
// import { Button } from '../ui/button';

// export default function EcommerceHeader() {
//   const { parentCategories = [], auth, cartCount = 0 } = usePage().props as any;
//   const [isDesktopCategoriesOpen, setIsDesktopCategoriesOpen] = useState(false);
//   const [isCategoriesLocked, setIsCategoriesLocked] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setIsDesktopCategoriesOpen(false);
//         setIsCategoriesLocked(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Hover logic only when not locked
//   const handleMouseEnter = () => {
//     if (!isCategoriesLocked) setIsDesktopCategoriesOpen(true);
//   };
//   const handleMouseLeave = () => {
//     if (!isCategoriesLocked) setIsDesktopCategoriesOpen(false);
//   };

//   // Click toggles lock + visibility
//   const handleCategoryClick = () => {
//     if (isCategoriesLocked) {
//       setIsCategoriesLocked(false);
//       setIsDesktopCategoriesOpen(false);
//     } else {
//       setIsCategoriesLocked(true);
//       setIsDesktopCategoriesOpen(true);
//     }
//   };

//   return (
//     <>
//       {/* Header */}
//       <header className="bg-gray-800 text-white shadow-sm">
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//           {/* Left: logo + categories */}
//           <div className="flex items-center space-x-4">
//             <Link href="/" className="text-2xl font-bold">
//               <img
//                 src="/logo.png"
//                 alt="logo"
//                 className="h-[60px] w-[70px] md:h-[90px] md:w-[110px]"
//               />
//             </Link>

//             {/* All Categories dropdown (works on all screens) */}
//             <div
//               ref={dropdownRef}
//               className="relative"
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//             >
//               <button
//                 onClick={handleCategoryClick}
//                 className="flex items-center px-3 py-2 hover:text-indigo-400 focus:outline-none"
//               >
//                 <Menu className="mr-2 h-5 w-5" />
//                 <span>All Categories</span>
//                 <ChevronDown
//                   className={`ml-1 h-4 w-4 transition-transform duration-200 ${
//                     isDesktopCategoriesOpen ? 'rotate-180 text-indigo-400' : ''
//                   }`}
//                 />
//               </button>

//               {/* Dropdown menu */}
//               <div
//                 className={`absolute left-0 top-full mt-2 z-50 w-72 rounded-md bg-gray-800 shadow-lg border border-gray-700 transition-all duration-300 transform ${
//                   isDesktopCategoriesOpen
//                     ? 'opacity-100 visible translate-y-0'
//                     : 'opacity-0 invisible -translate-y-2 pointer-events-none'
//                 }`}
//               >
//                 {parentCategories.length > 0 ? (
//                   parentCategories.map((c: any) => (
//                     <CategoryMenuItem key={c.id} category={c} />
//                   ))
//                 ) : (
//                   <div className="px-4 py-3 text-gray-300">No categories</div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Search bar (desktop only) */}
//           <div className="hidden md:flex flex-1 justify-center px-4 max-w-xl">
//             <SearchBar />
//           </div>

//           {/* Right actions */}
//           <div className="flex items-center space-x-4">
//             <Link href={route('cart.index')} className="relative hover:text-indigo-400">
//               <ShoppingCart className="h-6 w-6 text-blue-300" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* Auth section — visible on all screens */}
//             {auth?.user ? (
//               <div className="flex items-center space-x-3">
//                 <Link
//                   href={route('dashboard')}
//                   className="flex items-center hover:text-indigo-400"
//                 >
//                   <User className="h-5 w-5 mr-1" />
//                   <span className="hidden md:inline">{auth.user.name}</span>
//                 </Link>
//                 <Link
//                   href={route('logout')}
//                   method="post"
//                   as="button"
//                   className="text-gray-300 hover:text-indigo-400 text-sm md:text-base"
//                 >
//                   Logout
//                 </Link>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <Link href="/login" className="hover:text-indigo-400 text-sm md:text-base">
//                   Login
//                 </Link>
//                 <span className="text-gray-400 hidden md:inline">|</span>
//                 <Link href="/register">
//                   <Button className="bg-white text-black hover:bg-transparent hover:border hover:text-white transition-all duration-200 text-sm md:text-base">
//                     Register
//                   </Button>
//                 </Link>
//               </div>
//             )}

//             {/* Mobile menu toggle */}
//             <button
//               className="md:hidden p-2 focus:outline-none"
//               onClick={() => setIsMobileMenuOpen(true)}
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//           </div>
//         </div>

//         {/* Mobile search */}
//         <div className="md:hidden px-4 pb-3">
//           <SearchBar />
//         </div>
//       </header>

//       {/* Main nav (desktop only) */}
//       <nav className="bg-gray-800 pb-4 text-white hidden md:block">
//         <div className="container mx-auto px-4 flex items-center justify-between">
//           <ul className="flex">
//             <li><Link href="/" className="px-4 py-3 hover:text-indigo-400">Home</Link></li>
//             <li><Link href="/shop" className="px-4 py-3 hover:text-indigo-400">Shop</Link></li>
//             <li><Link href="/new-arrivals" className="px-4 py-3 hover:text-indigo-400">New Arrivals</Link></li>
//             <li><Link href="/deals" className="px-4 py-3 hover:text-indigo-400">Deals</Link></li>
//             <li><Link href="/contact" className="px-4 py-3 hover:text-indigo-400">Contact</Link></li>
//           </ul>
//         </div>
//       </nav>

//       {/* Mobile drawer */}
//       <div
//         className={`fixed inset-0 z-50 md:hidden transition-all ${
//           isMobileMenuOpen ? 'visible' : 'invisible'
//         }`}
//       >
//         <div
//           className={`fixed inset-0 bg-black/50 transition-opacity ${
//             isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
//           }`}
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//         <aside
//           className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white transform transition-transform duration-300 ${
//             isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
//           }`}
//         >
//           <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
//             <div className="text-lg font-bold">Elosquare</div>
//             <button onClick={() => setIsMobileMenuOpen(false)}>
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           {/* Auth options inside drawer */}
//           <div className="p-4 border-b border-gray-700">
//             {auth?.user ? (
//               <div className="flex flex-col space-y-2">
//                 <span className="font-semibold">Hi, {auth.user.name}</span>
//                 <Link
//                   href={route('logout')}
//                   method="post"
//                   as="button"
//                   className="text-red-400 hover:text-red-300 text-left"
//                 >
//                   Logout
//                 </Link>
//               </div>
//             ) : (
//               <div className="flex space-x-3">
//                 <Link href="/login" className="text-indigo-400 hover:underline">
//                   Login
//                 </Link>
//                 <Link href="/register" className="text-indigo-400 hover:underline">
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>

//           <div className="p-4 border-b border-gray-700">
//             <SearchBar />
//           </div>

//           <div className="overflow-y-auto max-h-[calc(100vh-180px)] px-2 pb-8">
//             <div className="text-sm font-semibold px-3 py-2 text-gray-300">
//               Categories
//             </div>
//             {parentCategories.map((cat: any) => (
//               <CategoryMenuItem key={cat.id} category={cat} />
//             ))}
//           </div>
//         </aside>
//       </div>
//     </>
//   );
// }



import { Link, usePage } from "@inertiajs/react";
import { Menu, X, ChevronDown, ShoppingCart, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import CategoryMenuItem from "./CategoryMenuItem";
import SearchBar from "./SearchBar";
import { Button } from "../ui/button";

export default function EcommerceHeader() {
  const { props, url: currentUrl } = usePage();
  const { parentCategories = [], auth, cartCount = 0 } = props as any;

  const [isDesktopCategoriesOpen, setIsDesktopCategoriesOpen] = useState(false);
  const [isCategoriesLocked, setIsCategoriesLocked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDesktopCategoriesOpen(false);
        setIsCategoriesLocked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (!isCategoriesLocked) setIsDesktopCategoriesOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isCategoriesLocked) setIsDesktopCategoriesOpen(false);
  };

  const handleCategoryClick = () => {
    if (isCategoriesLocked) {
      setIsCategoriesLocked(false);
      setIsDesktopCategoriesOpen(false);
    } else {
      setIsCategoriesLocked(true);
      setIsDesktopCategoriesOpen(true);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "New Arrivals", href: "/new-arrivals" },
    // { label: "Deals", href: "/deals" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (!currentUrl) return false;
    return currentUrl === path || currentUrl.startsWith(path + "/");
  };

  return (
    <>
      {/* ===== HEADER TOP ===== */}
      <header className="bg-gray-800 text-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Logo & Categories */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold">
              <img
                src="/logo.png"
                alt="logo"
                className="h-[60px] w-[70px] md:h-[90px] md:w-[110px]"
              />
            </Link>

            {/* All Categories dropdown (desktop) */}
            <div
              ref={dropdownRef}
              className="relative hidden md:block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={handleCategoryClick}
                className="flex items-center px-3 py-2 hover:text-indigo-400 focus:outline-none"
              >
                <Menu className="mr-2 h-5 w-5" />
                <span>All Categories</span>
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isDesktopCategoriesOpen ? "rotate-180 text-indigo-400" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              <div
                className={`absolute left-0 top-full mt-2 z-50 w-72 rounded-md bg-gray-800 shadow-lg border border-gray-700 transition-all duration-300 transform ${
                  isDesktopCategoriesOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                {parentCategories.length > 0 ? (
                  parentCategories.map((c: any) => (
                    <CategoryMenuItem key={c.id} category={c} />
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-300">No categories</div>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center px-4 max-w-xl">
            <SearchBar />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              href={route("cart.index")}
              className={`relative flex ${
                isActive("/cart") ? "text-yellow-400" : "hover:text-indigo-400"
              }`}
            >
              <span className="text-blue-300">Cart</span>
              <ShoppingCart className="h-6 w-6 text-blue-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {auth?.user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href={route("dashboard")}
                  className={`flex items-center ${
                    isActive("/dashboard")
                      ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                      : "hover:text-indigo-400"
                  }`}
                >
                  <User className="h-5 w-5 mr-1" />
                  <span className="hidden md:inline">{auth.user.name}</span>
                </Link>

                <Link
                  href={route("logout")}
                  method="post"
                  as="button"
                  className="text-gray-300 hover:text-indigo-400 text-sm md:text-base"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className={`text-sm md:text-base ${
                    isActive("/login")
                      ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                      : "hover:text-indigo-400"
                  }`}
                >
                  Login
                </Link>
                <span className="text-gray-400 hidden md:inline">|</span>
                <Link href="/register">
                  <Button className="bg-white text-black hover:bg-transparent hover:border hover:text-white transition-all duration-200 text-sm md:text-base">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </header>

      {/* ===== MAIN NAV (Desktop only) ===== */}
      <nav className="bg-gray-800 pb-4 text-white hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <ul className="flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-3 transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-yellow-400 border-yellow-400 pb-1"
                      : "hover:text-indigo-400"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ===== MOBILE DRAWER ===== */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <div className="text-lg font-bold">Elosquare</div>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Auth options */}
          <div className="p-4 border-b border-gray-700">
            {auth?.user ? (
              <div className="flex flex-col space-y-2">
                <span className="font-semibold">Hi, {auth.user.name}</span>
                <Link
                  href={route("logout")}
                  method="post"
                  as="button"
                  className="text-red-400 hover:text-red-300 text-left"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  href="/login"
                  className={`text-indigo-400 hover:underline ${
                    isActive("/login") ? "text-yellow-400 underline" : ""
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`text-indigo-400 hover:underline ${
                    isActive("/register") ? "text-yellow-400 underline" : ""
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile nav links */}
          <ul className="px-4 py-3 border-b border-gray-700 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-2 py-1 ${
                    isActive(link.href)
                      ? "text-yellow-400 font-semibold"
                      : "hover:text-indigo-400"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* All Categories (collapsible) */}
          <div className="border-b border-gray-700">
            <button
              onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-300 hover:text-indigo-400"
            >
              <span className="flex items-center">
                <Menu className="mr-2 h-5 w-5" />
                All Categories
              </span>
              <ChevronDown
                className={`h-4 w-4 transform transition-transform ${
                  isMobileCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMobileCategoriesOpen && (
              <div className="px-2 pb-4 space-y-1">
                {parentCategories.map((cat: any) => (
                  <CategoryMenuItem key={cat.id} category={cat} />
                ))}
              </div>
            )}
          </div>

          {/* Search (Mobile) */}
          <div className="p-4">
            <SearchBar />
          </div>
        </aside>
      </div>
    </>
  );
}
