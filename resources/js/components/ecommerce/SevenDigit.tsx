import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { BarChart, X} from "lucide-react";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  BoltIcon,
  ChartBarIcon,
} from "lucide-react";

const navigation = [
  { name: "Platform", href: "#" },
  { name: "Solutions", href: "#" },
  { name: "Customers", href: "#" },
  { name: "Pricing", href: "#" },
];

export default function HeroSectionThree() {
    
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="bg-white min-h-screen">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
              <span className="sr-only">Fusion</span>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=600"
                  className="h-6 w-auto"
                />
              </div>
              <span className="font-bold text-xl text-gray-900">Fusion</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-600 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <BarChart aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center"
            >
              Sign in
            </a>
            <a
              href="#"
              className="text-sm font-medium px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
            >
              Start for free
            </a>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=600"
                    className="h-6 w-auto"
                  />
                </div>
                <span className="font-bold text-xl text-gray-900">Fusion</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-full p-2.5 text-gray-600 hover:bg-gray-100"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="space-y-1 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 space-y-3">
                  <a
                    href="#"
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Sign in
                  </a>
                  <a
                    href="#"
                    className="block rounded-full px-3 py-2.5 text-base font-medium text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg"
                  >
                    Start for free
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Two column hero section */}
      <div className="relative isolate pt-24 lg:pt-0">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 lg:min-h-screen">
            {/* Left column - Content */}
            <div className="flex flex-col justify-center px-6 py-12 lg:px-8 lg:py-24">
              <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 bg-blue-50 rounded-full mb-8 self-start">
                <BoltIcon className="w-4 h-4 mr-1" />
                Introducing Fusion Analytics 2.0
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                Analyze data like
                <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  never before
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-lg">
                Our analytics platform helps businesses turn complex data into
                clear, actionable insights with AI-powered recommendations and
                real-time dashboards.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-semibold text-gray-900">
                      Enterprise-grade security
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      SOC 2 Type II and GDPR compliant with end-to-end
                      encryption
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <BoltIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-semibold text-gray-900">
                      Lightning-fast performance
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Analyze billions of data points in seconds, not hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-semibold text-gray-900">
                      AI-powered insights
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get predictive recommendations that help you stay ahead
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex-none w-full sm:w-auto text-center"
                >
                  Get started for free
                </a>
                <a
                  href="#"
                  className="rounded-full px-6 py-3 text-base font-medium text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-x-2 flex-none w-full sm:w-auto"
                >
                  Talk to sales
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
              </div>

              <p className="mt-8 text-sm text-gray-500">
                Join 2,500+ companies already using Fusion Analytics
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 w-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>

            {/* Right column - Image */}
            <div className="relative flex items-center justify-center lg:h-auto">
              <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-50 to-indigo-50 z-0 lg:block hidden"></div>
              <div className="relative z-10 px-6 py-12 lg:px-8 lg:py-0 flex items-center justify-center w-full h-full">
                <img
                  src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfZ4gu2wU9C3gHFdyzTE0q7PpDnjchu6XsKk1l"
                  alt="Analytics dashboard"
                  className="w-full max-w-lg xl:max-w-xl rounded-xl h-[80%] shadow-2xl lg:translate-y-0 object-cover object-center"
                />
                {/* Floating stats card */}
                <div className="absolute -bottom-6 right-6 bg-white rounded-lg shadow-xl p-4 flex items-center space-x-4 border border-gray-100">
                  <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <ChartBarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Revenue Growth
                    </p>
                    <p className="text-xl font-bold text-gray-900">+48.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
