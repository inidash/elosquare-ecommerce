import { Link } from "@inertiajs/react";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

const IndexFooter = () => {
  return (
    <footer className="bg-gray-800 pt-16 pb-6 text-white">
      <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
              {/* Logo and Description */}
              <div>
                  <Link href="/" className="mb-4 block text-2xl font-bold text-white">
                      Elosquare
                  </Link>
                  <p className="mb-6 text-gray-400">
                      Elosquare offers a wide range of high-quality products <br/>
                      at competitive prices. We're committed to providing an exceptional <br/>
                      shopping experience with fast shipping and excellent customer service.
                  </p>
                  <div className="flex space-x-4">
                      <a
                          href="https://www.facebook.com/share/1YSRkAa2Mt/"
                          target="_blank"
                            rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-indigo-600"
                      >
                          <Facebook className="h-5 w-5 text-white" />
                      </a>
                      <a
                          href="https://x.com/OlugbengaA2010?t=T1WCOHOA8yjFM2OxzwBz_A&s=09"
                          target="_blank"
                            rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-indigo-600"
                      >
                          <Twitter className="h-5 w-5 text-white" />
                      </a>
                      <a
                          href="https://www.instagram.com/everlegitoperatorsquare?igsh=MzZtdXNtNTQ0eHo4"
                          target="_blank"
                            rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-indigo-600"
                      >
                          <Instagram className="h-5 w-5 text-white" />
                      </a>
                      <a
                          href="https://youtube.com/@everlegitoperator?si=k_hB1ANlUEAxhoi0"
                          target="_blank"
                            rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-indigo-600"
                      >
                          <Youtube className="h-5 w-5 text-white" />
                      </a>
                  </div>
              </div>

              {/* Contact Information */}
              <div>
                  <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                  <ul className="space-y-3">
                      <li className="flex items-start">
                          <MapPin className="mt-1 mr-3 h-5 w-5 text-indigo-500" />
                          <span className="text-gray-400">
                              No. 298, Isheri Idimu Road Alimosho,
                              <br />
                              Lagos State, Nigeria.
                          </span>
                      </li>
                      <li className="flex items-center">
                          <Phone className="mr-3 h-5 w-5 text-indigo-500" />
                          <span className="text-gray-400">+234 704 3007 794</span>
                      </li>
                      <li className="flex items-center">
                          <Mail className="mr-3 h-5 w-5 text-indigo-500" />
                          <span className="text-gray-400">contact@elosquare.com</span>
                      </li>
                      
                  </ul>
              </div>
          </div>

          <hr className="my-8 border-gray-700" />

          <div className="flex flex-col items-center justify-center md:flex-row">
              <p className="mb-4 text-gray-400 md:mb-0">© {new Date().getFullYear()} Elosquare. All Rights Reserved.</p>
          </div>
      </div>
  </footer>
  );
};

export default IndexFooter;