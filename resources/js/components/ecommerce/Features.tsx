import React from "react";
import { UploadCloud, Shield, Database, ArrowRight, BaggageClaimIcon } from "lucide-react";
import { Link } from "@inertiajs/react";

interface Feature {
  name: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

const features: Feature[] = [
  {
    name: "Massive Sales Reward",
    description:
      "Take a shot at selling a million units of your products/services in 90days...",
    icon: BaggageClaimIcon,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    name: "Vendor Contest",
    description:
      "Represent your state as vendor to stand the chance of winning the star prize of N100,000,000 (One Hundred Million Naira) among other exclusive and exciting prices!",
    icon: Shield,
    gradient: "from-indigo-500 to-purple-500",
  },
  
];

export default function FeatureSection() {
  return (
    <div className="overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="inline-flex items-center text-base font-medium">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold tracking-wide">
                  Sales Beyond Expectations!
                </span>
                <span className="ml-3 h-px w-12 bg-gradient-to-r from-blue-600 to-indigo-600"></span>
              </h2>

              <p className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  7EVEN DIGITS CONTEST
                </span>
              </p>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                A PLACE OF LEGIT WEALTH CREATION! <br />
                THIS PLATFORM IS PRESENTING THE 'SEVEN DIGITS CONTEST' SEASON ONE
              </p>

              <div className="mt-12 space-y-10">
                {features.map((feature) => (
                  <div key={feature.name} className="relative group">
                    <div className="flex items-start">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.gradient} shadow-md group-hover:shadow-lg transition-all duration-300 flex-shrink-0`}
                      >
                        <feature.icon
                          className="h-6 w-6  text-white"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                          {feature.name}
                        </h3>
                        <p className="mt-2 text-base text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* <div className="mt-4 ml-16">
                      <a
                        href="#"
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                      >
                        Learn more
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div> */}

                    <div className="absolute -inset-y-2.5 -inset-x-6 rounded-2xl bg-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link href="/login">
                  <button className="inline-flex items-center px-6 py-3 text-base font-medium text-white rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg shadow-indigo-500/20 transition-all duration-300">
                    Get started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-3xl blur-xl transform -rotate-1"></div>
            <div className="relative">
              <img
                src="/elosquare_logo2.png"
                alt="Product screenshot"
                className="w-full rounded-2xl shadow-2xl ring-1 ring-gray-900/10 md:h-[700px] sm:h-[300px]"
                
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

              {/* Premium details overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3 border border-gray-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    99.99% Fair contest
                  </p>
                  <p className="text-xs text-gray-500">
                    Vendor Contest
                  </p>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -top-10 -left-10 bg-white rounded-xl shadow-lg p-4 max-w-xs border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-gray-900">
                    Enrolment status
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Joining the contest! </span>
                  <span> 80%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}