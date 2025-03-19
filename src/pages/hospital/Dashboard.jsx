
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Plus, Search, ChevronRight, Droplet, Users, AlertTriangle, MapPin, Clock, Calendar } from 'lucide-react';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

// Mock hospital data
const hospitalStats = {
  totalRequests: 24,
  activeRequests: 8,
  donorsFound: 18,
  urgentNeeds: 3
};

// Mock request data
const mockRequests = [
  {
    id: '1',
    bloodGroup: 'A+',
    requiredUnits: 2,
    requestDate: '2023-06-10',
    status: 'fulfilled',
    isUrgent: false,
    donorsResponded: 4
  },
  {
    id: '2',
    bloodGroup: 'O-',
    requiredUnits: 3,
    requestDate: '2023-06-15',
    status: 'pending',
    isUrgent: true,
    donorsResponded: 1
  },
  {
    id: '3',
    bloodGroup: 'B+',
    requiredUnits: 1,
    requestDate: '2023-06-18',
    status: 'pending',
    isUrgent: false,
    donorsResponded: 0
  },
  {
    id: '4',
    bloodGroup: 'AB+',
    requiredUnits: 2,
    requestDate: '2023-06-05',
    status: 'expired',
    isUrgent: true,
    donorsResponded: 0
  }
];

// Mock rare blood types alert
const rareBloodAlert = {
  bloodGroup: 'AB-',
  availableDonors: 3,
  lastDonation: '2 months ago'
};

// Mock blood inventory
const bloodInventory = [
  { group: 'A+', units: 12, status: 'adequate' },
  { group: 'A-', units: 5, status: 'low' },
  { group: 'B+', units: 8, status: 'adequate' },
  { group: 'B-', units: 2, status: 'critical' },
  { group: 'AB+', units: 4, status: 'low' },
  { group: 'AB-', units: 1, status: 'critical' },
  { group: 'O+', units: 15, status: 'adequate' },
  { group: 'O-', units: 6, status: 'low' }
];

// Mock donor responses
const mockDonorResponses = [
  {
    id: 'resp1',
    donorName: 'John Smith',
    bloodGroup: 'O-',
    distance: 3.2,
    responseTime: '10 minutes ago',
    contactNumber: '1234567890',
    forRequest: '2'
  },
  {
    id: 'resp2',
    donorName: 'Sarah Johnson',
    bloodGroup: 'O-',
    distance: 5.1,
    responseTime: '30 minutes ago',
    contactNumber: '9876543210',
    forRequest: '2'
  }
];

const HospitalDashboard = () => {
  const { user, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [donorResponses, setDonorResponses] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    // Redirect if not authenticated or not a hospital
    if (!isAuthenticated || role !== 'hospital') {
      navigate('/login');
      return;
    }
    
    // Load requests (mock data for now)
    setRequests(mockRequests);
    setInventory(bloodInventory);
    setDonorResponses(mockDonorResponses);
    
    // Show notification for critical blood levels
    const criticalBloodTypes = bloodInventory.filter(item => item.status === 'critical');
    if (criticalBloodTypes.length > 0) {
      const groups = criticalBloodTypes.map(item => item.group).join(', ');
      setTimeout(() => {
        toast({
          title: 'Critical Blood Levels',
          description: `Blood types ${groups} are at critical levels in your inventory.`,
          variant: 'destructive',
        });
      }, 2000);
    }
  }, [isAuthenticated, role, navigate]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'fulfilled':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInventoryStatusClass = (status) => {
    switch (status) {
      case 'adequate':
        return 'bg-green-100 text-green-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendAlert = (bloodGroup) => {
    toast({
      title: 'Alert Sent',
      description: `Emergency alert has been sent to all registered ${bloodGroup} donors in your area.`,
    });
  };

  const handleContactDonor = (donor) => {
    toast({
      title: 'Contact Information',
      description: `${donor.donorName}: ${donor.contactNumber}`,
    });
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Hospital Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your blood requests and find donors</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Button
                variant="secondary"
                onClick={() => navigate('/find-donor')}
              >
                <Search size={18} className="mr-2" />
                Find Donors
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/hospital/emergency-request')}
              >
                <Plus size={18} className="mr-2" />
                New Request
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-blood text-blood'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'inventory'
                    ? 'border-blood text-blood'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                Blood Inventory
              </button>
              <button
                onClick={() => setActiveTab('responses')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'responses'
                    ? 'border-blood text-blood'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                Donor Responses
              </button>
            </nav>
          </div>

          {activeTab === 'dashboard' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Requests</p>
                      <h3 className="text-2xl font-bold mt-1">{hospitalStats.totalRequests}</h3>
                    </div>
                    <div className="bg-blood/10 p-3 rounded-full">
                      <Droplet size={24} className="text-blood" />
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Active Requests</p>
                      <h3 className="text-2xl font-bold mt-1">{hospitalStats.activeRequests}</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Search size={24} className="text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Donors Found</p>
                      <h3 className="text-2xl font-bold mt-1">{hospitalStats.donorsFound}</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Users size={24} className="text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Urgent Needs</p>
                      <h3 className="text-2xl font-bold mt-1">{hospitalStats.urgentNeeds}</h3>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <AlertTriangle size={24} className="text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rare Blood Alert */}
              <div className="glass-card p-6 mb-8 bg-red-50 border border-red-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <AlertTriangle size={24} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Rare Blood Type Alert: {rareBloodAlert.bloodGroup}</h3>
                      <p className="text-muted-foreground text-sm">
                        Only {rareBloodAlert.availableDonors} donors available in your area. 
                        Last donation: {rareBloodAlert.lastDonation}.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleSendAlert(rareBloodAlert.bloodGroup)}
                  >
                    Send Emergency Alert
                  </Button>
                </div>
              </div>

              {/* Recent Requests */}
              <div className="glass-card p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Recent Blood Requests</h2>
                  <Button
                    variant="ghost"
                    className="text-sm flex items-center"
                  >
                    View all
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Blood Group
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Units
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Donors
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {requests.map((request) => (
                        <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                request.isUrgent ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {request.bloodGroup}
                              </div>
                              {request.isUrgent && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Urgent
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{request.requiredUnits} units</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{request.requestDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(request.status)}`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.donorsResponded} responded
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-blood">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'inventory' && (
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-6">Blood Inventory</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {inventory.map((item) => (
                  <div key={item.group} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-blood/10 h-12 w-12 rounded-full flex items-center justify-center">
                        <span className="text-blood font-bold">{item.group}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getInventoryStatusClass(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-1">{item.units} units</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      {item.status === 'adequate' ? 'Sufficient stock' : 
                       item.status === 'low' ? 'Running low' : 
                       'Critical shortage'}
                    </div>
                    
                    {item.status === 'critical' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => handleSendAlert(item.group)}
                      >
                        Send Alert
                      </Button>
                    )}
                    
                    {item.status === 'low' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        onClick={() => navigate('/find-donor')}
                      >
                        Find Donors
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Request New Units</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select className="input-field">
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                  
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="Number of units"
                    min="1"
                  />
                  
                  <Button variant="primary">
                    Create Request
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'responses' && (
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-6">Donor Responses</h2>
              
              {donorResponses.length > 0 ? (
                <div className="space-y-6">
                  {donorResponses.map((donor) => (
                    <div key={donor.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center mb-3">
                            <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                              <span className="font-semibold">{donor.bloodGroup}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold">{donor.donorName}</h3>
                              <p className="text-sm text-muted-foreground">
                                Responded to request #{donor.forRequest} • {donor.responseTime}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-2 flex-shrink-0" />
                              <span>{donor.distance} km away</span>
                            </div>
                            <div className="flex items-center">
                              <Clock size={16} className="mr-2 flex-shrink-0" />
                              <span>Estimated arrival: ~{Math.round(donor.distance * 10)} minutes</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleContactDonor(donor)}
                          >
                            Contact Donor
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <Users size={40} className="text-muted-foreground mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Donor Responses</h3>
                  <p className="text-muted-foreground">
                    You have no recent donor responses to your blood requests.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HospitalDashboard;
