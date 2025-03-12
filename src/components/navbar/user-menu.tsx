
import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import Button from "../Button";
import { useAuth } from "@/contexts/AuthContext";
import { getUserNavigation } from "./navigation-utils";

interface UserMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

export const UserMenu = ({ isOpen, onToggle, onLogout }: UserMenuProps) => {
  const { user, role } = useAuth();
  const userNavigation = getUserNavigation(role);

  return (
    <div className="relative">
      <Button 
        variant="secondary"
        size="sm"
        onClick={onToggle}
        className="flex items-center"
      >
        <span className="mr-2">{user?.name || "User"}</span>
        <div className="h-6 w-6 rounded-full bg-blood text-white flex items-center justify-center text-xs">
          {user?.name?.[0].toUpperCase() || "U"}
        </div>
      </Button>
      
      {isOpen && (
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
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <LogOut size={16} className="mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};
