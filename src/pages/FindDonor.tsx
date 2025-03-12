
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import DonorSearch, { SearchFilters } from "@/components/DonorSearch";
import DonorCard, { Donor } from "@/components/DonorCard";
import { AlertCircle, LogIn, Hospital } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button";

// Mock donor data
const mockDonors: Donor[] = [
  {
    id: "1",
    name: "John Smith",
    bloodGroup: "A+",
    location: "New York, NY",
    distance: 2.5,
    lastDonation: "3 months ago",
    contactNumber: "1234567890",
    isVerified: true
  },
  {
    id: "2",
    name: "Emily Johnson",
    bloodGroup: "O-",
    location: "Brooklyn, NY",
    distance: 4.8,
    lastDonation: "6 months ago",
    contactNumber: "9876543210",
    isVerified: true
  },
  {
    id: "3",
    name: "Michael Williams",
    bloodGroup: "B+",
    location: "Queens, NY",
    distance: 6.2,
    lastDonation: "1 year ago",
    contactNumber: "5678901234",
    isVerified: false
  },
  {
    id: "4",
    name: "Sarah Davis",
    bloodGroup: "AB+",
    location: "Manhattan, NY",
    distance: 3.1,
    lastDonation: "2 months ago",
    contactNumber: "3456789012",
    isVerified: true
  },
  {
    id: "5",
    name: "Robert Miller",
    bloodGroup: "A-",
    location: "Bronx, NY",
    distance: 8.7,
    lastDonation: "5 months ago",
    contactNumber: "7890123456",
    isVerified: false
  },
  {
    id: "6",
    name: "Jennifer Garcia",
    bloodGroup: "O+",
    location: "Staten Island, NY",
    distance: 12.4,
    lastDonation: "9 months ago",
    contactNumber: "2345678901",
    isVerified: true
  }
];

const FindDonor = () => {
  const [searchResults, setSearchResults] = useState<Donor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSearch = (filters: SearchFilters) => {
    console.log("Search filters:", filters);
    setHasSearched(true);
    
    // Filter donors based on search criteria
    let results = [...mockDonors];
    
    if (filters.bloodGroup !== "All") {
      results = results.filter(donor => donor.bloodGroup === filters.bloodGroup);
    }
    
    if (filters.location) {
      // In a real app, this would use geolocation or search API
      results = results.filter(donor => 
        donor.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.maxDistance < 100) {
      results = results.filter(donor => donor.distance <= filters.maxDistance);
    }
    
    if (filters.verified) {
      results = results.filter(donor => donor.isVerified);
    }
    
    // Sort by distance
    results.sort((a, b) => a.distance - b.distance);
    
    setSearchResults(results);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-reveal">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find a Blood Donor</h1>
            <p className="text-lg text-muted-foreground">
              Search for blood donors near you by blood group, location, and other criteria.
            </p>
          </div>
          
          {!isAuthenticated ? (
            <div className="glass-card p-8 text-center max-w-lg mx-auto animate-reveal">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blood/10 text-blood mb-6">
                <Hospital size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Hospital Login Required</h3>
              <p className="text-muted-foreground mb-6">
                To search for blood donors, please login to your hospital account or register if you don't have one yet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary"
                  onClick={handleLoginClick}
                  className="w-full sm:w-auto"
                >
                  <LogIn size={18} className="mr-2" />
                  Login to Continue
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/register')}
                  className="w-full sm:w-auto"
                >
                  Create Hospital Account
                </Button>
              </div>
            </div>
          ) : role !== 'hospital' ? (
            <div className="glass-card p-8 text-center max-w-lg mx-auto animate-reveal">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-50 text-yellow-500 mb-6">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Hospital Access Only</h3>
              <p className="text-muted-foreground mb-6">
                This feature is available only for hospital accounts. Please login with a hospital account to search for blood donors.
              </p>
              <Button 
                variant="primary"
                onClick={handleLoginClick}
                className="w-full sm:w-auto"
              >
                Switch to Hospital Account
              </Button>
            </div>
          ) : (
            <>
              <DonorSearch onSearch={handleSearch} className="mb-12" />
              
              {hasSearched && (
                <div className="animate-reveal">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      {searchResults.length} {searchResults.length === 1 ? "Donor" : "Donors"} Found
                    </h2>
                  </div>
                  
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.map((donor, index) => (
                        <DonorCard 
                          key={donor.id} 
                          donor={donor} 
                          className={cn("delay-[100ms]", index % 3 === 1 ? "delay-[200ms]" : index % 3 === 2 ? "delay-[300ms]" : "")}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="glass-card p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-50 text-yellow-500 mb-4">
                        <AlertCircle size={32} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No Donors Found</h3>
                      <p className="text-muted-foreground max-w-lg mx-auto">
                        We couldn't find any donors matching your search criteria. Please try broadening your search by adjusting the filters, or check back later.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FindDonor;
