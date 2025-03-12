
import { User, Bell, Settings, LogOut } from "lucide-react";
import { UserRole } from "@/contexts/AuthContext";

export const getMainNavigation = (role: UserRole) => [
  { name: "Home", path: "/" },
  ...(role === "hospital" ? [{ name: "Find Donor", path: "/find-donor" }] : []),
  ...(role !== "hospital" ? [{ name: "Become Donor", path: "/become-donor" }] : []),
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const getUserNavigation = (role: UserRole) => 
  role === "hospital" 
    ? [
        { name: "Dashboard", path: "/hospital/dashboard", icon: User },
        { name: "Emergency Request", path: "/hospital/emergency-request", icon: Bell },
      ]
    : [
        { name: "Dashboard", path: "/donor/dashboard", icon: User },
        { name: "Alert Settings", path: "/donor/alert-settings", icon: Settings },
      ];
