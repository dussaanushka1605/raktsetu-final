
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";

export interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  location: string;
  distance: number;
  lastDonation: string;
  contactNumber: string;
  isVerified: boolean;
}

interface DonorCardProps {
  donor: Donor;
  className?: string;
}

const DonorCard = ({ donor, className }: DonorCardProps) => {
  const getBloodGroupClass = (bloodGroup: string) => {
    switch (bloodGroup) {
      case "A+": return "bg-red-50 text-red-600";
      case "A-": return "bg-red-50 text-red-600";
      case "B+": return "bg-blue-50 text-blue-600";
      case "B-": return "bg-blue-50 text-blue-600";
      case "AB+": return "bg-purple-50 text-purple-600";
      case "AB-": return "bg-purple-50 text-purple-600";
      case "O+": return "bg-green-50 text-green-600";
      case "O-": return "bg-green-50 text-green-600";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div 
      className={cn(
        "glass-card glass-card-hover p-6 animate-reveal transition-all duration-300",
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{donor.name}</h3>
          <p className="text-muted-foreground text-sm">{donor.location} • {donor.distance} km away</p>
        </div>
        <div 
          className={cn(
            "px-3 py-1 text-sm font-medium rounded-full",
            getBloodGroupClass(donor.bloodGroup)
          )}
        >
          {donor.bloodGroup}
        </div>
      </div>
      
      <div className="space-y-3 mb-5">
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Last donation</span>
          <span className="text-sm font-medium">{donor.lastDonation}</span>
        </div>
        
        {donor.isVerified && (
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-3 h-3 text-green-600"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-sm text-green-600 font-medium">Verified Donor</span>
          </div>
        )}
      </div>
      
      <Button 
        variant="primary" 
        className="w-full"
      >
        <Phone size={16} className="mr-2" />
        Contact Donor
      </Button>
    </div>
  );
};

export default DonorCard;
