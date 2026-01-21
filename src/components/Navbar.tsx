import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import mycitiLogo from "@/assets/myciti-logo-new.png";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Product & Features", href: "/#features", isRoute: false },
  { label: "Blogs", href: "/#blog", isRoute: false },
  { label: "FAQ", href: "/#faq", isRoute: false },
  { label: "Contact Us", href: "/contact", isRoute: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-8 py-3 md:py-5 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <nav
        className="w-full max-w-5xl mx-auto flex items-center justify-between transition-all duration-300 px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-white/60 backdrop-blur-2xl rounded-pill border border-white/40 shadow-lg"
      >
        {/* Logo */}
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src={mycitiLogo} alt="My Citi Logo" className="h-10 sm:h-12 md:h-16 w-auto" />
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        {/* Desktop Login Button */}
        <div className="hidden lg:block">
          <a href="/app/login">
            <Button 
              size="default"
              className="bg-black text-white text-base md:text-lg font-medium hover:bg-black/90 rounded-full px-5 md:px-6"
            >
              Login
            </Button>
          </a>
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center gap-3">
          <a href="/app/login" className="hidden sm:block">
            <Button 
              size="sm"
              className="bg-black text-white text-sm font-medium hover:bg-black/90 rounded-full px-4"
            >
              Login
            </Button>
          </a>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-white/95 backdrop-blur-xl">
              <div className="flex flex-col h-full pt-8">
                {/* Mobile Nav Links */}
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    link.isRoute ? (
                      <SheetClose asChild key={link.label}>
                        <Link
                          to={link.href}
                          onClick={handleLinkClick}
                          className="text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors duration-200 py-3 px-4 rounded-lg"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ) : (
                      <SheetClose asChild key={link.label}>
                        <a
                          href={link.href}
                          onClick={handleLinkClick}
                          className="text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors duration-200 py-3 px-4 rounded-lg"
                        >
                          {link.label}
                        </a>
                      </SheetClose>
                    )
                  ))}
                </div>

                {/* Mobile Login Button */}
                <div className="mt-6 px-4">
                  <a href="/app/login" className="block">
                    <Button 
                      size="lg"
                      className="w-full bg-black text-white text-base font-medium hover:bg-black/90 rounded-full"
                    >
                      Login
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;