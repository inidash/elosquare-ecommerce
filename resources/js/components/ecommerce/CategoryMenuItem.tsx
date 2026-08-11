// import { Link } from '@inertiajs/react';
// import { useState } from 'react';

// interface Category {
//   id: number;
//   name: string;
//   slug: string;
//   icon?: string;
//   children: Category[];
// }

// interface CategoryMenuItemProps {
//   category: Category;
// }

// export default function CategoryMenuItem({ category }: CategoryMenuItemProps) {
//   const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

//   const handleMouseEnter = () => {
//     if (window.innerWidth >= 1024) setIsSubMenuOpen(true);
//   };

//   const handleMouseLeave = () => {
//     if (window.innerWidth >= 1024) setIsSubMenuOpen(false);
//   };

//   const handleToggleClick = () => {
//     if (window.innerWidth < 1024) setIsSubMenuOpen(!isSubMenuOpen);
//   };

//   const hasChildren = category.children && category.children.length > 0;

//   return (
//     <div
//       className="relative group"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div
//         className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-700"
//         onClick={handleToggleClick}
//       >
//         <Link
//           href={`/category/${category.slug}`}
//           className="flex items-center flex-1 space-x-2 text-white z-50 relative"
//         >
//           <i className={`fas fa-${category.icon || 'folder'} text-indigo-400`}></i>
//           <span>{category.name}</span>
//         </Link>

//         {hasChildren && (
//           <i
//             className={`fas fa-chevron-right text-xs text-gray-400 transition-transform duration-300 ${
//               isSubMenuOpen ? 'rotate-90 text-indigo-400' : ''
//             }`}
//           ></i>
//         )}
//       </div>

//       {hasChildren && (
//         <div
//           className={`lg:absolute lg:top-0 lg:left-full w-64 bg-gray-800 text-white rounded-md shadow-lg transition-all duration-300 ${
//             isSubMenuOpen
//               ? 'opacity-100 visible max-h-[600px]'
//               : 'opacity-0 invisible max-h-0'
//           }`}
//           style={{
//             zIndex: 60,
//             pointerEvents: isSubMenuOpen ? 'auto' : 'none',
//           }}
//         >
//           {category.children.map((child) => (
//             <CategoryMenuItem key={child.id} category={child} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  children?: Category[];
}

interface Props {
  category: Category;
}

export default function CategoryMenuItem({ category }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="relative group">
      {/* === Parent Item === */}
      <div
        onClick={handleClick}
        className="flex items-center justify-between px-4 py-2 text-gray-200 hover:bg-gray-700 cursor-pointer select-none"
      >
        <Link
          href={`/category/${category.slug}`}
          className="flex-1 hover:text-indigo-400"
        >
          {category.name}
        </Link>

        {hasChildren && (
          <span>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-indigo-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-400" />
            )}
          </span>
        )}
      </div>

      {/* === Desktop Submenu (hover/click beside parent) === */}
      {hasChildren && !isMobile && isOpen && (
        <div className="absolute left-full top-0 ml-1 w-60 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-[999]">
          {category.children!.map((child) => (
            <CategoryMenuItem key={child.id} category={child} />
          ))}
        </div>
      )}

      {/* === Mobile Submenu (inline expand) === */}
      {hasChildren && isMobile && (
        <div
          className={`transition-all duration-300 overflow-hidden bg-gray-800 border-l border-gray-700 ${
            isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {category.children!.map((child) => (
            <CategoryMenuItem key={child.id} category={child} />
          ))}
        </div>
      )}
    </div>
  );
}


