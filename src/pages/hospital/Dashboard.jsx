
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Plus, Search, ChevronRight, Droplet, Users, AlertTriangle, Package } from 'lucide-react';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import BloodInventory from '@/components/hospital/BloodInventory';
import DonorApproval from '@/components/hospital/DonorApproval';

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

const HospitalDashboard = () => {
  const { user, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showDonorApproval, setShowDonorApproval] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  
  useEffect(() => {
    // Redirect if not authenticated or not a hospital
    if (!isAuthenticated || role !== 'hospital') {
      navigate('/login');
      return;
    }
    
    // Load requests (mock data for now)
    setRequests(mockRequests);
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

  const handleViewDonor = () => {
    // Mock donor data
    setSelectedDonor({
      name: "John Doe",
      age: 28,
      bloodGroup: "O+",
      lastDonation: "6 months ago",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
      healthStatus: "Good",
      distance: 3.5
    });
    setShowDonorApproval(true);
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

          {/* Tab Navigation */}
          <div className="flex border-b dark:border-gray-700 mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'text-blood border-b-2 border-blood'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'inventory'
                  ? 'text-blood border-b-2 border-blood'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('inventory')}
            >
              <Package size={16} className="inline mr-1" />
              Blood Inventory
            </button>
          </div>

          {activeTab === 'overview' ? (
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
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Blood Group
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Units
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Donors
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
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
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{request.requiredUnits} units</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{request.requestDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {request.donorsResponded} responded
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-blood"
                            onClick={handleViewDonor}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <BloodInventory />
          )}
        </div>
      </div>
      
      {/* Donor Approval Modal */}
      {showDonorApproval && selectedDonor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <DonorApproval 
            donor={selectedDonor} 
            onClose={() => setShowDonorApproval(false)} 
          />
        </div>
      )}
    </Layout>
  );
};

export default HospitalDashboard;
