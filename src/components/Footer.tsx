import { Link } from "react-router-dom";
import { Linkedin, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import logo from "@/assets/myciti-logo-new.png";
const Footer = () => {
  const {
    ref: footerRef,
    isVisible: footerVisible
  } = useScrollAnimation({
    threshold: 0.1
  });
  return <footer className="w-full">
    {/* Footer Content - Full Width */}
    <div ref={footerRef} className={cn("w-full px-3 sm:px-4 md:px-8 py-4 sm:py-6 md:py-8 transition-all duration-1000", footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
      <div className="bg-[#e8f0f8]/60 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-6 md:gap-8">
            {/* Brand */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <img src={logo} alt="MY CITI Logo" className="h-8 sm:h-10 md:h-12" />
              </div>
              <p className="text-foreground/70 text-xs sm:text-sm mb-3 sm:mb-4 max-w-xs">Your favourite residential management software. Built for early types of properties.</p>
              <div className="flex gap-2 sm:gap-3">
                <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-foreground rounded-full flex items-center justify-center hover:bg-foreground/80 transition-colors touch-manipulation">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-background" />
                </a>
                <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-foreground rounded-full flex items-center justify-center hover:bg-foreground/80 transition-colors touch-manipulation">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-background" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Pages */}
            <div>
              <h3 className="font-semibold text-foreground mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">PAGES</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <a href="/#features" className="text-foreground/70 hover:text-foreground transition-colors text-xs sm:text-sm py-1 inline-block touch-manipulation">
                    Product & Features
                  </a>
                </li>
                <li>
                  <a href="/#blog" className="text-foreground/70 hover:text-foreground transition-colors text-xs sm:text-sm py-1 inline-block touch-manipulation">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="/#about" className="text-foreground/70 hover:text-foreground transition-colors text-xs sm:text-sm py-1 inline-block touch-manipulation">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/#faq" className="text-foreground/70 hover:text-foreground transition-colors text-xs sm:text-sm py-1 inline-block touch-manipulation">
                    FAQ
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="text-foreground/70 hover:text-foreground transition-colors text-xs sm:text-sm py-1 inline-block touch-manipulation">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div className="col-span-1 sm:col-span-2 md:col-span-2">
              <div className="flex items-start gap-2 mb-2 sm:mb-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <h3 className="font-semibold text-foreground text-xs sm:text-sm uppercase tracking-wide">Address</h3>
              </div>
              <div className="text-foreground/70 text-xs sm:text-sm space-y-1">
                <p className="font-semibold text-foreground">HEAD OFFICE</p>
                <p className="leading-relaxed">
                  314, SAMRUDDHI BUSINESS PARK BEHIND EVERSHINE MALL, NEW LINK RD, CHINCHOLI BUNDER, MALAD WEST, MUMBAI, MAHARASHTRA 400064.
                </p>
              </div>
            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-foreground/10 mt-4 sm:mt-6 pt-3 sm:pt-4">
            <p className="text-[10px] sm:text-xs text-center text-primary sm:text-justify">Copyright © 2025 Digielves Tech Wizards Private Limited All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  </footer>;
};
export default Footer;