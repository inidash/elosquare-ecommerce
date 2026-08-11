import   VendorSideBar  from './vendorSideBar'
import EcomLayout from '@/layouts/ecom-layout'
import { BreadcrumbItem } from '@/types';
import {Link} from '@inertiajs/react'
import { useState } from 'react';

interface UserpropsLayout {
    children: React.ReactNode,
    title?: string
}
export default function VendorLayout({children}:{children: React.ReactNode}) {
     const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    return (
        // <EcomLayout>
        //     <div className="container mx-auto px-4 py-8">
        //         <h1 className="text-2xl font-bold mb-6">My Account</h1>

        //         <div className="flex flex-col lg:flex-row gap-8">

        //             <div className="lg:w-1/4">
        //                 <VendorSideBar />
        //             </div>
                    
        //             <div className="lg:w-3/4">
        //                 {children}
        //             </div>
        //         </div>
        //     </div>
        // </EcomLayout>

        <EcomLayout>
      <div className="container mx-auto px-4 py-8 relative">
        {/* Header with Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Vendor Dashboard</h1>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden p-2 cursor-pointer transition-color duration-200 rounded-md border border-gray-300 hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {sidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Section */}
          <div
            className={`
              fixed inset-y-0 left-0 z-40 transform bg-white shadow-lg w-64 p-4
              transition-transform duration-300 ease-in-out
              lg:static lg:translate-x-0 lg:w-1/4
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <VendorSideBar />

            {/* Close Button for Mobile */}
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-gray-500 lg:hidden"
            >
              ✕
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:w-3/4">{children}</div>
        </div>

        {/* Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-40 lg:hidden z-30"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>
    </EcomLayout>
    );
}
