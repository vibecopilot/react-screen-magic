import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import logo from "@/assets/myciti-logo-new.png";

const Footer = () => {
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <footer className="w-full">
      {/* Footer Content - Full Width */}
      <div 
        ref={footerRef}
        className={cn(
          "w-full px-3 sm:px-4 md:px-8 py-6 md:py-8 transition-all duration-1000",
          footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}
      >
        <div className="bg-[#e8f0f8]/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {/* Brand */}
              <div className="col-span-2 sm:col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <img src={logo} alt="MY CITI Logo" className="h-10 sm:h-12" />
                </div>
                <p className="text-foreground/70 text-xs mb-3 sm:mb-4">
                  Your favourite business management software. Built for early startup founders.
                </p>
                <div className="flex gap-2">
                  <a 
                    href="#" 
                    className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center hover:bg-foreground/80 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-background" />
                  </a>
                  <a 
                    href="#" 
                    className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center hover:bg-foreground/80 transition-colors"
                  >
                    <svg className="w-4 h-4 text-background" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Pages */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm">PAGES</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/#features" className="text-foreground/70 hover:text-foreground transition-colors text-xs">
                      Product & Features
                    </a>
                  </li>
                  <li>
                    <a href="/#blog" className="text-foreground/70 hover:text-foreground transition-colors text-xs">
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a href="/#faq" className="text-foreground/70 hover:text-foreground transition-colors text-xs">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <Link to="/contact" className="text-foreground/70 hover:text-foreground transition-colors text-xs">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Information */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm">INFORMATION</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/contact" className="text-foreground/70 hover:text-foreground transition-colors text-xs">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-foreground/70 hover:text-foreground transition-colors text-xs">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-foreground/70 hover:text-foreground transition-colors text-xs">
                      Terms of use
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-foreground/70 hover:text-foreground transition-colors text-xs">
                      404
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-foreground/10 mt-6 pt-4">
              <p className="text-foreground/60 text-xs">© 2025 My Citi.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
