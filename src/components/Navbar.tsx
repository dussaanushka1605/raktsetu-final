
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, role, logout } = useAuth();
  
  const navigation = [
    { name: "Home", path: "/" },
    ...(role === "hospital" ? [{ name: "Find Donor", path: "/find-donor" }] : []),
    ...(role !== "hospital" ? [{ name: "Become Donor", path: "/become-donor" }] : []),
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const userNavigation = role === "hospital" 
    ? [
        { name: "Dashboard", path: "/hospital/dashboard", icon: User },
        { name: "Emergency Request", path: "/hospital/emergency-request", icon: Bell },
      ]
    : [
        { name: "Dashboard", path: "/donor/dashboard", icon: User },
        { name: "Alert Settings", path: "/donor/alert-settings", icon: Settings },
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
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            
            {isAuthenticated ? (
              <div className="relative">
                <Button 
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center"
                >
                  <span className="mr-2">{user?.name || "User"}</span>
                  <div className="h-6 w-6 rounded-full bg-blood text-white flex items-center justify-center text-xs">
                    {user?.name?.[0].toUpperCase() || "U"}
                  </div>
                </Button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <item.icon size={16} className="mr-2" />
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </div>
            )}
            
            {role === "hospital" && (
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => navigate('/hospital/emergency-request')}
              >
                Emergency Need
              </Button>
            )}
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
            
            {isAuthenticated ? (
              <>
                {userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center px-3 py-3 text-base font-medium rounded-md text-foreground/80 hover:bg-blood/5 hover:text-blood"
                  >
                    <item.icon size={18} className="mr-3" />
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-3 py-3 text-base font-medium rounded-md text-foreground/80 hover:bg-blood/5 hover:text-blood"
                >
                  <LogOut size={18} className="mr-3" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 mt-4">
                <Button 
                  variant="secondary"
                  className="w-full"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  variant="primary"
                  className="w-full"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </div>
            )}
            
            {role === "hospital" && (
              <Button 
                variant="primary" 
                className="w-full mt-4"
                onClick={() => navigate('/hospital/emergency-request')}
              >
                Emergency Need
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
