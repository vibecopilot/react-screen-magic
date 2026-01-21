import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import mycitiLogo from "@/assets/myciti-logo-new.png";

const navLinks = [
  { label: "Product & Features", href: "/#features", isRoute: false },
  { label: "Blogs", href: "/#blog", isRoute: false },
  { label: "FAQ", href: "/#faq", isRoute: false },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 50);
      
      // Show navbar when scrolling down, hide when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling up - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling down or at top - show navbar
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-5 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="w-full max-w-6xl mx-auto flex items-center justify-center gap-4">
        {/* Navbar Pill */}
        <nav
          className="flex items-center justify-between transition-all duration-300 px-8 py-4 bg-white/60 backdrop-blur-2xl rounded-pill border border-white/40 shadow-lg flex-1 max-w-5xl"
        >
          {/* Logo */}
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src={mycitiLogo} alt="My Citi Logo" className="h-16 w-auto" />
          </Link>

          {/* Navigation Links - Desktop (Centered) */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Contact us Button - Inside Pill */}
          <Link to="/contact">
            <Button variant="hero" size="default">
              Contact us
            </Button>
          </Link>
        </nav>

        {/* Login Button - Outside Pill */}
        <a href="/app/login" className="flex items-center">
          <Button 
            variant="outline" 
            size="lg"
            className="text-black text-lg font-medium border-gray-300 hover:bg-gray-100 rounded-full px-6"
          >
            Login
          </Button>
        </a>
      </div>
    </header>
  );
};

export default Navbar;