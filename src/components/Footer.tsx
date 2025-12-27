import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full">
      {/* CTA Section */}
      <div className="text-center py-12 px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
          Ready to get started
        </h2>
        <p className="text-foreground/70 mb-6 text-sm">
          Download My Citi for free. No credit card required.
        </p>
        <button className="bg-foreground text-background px-6 py-2.5 rounded-full font-medium hover:bg-foreground/90 transition-colors text-sm">
          Try My Citi free
        </button>
      </div>

      {/* Footer Content - Full Width */}
      <div className="w-full px-4 md:px-8 py-8">
        <div className="bg-[#e8f0f8]/60 backdrop-blur-sm rounded-3xl p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-accent rounded-full flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                        fill="currentColor"
                        className="text-accent-foreground"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold text-base text-foreground">MY CITI</span>
                </div>
                <p className="text-foreground/70 text-xs mb-4">
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
                    <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors text-xs">
                      Home
                    </Link>
                  </li>
                  <li>
                    <a href="/#features" className="text-foreground/70 hover:text-foreground transition-colors text-xs">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="/#pricing" className="text-foreground/70 hover:text-foreground transition-colors text-xs">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="/#blog" className="text-foreground/70 hover:text-foreground transition-colors text-xs">
                      Blog
                    </a>
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
