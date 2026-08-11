// import react from 'react'
// import { usePage, Link } from "@inertiajs/react";
// import {BarChart, Download, MapPin, CreditCard, User, LogOut} from 'lucide-react'

// export default function UserSidebar() {
//     const {auth} = usePage().props as any
//     const user = auth.user

//     const menuItems = [
//         {
//             icon: BarChart,
//             label: 'Dashboard',
//             href: '/dashboard',
//             active: true
//         },
//          {
//             icon: BarChart,
//             label: 'Orders',
//             href: '/user/orders',
//             active: false
//         },
//          {
//             icon: Download,
//             label: 'Download',
//             href: '/user/download',
//             active: false
//         },
//          {
//             icon: MapPin,
//             label: 'Addresses',
//             href: '/user/address',
//             active: false
//         },
         
//          {
//             icon: User,
//             label: 'Profile',
//             href: '/user/profile',
//             active:false
//         },
//     ]

//     return (
//         <div className='sticky top-6 overflow-hidden bg-white rounded-lg shadow-sm'>
//             <div className='border-b p-6'>
//                 <div className='flex justify-center items-center '>
//                     <div className='h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100'>
//                         <span className='text-xl font-bold text-indigo-600'>{user?.name?.charAt(0) || "U"}</span>
//                     </div>
//                     <div className='ml-4'>
//                         <h1 className='font-medium'>{user?.name || "User"}</h1>
//                         <p className='font-sm text-gray-600'>{ user?.email || "user@example.com"}</p>
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



import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { BarChart, Download, MapPin, User, LogOut, HistoryIcon, LayoutDashboard } from "lucide-react";

export default function UserSidebar() {
  // get current page props + url from inertia
  const { props, url: currentUrl } = usePage();
  const { auth } = props as any;
  const user = auth?.user;

  // define menu items
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/user/dashboard" },
    { icon: HistoryIcon, label: "Orders", href: "/user/orders" },
    // { icon: Download, label: "Download", href: "/user/download" },
    { icon: MapPin, label: "Addresses", href: "/user/address" },
    { icon: User, label: "Profile", href: "/user/profile" },
  ];

  // helper to check if a menu item is active
  const isActive = (path: string) => {
    if (!currentUrl) return false;
    return currentUrl === path || currentUrl.startsWith(path + "/");
  };

  return (
    <div className="sticky top-6 overflow-hidden bg-white rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="border-b p-6">
        <div className="flex justify-center items-center">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100">
            <span className="text-xl font-bold text-indigo-600">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="ml-4">
            <h1 className="font-medium">{user?.name || "User"}</h1>
            <p className="text-sm text-gray-600">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-2">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-md px-4 py-3 my-1 transition-colors ${
                active
                  ? "bg-indigo-50 text-indigo-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="my-3 border-t" />

        {/* Logout */}
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
