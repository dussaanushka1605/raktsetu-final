
import { useState } from "react";
import { Filter, MapPin, Search } from "lucide-react";
import Button from "./Button";
import { cn } from "@/lib/utils";

interface DonorSearchProps {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
}

export interface SearchFilters {
  bloodGroup: string;
  location: string;
  maxDistance: number;
  urgent: boolean;
  verified: boolean;
}

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonorSearch = ({ onSearch, className }: DonorSearchProps) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    bloodGroup: "All",
    location: "",
    maxDistance: 50,
    urgent: false,
    verified: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFilters(prev => ({ ...prev, [name]: checked }));
    } else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className={cn("glass-card p-6 animate-reveal", className)}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-muted-foreground mb-1">
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={filters.bloodGroup}
              onChange={handleInputChange}
              className="input-field"
            >
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="location" className="block text-sm font-medium text-muted-foreground mb-1">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                placeholder="Enter city, area or zip code"
                className="input-field pl-10"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(prev => !prev)}
            className="text-sm font-medium text-blood flex items-center hover:underline underline-offset-4"
          >
            <Filter size={16} className="mr-1" />
            {isAdvancedOpen ? "Hide advanced filters" : "Show advanced filters"}
          </button>
          
          {isAdvancedOpen && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="maxDistance" className="block text-sm font-medium text-muted-foreground mb-1">
                  Max Distance (km): {filters.maxDistance}
                </label>
                <input
                  type="range"
                  id="maxDistance"
                  name="maxDistance"
                  min="1"
                  max="100"
                  value={filters.maxDistance}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center h-full pt-6">
                <input
                  type="checkbox"
                  id="urgent"
                  name="urgent"
                  checked={filters.urgent}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-blood focus:ring-blood"
                />
                <label htmlFor="urgent" className="text-sm font-medium">
                  Urgent requests only
                </label>
              </div>
              
              <div className="flex items-center h-full pt-6">
                <input
                  type="checkbox"
                  id="verified"
                  name="verified"
                  checked={filters.verified}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-blood focus:ring-blood"
                />
                <label htmlFor="verified" className="text-sm font-medium">
                  Verified donors only
                </label>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <Button type="submit" variant="primary" className="w-full md:w-auto">
            <Search size={18} className="mr-2" />
            Search Donors
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DonorSearch;
