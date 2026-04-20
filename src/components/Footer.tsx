"use client";

import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#111111] via-[#1f1f1f] to-[#111111] text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              {/* Logo Wrapper */}
              <div className="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#f5d37a] to-[#b8bcc3] p-[2px]">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src="/planitt-app-black.png"
                    alt="Planitt Logo"
                    width={30}
                    height={30}
                    className="h-6 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                    style={{ width: 'auto' }}
                  />
                </div>
              </div>

              <h3 className="font-heading text-xl font-bold">Planitt</h3>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted financial partner for comprehensive wealth management
              and financial planning solutions.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">
              Contact Piyush Tembhekar
            </h4>
            <div className="flex gap-8">
              {/* Left Side - Contact Info */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center space-x-3 hover:text-[#f3cf72]">
                  <Mail className="h-5 w-5" />
                  <a
                    href="mailto:planitt.official@gmail.com"
                    className="text-gray-300 text-sm hover:text-[#f3cf72] transition-colors duration-200"
                  >
                    planitt.official@gmail.com
                  </a>
                </div>
                <div className="flex items-center hover:text-[#f3cf72] space-x-3">
                  <Phone className="h-5 w-5" />
                  <a
                    href="tel:+918605727484"
                    className="text-gray-300 text-sm hover:text-[#f3cf72] transition-colors duration-200"
                  >
                    +91 8605727484
                  </a>
                </div>
                <div className="flex items-center hover:text-[#f3cf72] space-x-3">
                  <MapPin className="h-5 w-5" />
                  <a
                    href="https://maps.app.goo.gl/kmNZLRBcutkGLA7XA?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 text-sm hover:text-[#f3cf72] transition-colors duration-200"
                  >
                    Gorewada, Nagpur
                  </a>
                </div>
              </div>

              {/* Right Side - Social Media Links */}
              <div className="space-y-3 flex-1">
                <a
                  href="https://www.instagram.com/planitt_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 text-sm hover:text-[#f3cf72] transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5" />
                  <span>planitt_official</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/planittt/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 text-sm hover:text-[#f3cf72] transition-colors duration-200"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>planitt</span>
                </a>
              </div>
            </div>
          </div>

          {/* Services Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Our Services</h4>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/main#services"
                className="text-gray-300 text-sm hover:text-[#f3cf72] transition-colors duration-200 cursor-pointer"
              >
                SIP
              </a>
              <a
                href="/main#services"
                className="text-gray-300 text-sm hover:text-[#f3cf72] transition-colors duration-200 cursor-pointer"
              >
                SWP
              </a>
              <a
                href="/main#services"
                className="text-gray-300 text-sm hover:text-[#f3cf72] transition-colors duration-200 cursor-pointer"
              >
                Goal Setting
              </a>
              <a
                href="/main#services"
                className="text-gray-300 text-sm hover:text-[#f3cf72] transition-colors duration-200 cursor-pointer"
              >
                Insurance
              </a>
              <a
                href="/main#services"
                className="text-gray-300 text-sm hover:text-[#f3cf72] transition-colors duration-200 cursor-pointer"
              >
                NPS
              </a>
              <a
                href="/main#services"
                className="text-gray-300 text-sm hover:text-[#f3cf72] transition-colors duration-200 cursor-pointer"
              >
                Budgeting
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Planitt. All Rights Reserved. | CEO & Financial Distributor:{" "}
            <a
              href="/main#about"
              className="text-gray-400 hover:text-[#f3cf72] transition-colors duration-200 cursor-pointer"
            >
              Piyush Tembhekar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


