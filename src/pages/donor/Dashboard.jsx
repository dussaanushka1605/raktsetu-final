import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Calendar, Bell, MapPin, Award, ChevronRight, Settings, FileText } from 'lucide-react';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import BloodDonationCamps from '@/components/BloodDonationCamps';
import MedicalQuestionnaire from '@/components/MedicalQuestionnaire';
import VerificationUpload from '@/components/VerificationUpload';
import { toast } from '@/hooks/use-toast';

// Mock donor stats - keep unchanged
const donorStats = {
  lastDonation: '3 months ago',
  totalDonations: 5,
  livesImpacted: 15,
  nextEligible: '2023-09-15'
};

// Mock nearby requests - keep unchanged
const mockNearbyRequests = [
  {
    id: '1',
    hospitalName: 'City General Hospital',
    bloodGroup: 'A+',
    distance: 2.5,
    postedDate: '2023-06-18',
    isUrgent: true
  },
  {
    id: '2',
    hospitalName: 'Memorial Medical Center',
    bloodGroup: 'O-',
    distance: 4.8,
    postedDate: '2023-06-17',
    isUrgent: false
  },
  {
    id: '3',
    hospitalName: 'Community Health Services',
    bloodGroup: 'B+',
    distance: 3.2,
    postedDate: '2023-06-15',
    isUrgent: false
  }
];

const DonorDashboard = () => {
  const { user, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [nearbyRequests, setNearbyRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [verificationStatus, setVerificationStatus] = useState('not_started');
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  
  useEffect(() => {
    // Redirect if not authenticated or not a donor
    if (!isAuthenticated || role !== 'donor') {
      navigate('/login');
      return;
    }
    
    // Load nearby requests (mock data for now)
    setNearbyRequests(mockNearbyRequests);
    
    // Check local storage for verification status
    const storedVerification = localStorage.getItem(`verification_${user?.id}`);
    if (storedVerification) {
      setVerificationStatus(JSON.parse(storedVerification).status);
    }
    
    // Check if questionnaire was completed
    const completedQuestionnaire = localStorage.getItem(`questionnaire_${user?.id}`);
    if (completedQuestionnaire) {
      setQuestionnaireCompleted(true);
    }
    
    // Show emergency popup for urgent requests after a delay
    const hasSeenEmergency = sessionStorage.getItem('emergency_popup_seen');
    const hasUrgentRequests = mockNearbyRequests.some(req => req.isUrgent);
    
    if (hasUrgentRequests && !hasSeenEmergency) {
      setTimeout(() => {
        showEmergencyPopup(mockNearbyRequests.find(req => req.isUrgent));
        sessionStorage.setItem('emergency_popup_seen', 'true');
      }, 3000);
    }
  }, [isAuthenticated, role, navigate, user]);
  
  const showEmergencyPopup = (request) => {
    // This would be a modal in a real app, but for simplicity we're using a toast
    toast({
      title: "URGENT: Blood Needed",
      description: `${request.hospitalName} urgently needs ${request.bloodGroup} blood type donors. You are just ${request.distance} km away.`,
      variant: "destructive",
      duration: 10000,
    });
  };
  
  const handleVerificationComplete = (data) => {
    setVerificationStatus(data.status);
    localStorage.setItem(`verification_${user?.id}`, JSON.stringify(data));
    toast({
      title: 'Verification Submitted',
      description: 'Your verification documents have been submitted for review.'
    });
  };
  
  const handleQuestionnaireComplete = (data) => {
    setQuestionnaireCompleted(true);
    localStorage.setItem(`questionnaire_${user?.id}`, JSON.stringify(data));
  };
  
  const handleRespondToRequest = (requestId) => {
    // In a real app, this would send the response to the server
    toast({
      title: 'Response Sent',
      description: 'The hospital has been notified of your willingness to donate.'
    });
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Donor Dashboard</h1>
              <p className="text-muted-foreground mt-1">Track your donation history and find nearby requests</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Button
                variant="secondary"
                onClick={() => navigate('/donor/alert-settings')}
              >
                <Settings size={18} className="mr-2" />
                Alert Settings
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
                onClick={() => setActiveTab('verification')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'verification'
                    ? 'border-blood text-blood'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                Verification
              </button>
              <button
                onClick={() => setActiveTab('questionnaire')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'questionnaire'
                    ? 'border-blood text-blood'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                Medical Questionnaire
              </button>
              <button
                onClick={() => setActiveTab('camps')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'camps'
                    ? 'border-blood text-blood'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                Donation Camps
              </button>
            </nav>
          </div>

          {activeTab === 'dashboard' && (
            <>
              {/* Donor Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Last Donation</p>
                      <h3 className="text-xl font-bold mt-1">{donorStats.lastDonation}</h3>
                    </div>
                    <div className="bg-blood/10 p-3 rounded-full">
                      <Calendar size={24} className="text-blood" />
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Donations</p>
                      <h3 className="text-xl font-bold mt-1">{donorStats.totalDonations}</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Award size={24} className="text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Lives Impacted</p>
                      <h3 className="text-xl font-bold mt-1">{donorStats.livesImpacted}</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Next Eligible Date</p>
                      <h3 className="text-xl font-bold mt-1">{donorStats.nextEligible}</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar size={24} className="text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert Status */}
              <div className="glass-card p-6 mb-8 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <Bell size={24} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Blood Donation Alerts</h3>
                    <p className="text-muted-foreground text-sm">You will receive SMS alerts for blood donation requests in your area</p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate('/donor/alert-settings')}
                >
                  Manage Alerts
                </Button>
              </div>

              {/* Verification Status */}
              {verificationStatus !== 'approved' && (
                <div className="glass-card p-6 mb-8 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FileText size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Verification Status</h3>
                      <p className="text-muted-foreground text-sm">
                        {verificationStatus === 'not_started' 
                          ? 'You need to complete the verification process to become an approved donor' 
                          : 'Your verification documents are under review'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActiveTab('verification')}
                  >
                    {verificationStatus === 'not_started' ? 'Complete Verification' : 'Check Status'}
                  </Button>
                </div>
              )}

              {/* Nearby Requests */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Nearby Blood Requests</h2>
                  <Button
                    variant="ghost"
                    className="text-sm flex items-center"
                  >
                    View all
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
                
                {nearbyRequests.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nearbyRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold">{request.hospitalName}</h3>
                          <div className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            request.isUrgent ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {request.bloodGroup}
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin size={14} className="mr-1" />
                            {request.distance} km away
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar size={14} className="mr-1" />
                            Posted {request.postedDate}
                          </div>
                        </div>
                        {request.isUrgent && (
                          <div className="mb-4 bg-red-50 text-red-700 text-sm p-2 rounded flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Urgent requirement
                          </div>
                        )}
                        <Button
                          variant="primary"
                          className="w-full"
                          onClick={() => handleRespondToRequest(request.id)}
                          disabled={verificationStatus !== 'approved'}
                        >
                          Respond to Request
                        </Button>
                        {verificationStatus !== 'approved' && (
                          <p className="text-xs text-center text-muted-foreground mt-2">
                            Complete verification to respond to requests
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No nearby requests at the moment.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'verification' && (
            <>
              {verificationStatus === 'not_started' && (
                <VerificationUpload 
                  userId={user?.id} 
                  onVerificationComplete={handleVerificationComplete} 
                />
              )}
              
              {verificationStatus === 'pending' && (
                <div className="glass-card p-8 text-center animate-reveal">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                    <FileText size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Verification In Progress</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Your verification documents are currently being reviewed. This process usually takes 24-48 hours.
                  </p>
                </div>
              )}
              
              {verificationStatus === 'approved' && (
                <div className="glass-card p-8 text-center animate-reveal">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Verification Approved</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Your account has been verified. You can now respond to donation requests and participate in donation camps.
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === 'questionnaire' && (
            <>
              {!questionnaireCompleted ? (
                <MedicalQuestionnaire 
                  gender={user?.gender || 'male'} 
                  onComplete={handleQuestionnaireComplete} 
                />
              ) : (
                <div className="glass-card p-8 text-center animate-reveal">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Questionnaire Completed</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You have already completed the medical questionnaire. You can retake it if your medical condition has changed.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      localStorage.removeItem(`questionnaire_${user?.id}`);
                      setQuestionnaireCompleted(false);
                    }}
                  >
                    Retake Questionnaire
                  </Button>
                </div>
              )}
            </>
          )}

          {activeTab === 'camps' && (
            <BloodDonationCamps />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DonorDashboard;
