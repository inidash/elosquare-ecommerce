// import { Link } from "@inertiajs/react";
// import { Menu, X } from "lucide-react";
// import { useState } from "react";


// const navItems = [
//   { label: "Home", href: "/" },
//   { label: "Shop", href: "/Home" },
//   { label: "Contact us", href: "/Contact" },
  
// ];
 
// const Navbar = () => {
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

//   const toggleNavbar = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };

//   return (
//     <nav className="sticky top-0 z-50 backdrop-blur-lg border-b bg-gray-800">
//       <div className="container px-4 mx-auto relative lg:text-sm">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center flex-shrink-0">
//             <img className="h-20 w-20 mr-2" src='/logo.png' alt="Logo" />
//             {/* <span className="text-xl tracking-tight">VirtualR</span> */}
//           </div>
//           <ul className="hidden lg:flex ml-14 space-x-12">
//             {navItems.map((item, index) => (
//               <li key={index} className="font-semibold text-white text-lg hover:text-gray-600 transition-all duration-200">
//                 <Link href={item.href}>{item.label}</Link>
//               </li>
//             ))}
//           </ul>
          
//           <div className="lg:hidden md:flex flex-col justify-end">
//             <button onClick={toggleNavbar}>
//               {mobileDrawerOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//         {mobileDrawerOpen && (
//           <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
//             <ul>
//               {navItems.map((item, index) => (
//                 <li key={index} className="py-4">
//                   <a href={item.href}>{item.label}</a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, usePage } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Contact us", href: "/contact" },
];

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { url } = usePage(); // Get the current URL from Inertia

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b bg-gray-800">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img className="h-20 w-20 mr-2" src="/logo.png" alt="Logo" />
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => {
              const isActive = url === item.href;
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={` text-lg transition-all duration-200 ${
                      isActive
                        ? "text-yellow-400 border-yellow-400 pb-1"
                        : "text-white hover:text-gray-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar} className="text-white">
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-gray-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => {
                const isActive = url === item.href;
                return (
                  <li key={index} className="py-4 text-center">
                    <Link
                      href={item.href}
                      className={`text-lg font-semibold transition-all duration-200 ${
                        isActive
                          ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                          : "text-white hover:text-gray-400"
                      }`}
                      onClick={() => setMobileDrawerOpen(false)} // close drawer after click
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
