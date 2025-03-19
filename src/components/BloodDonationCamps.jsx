
import { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Bell } from 'lucide-react';
import Button from '@/components/Button';
import { toast } from '@/hooks/use-toast';

// Mock camps data
const mockCamps = [
  {
    id: 'camp1',
    name: 'City Hospital Blood Drive',
    location: 'City Hospital, Near Central Park',
    date: '2023-07-25',
    time: '9:00 AM - 5:00 PM',
    organizer: 'City Hospital',
    distance: 2.5
  },
  {
    id: 'camp2',
    name: 'Red Cross Blood Donation Camp',
    location: 'Community Center, Downtown',
    date: '2023-07-28',
    time: '10:00 AM - 6:00 PM',
    organizer: 'Red Cross Society',
    distance: 5.1
  },
  {
    id: 'camp3',
    name: 'University Blood Drive',
    location: 'University Campus, North Block',
    date: '2023-08-05',
    time: '9:00 AM - 4:00 PM',
    organizer: 'Medical Students Association',
    distance: 7.3
  }
];

const BloodDonationCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState({});
  
  useEffect(() => {
    // Simulate API call
    const fetchCamps = () => {
      setTimeout(() => {
        setCamps(mockCamps);
        setLoading(false);
      }, 1000);
    };
    
    fetchCamps();
    
    // Check local storage for existing registrations
    const storedRegistrations = localStorage.getItem('campRegistrations');
    if (storedRegistrations) {
      setRegistrations(JSON.parse(storedRegistrations));
    }
  }, []);
  
  const handleRegister = (campId) => {
    const updatedRegistrations = {
      ...registrations,
      [campId]: true
    };
    
    setRegistrations(updatedRegistrations);
    localStorage.setItem('campRegistrations', JSON.stringify(updatedRegistrations));
    
    toast({
      title: 'Registration Successful',
      description: 'You have been registered for this blood donation camp.',
    });
  };
  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="glass-card p-6 text-center animate-reveal">
        <div className="inline-flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-t-blood rounded-full animate-spin mr-2"></div>
          <span>Loading donation camps...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="glass-card p-6 mb-8 animate-reveal">
      <h2 className="text-xl font-semibold mb-4">Upcoming Blood Donation Camps</h2>
      <p className="text-muted-foreground mb-6">
        Find and register for blood donation camps happening near you.
      </p>
      
      {camps.length > 0 ? (
        <div className="space-y-6">
          {camps.map((camp) => (
            <div key={camp.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{camp.name}</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 flex-shrink-0" />
                      <span>{camp.location} ({camp.distance} km away)</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 flex-shrink-0" />
                      <span>{formatDate(camp.date)}, {camp.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 flex-shrink-0" />
                      <span>Organized by {camp.organizer}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  {registrations[camp.id] ? (
                    <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-md">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Registered
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleRegister(camp.id)}
                    >
                      Register
                    </Button>
                  )}
                </div>
              </div>
              
              {registrations[camp.id] && (
                <div className="mt-4 bg-blue-50 p-3 rounded-md flex items-start">
                  <Bell size={18} className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    You will receive a reminder 24 hours before this event. Please bring a valid ID proof with you.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="mb-4">
            <Calendar size={40} className="text-muted-foreground mx-auto" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Upcoming Camps</h3>
          <p className="text-muted-foreground">
            There are no upcoming blood donation camps in your area at the moment.
            Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default BloodDonationCamps;
