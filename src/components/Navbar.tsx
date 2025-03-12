
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: "Home", path: "/" },
    { name: "Find Donor", path: "/find-donor" },
    { name: "Become Donor", path: "/become-donor" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/"
              className="text-2xl font-bold text-blood tracking-tight flex items-center"
            >
              <span className="mr-1">Rakt</span>
              <span className="text-foreground">Setu</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-all",
                  "hover:text-blood hover:scale-105 duration-300",
                  location.pathname === item.path 
                    ? "text-blood" 
                    : "text-foreground/80"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => window.location.href = "/find-donor"}
            >
              Emergency Need
            </Button>
          </div>
          
          {/* Mobile navigation toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="p-2 -m-2 text-gray-500 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 animate-fade-in">
          <div className="pt-2 pb-4 px-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "block px-3 py-3 text-base font-medium rounded-md transition-all",
                  location.pathname === item.path 
                    ? "bg-blood/5 text-blood" 
                    : "text-foreground/80 hover:bg-blood/5 hover:text-blood"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              variant="primary" 
              size="sm"
              className="w-full mt-4"
              onClick={() => window.location.href = "/find-donor"}
            >
              Emergency Need
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
