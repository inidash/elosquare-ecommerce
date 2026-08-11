import React, { useState } from "react";
import {
  ServerIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CogIcon,
  ShoppingCart,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { BoxIcon, CloudLightningIcon } from "lucide-react";
import { Link } from "@inertiajs/react";

interface FeatureTab {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  details: {
    title: string;
    description: string;
  }[];
  image: string;
  gradient: string;
}

const featureTabs: FeatureTab[] = [
  {
    id: "vendor",
    name: "Vendor Products",
    description: "Explore a variety of products from our vendors.",
    icon: ShoppingBagIcon,
    details: [
      {
        title: "Vendors on free plan",
        description:
          "Our platform allow vendors to be on free plan, but with limited access",
      },
      {
        title: "Vendors on paid plan",
        description:
          "Vendors on the paid plan have unlimited product upload",
      },
      {
        title: "Vendor settlement",
        description: "Vendors receive their money as sales are completed",
      },
    ],
    image:
      "/images/p-5.jpg",
    gradient: "from-sky-400 to-blue-600",
  },
  {
    id: "deals",
    name: "Exclusive Deals",
    description: "Discover amazing deals on selected products.",
    icon: ShoppingCartIcon,
    details: [
      {
        title: "New product arrival",
        description: "Explore latest products as they arrive",
      },
      {
        title: "Best selling products",
        description: "Take note of products with the highest sales volume",
      },
      
    ],
    image:
      "https://img.freepik.com/free-photo/technician-doing-checkup-server-farm_482257-90825.jpg?t=st=1744110560~exp=1744114160~hmac=e29f2785bc6181aff11482926d782cb501b9839085de5cf2e292525e7ebd74be&w=1380",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Vendor and user dashboard for proper and transparent transaction history",
    icon: BoxIcon,
    details: [
      {
        title: "User dashboard",
        description: "Registered users dashboard for order histories",
      },
      {
        title: "Vendor dashboard",
        description: "for product uploads and order history",
      },
      {
        title: "Admin Dashboard ",
        description:
          "For overall monitoring of transactions",
      },
      
    ],
    image:
      "https://img.freepik.com/free-vector/server-room-cloud-storage-icon-datacenter-database-concept-data-exchange-process_39422-556.jpg?t=st=1744110575~exp=1744114175~hmac=dc7160a546f224c9c8d1923938af6e54217e9ba183d5cefacb3a613eb194f24f&w=1380",
    gradient: "from-amber-400 to-orange-600",
  },
  {
    id: "payment",
    name: "Payment",
    description: "Safe and secure payment gateway for each transaction",
    icon: BoxIcon,
    details: [
      {
        title: "Card payment",
        description: "Online and secure card payment gateway",
      },
      {
        title: "Cash on delivery",
        description: "customers can opt for payment on delivery",
      },
      
    ],
    image:
      "https://img.freepik.com/free-vector/server-room-cloud-storage-icon-datacenter-database-concept-data-exchange-process_39422-556.jpg?t=st=1744110575~exp=1744114175~hmac=dc7160a546f224c9c8d1923938af6e54217e9ba183d5cefacb3a613eb194f24f&w=1380",
    gradient: "from-amber-400 to-orange-600",
  },
];

export default function ComingSoon() {
  const [activeTab, setActiveTab] = useState(featureTabs[0].id);

  const currentFeature =
    featureTabs.find((tab) => tab.id === activeTab) || featureTabs[0];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/20">
            <svg
              className="mr-1.5 h-2 w-2 fill-indigo-600"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx="3" cy="3" r="3" />
            </svg>
            E-commerce Platform
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Elosquare
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-sm"></span>
            </span>{" "}
            Coming Soon
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive E-commerce platform provides access to trusted vendor products and deals
          </p>
        </div>

        <div className="mt-16">
          <div className="flex overflow-x-auto pb-4 sm:justify-center">
            <div className="inline-flex items-center space-x-2 rounded-full bg-gray-50 p-1.5">
              {featureTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? `bg-white text-gray-900 shadow-sm ring-1 ring-gray-900/10`
                      : `text-gray-600 hover:text-gray-900`
                  }`}
                >
                  <tab.icon
                    className={`mr-1.5 h-4 w-4 ${
                      activeTab === tab.id ? "text-indigo-600" : "text-gray-400"
                    }`}
                  />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative">
                <div
                  className={`absolute -inset-4 bg-gradient-to-r ${currentFeature.gradient} opacity-10 blur-xl rounded-3xl`}
                ></div>
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={currentFeature.image}
                    alt={`${currentFeature.name} feature`}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className={`inline-flex items-center rounded-full bg-gradient-to-r ${currentFeature.gradient} px-3 py-1 text-sm font-medium text-white mb-2`}
                    >
                      {currentFeature.name}
                    </div>
                    <p className="text-base font-medium text-white">
                      {currentFeature.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${currentFeature.gradient} shadow-md mb-6`}
                >
                  <currentFeature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {currentFeature.name}
                </h3>

                <p className="mt-3 text-lg text-gray-600">
                  {currentFeature.description}
                </p>

                <div className="mt-8 space-y-6">
                  {currentFeature.details.map((detail, index) => (
                    <div key={index} className="flex">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${currentFeature.gradient} bg-opacity-10`}
                      >
                        <span className="text-sm font-medium text-indigo-600">
                          {index + 1}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-base font-semibold text-gray-900">
                          {detail.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {detail.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Link href="/shop">
                    <button
                      className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r ${currentFeature.gradient} hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                      >
                      Learn more about {currentFeature.name.toLowerCase()}
                      <svg
                        className="ml-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
