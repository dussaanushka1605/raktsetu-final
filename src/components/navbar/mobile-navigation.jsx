
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Button from "../Button";
import { useAuth } from "@/contexts/AuthContext";
import { getMainNavigation, getUserNavigation } from "./navigation-utils";

export const MobileNavigation = ({ isMenuOpen, onLogout }) => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const navigation = getMainNavigation(role);
  const userNavigation = getUserNavigation(role);

  if (!isMenuOpen) return null;

  return (
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
        
        {isAuthenticated && (
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
              onClick={onLogout}
              className="flex items-center w-full text-left px-3 py-3 text-base font-medium rounded-md text-foreground/80 hover:bg-blood/5 hover:text-blood"
            >
              <LogOut size={18} className="mr-3" />
              Sign out
            </button>
          </>
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
  );
};
