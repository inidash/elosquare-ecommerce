// import react from 'react'
// import { usePage, Link } from "@inertiajs/react";
// import {BarChart, Download, MapPin, CreditCard, User, LogOut, User2, DollarSignIcon, ShoppingBag, ShoppingCart, BookmarkCheck} from 'lucide-react'

// export default function vendorSideBar() {
//     const {auth} = usePage().props as any
//     const user = auth.user

//     const menuItems = [
//         {
//             icon: BarChart,
//             label: 'Dashboard',
//             href: '/vendor/dashboard',
//             active: true
//         },
//          {
//             icon: ShoppingCart,
//             label: 'Orders',
//             href: '/vendor/orders',
           
//         },
//          {
//             icon: ShoppingBag,
//             label: 'Products',
//             href: '/vendor/products',

//         },
//          {
//             icon: User2,
//             label: 'Profile',
//             href: '/vendor/profile',
         
//         },
        
//         {
//            icon: BookmarkCheck,
//            label: 'Account Details',
//            href: '/vendor/account-details',
           
//        },
//         {
//             icon: CreditCard,
//             label: 'Payment',
//             href: '/vendor/payments',

//         },
//     ]

//     return (
//         <div className='sticky top-6 overflow-hidden bg-white rounded-lg shadow-sm'>
//             <div className='border-b p-6'>
//                 <div className='flex justify-between items-center px-4'>
//                     <div className='h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100'>
//                         <span className='text-xl font-bold text-indigo-600'>{user?.name?.charAt(0) || "U"}</span>
//                     </div>
//                     <div className='ml-4 text-gray-600'>
//                         <p className="font-medium">Vendor</p>
//                         <p className='font-bold'>{user?.name || "User"}</p>
//                         {/* <p className='font-sm text-gray-600'>{ user?.email || "user@example.com"}</p> */}
//                     </div>
//                 </div>
//             </div>
//             <nav className='p-2'>
//                 { menuItems.map((item) => (
//                     <Link
//                         key={item.href}
//                         href={item.href}
//                         className= {`flex items-center rounded-md px-4 my-3
//                              ${item.active ? 'bg-indigo-50 text-indigo-600' :
//                              'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'}`}
//                     >
//                         <item.icon className='mr-3 h-5 w-5 ' />
//                         <span>{item.label} </span>
//                     </Link>
//                 )) }
//                 <div className='my-3 border-t'></div>
//                 <Link
//                     href='/logout'
//                     method='post'
//                     as='button'
//                     className='flex w-full items-center rounded-md px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-600'
//                 >
//                     <LogOut className='mr-3 w-5 h-5 ' />
//                     <span>Logout</span>
//                 </Link>
//             </nav>
//         </div>
//     )
// }

// // import { NavMain } from '@/components/nav-main'
// // import { NavUser } from '@/components/nav-user'
// // import {
// //   Sidebar,
// //   SidebarContent,
// //   SidebarFooter,
// //   SidebarHeader,
// //   SidebarMenu,
// //   SidebarMenuButton,
// //   SidebarMenuItem,
// // } from '@/components/ui/sidebar'
// // import { type NavItem } from '@/types'
// // import { Link } from '@inertiajs/react'
// // import {
// //   BookOpen,
// //   Diamond,
// //   Folder,
// //   LayoutGrid,
// //   ShoppingBag,
// //   TagIcon,
// //   User,
// //   Users,
// // } from 'lucide-react'
// // // import AppLogo from './app-logo'

// // const mainNavItems: NavItem[] = [
// //   {
// //     title: 'Dashboard',
// //     href: '/vendor/dashboard', 
// //     icon: LayoutGrid,
// //   },
// //   {
// //     title: 'Orders',
// //     href: '/vendor/orders',
// //     icon: ShoppingBag,
// //   },
// //   {
// //     title: 'Products',
// //     href: '/vendor/products',
// //     icon: Diamond,
// //   },

// // ]

// // export default function AppSidebar() {
// //   return (
// //     <Sidebar collapsible="icon" variant="inset">
// //       <SidebarHeader>
// //         <SidebarMenu>
// //           <SidebarMenuItem>
// //             <SidebarMenuButton size="lg" asChild>
// //               <Link href="/dashboard" prefetch>
// //                 {/* <AppLogo /> */}
// //               </Link>
// //             </SidebarMenuButton>
// //           </SidebarMenuItem>
// //         </SidebarMenu>
// //       </SidebarHeader>

// //       <SidebarContent>
// //         <NavMain items={mainNavItems} />
// //       </SidebarContent>

// //       <SidebarFooter>
// //         <NavUser />
// //       </SidebarFooter>
// //     </Sidebar>
// //   )
// // }

import React from 'react'
import { usePage, Link } from "@inertiajs/react";
import {
  BarChart,
  CreditCard,
  User2,
  ShoppingBag,
  ShoppingCart,
  BookmarkCheck,
  LogOut
} from 'lucide-react';

export default function VendorSidebar() {
  const { props, url: currentUrl } = usePage() as any;
  const user = props.auth?.user;


  const isActive = (href: string) => {
    if (!currentUrl) return false;
    return currentUrl === href || currentUrl.startsWith(href + '/');
  };

  const menuItems = [
    { icon: BarChart, label: 'Dashboard', href: '/vendor/dashboard' },
    { icon: ShoppingCart, label: 'Orders', href: '/vendor/orders' },
    { icon: ShoppingBag, label: 'Products', href: '/vendor/products' },
    { icon: User2, label: 'Profile', href: '/vendor/profile' },
    { icon: BookmarkCheck, label: 'Account Details', href: '/vendor/account-details' },
    { icon: CreditCard, label: 'Payment', href: '/vendor/payments' },
    { icon: BarChart, label: 'Upgrade Plan', href: '/vendor/upgrade' },
  ];

  return (
    <div className="sticky top-6 overflow-hidden bg-white rounded-lg shadow-sm">
      <div className="border-b p-6">
        <div className="flex justify-between items-center px-4">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100">
            <span className="text-xl font-bold text-indigo-600">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="ml-4 text-gray-600">
            <p className="font-medium">Vendor</p>
            <p className="font-bold">{user?.name || 'User'}</p>
          </div>
        </div>
      </div>

      <nav className="p-2">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-md px-4 py-3 my-1 transition-colors duration-150 ${
                active
                  ? 'bg-indigo-50 text-indigo-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="my-3 border-t"></div>

        <Link
          href="/logout"
          method="post"
          as="button"
          className="flex w-full items-center rounded-md px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-600"
        >
          <LogOut className="mr-3 w-5 h-5" />
          <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
}

