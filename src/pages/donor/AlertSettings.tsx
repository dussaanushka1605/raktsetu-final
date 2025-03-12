
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Bell, MapPin, AlertTriangle, CheckCircle2, Save } from 'lucide-react';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const AlertSettings = () => {
  const { user, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    receiveSmsAlerts: true,
    receiveRareBloodAlerts: true,
    maxDistance: 25,
    emergencyOnly: false,
    phoneNumber: '9876543210',
    bloodGroups: ["A+"] // Default to user's blood group
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    // Redirect if not authenticated or not a donor
    if (!isAuthenticated || role !== 'donor') {
      navigate('/login');
      return;
    }
  }, [isAuthenticated, role, navigate]);

  const handleBloodGroupToggle = (bloodGroup: string) => {
    if (settings.bloodGroups.includes(bloodGroup)) {
      setSettings({
        ...settings,
        bloodGroups: settings.bloodGroups.filter(bg => bg !== bloodGroup)
      });
    } else {
      setSettings({
        ...settings,
        bloodGroups: [...settings.bloodGroups, bloodGroup]
      });
    }
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your alert preferences have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center mb-8">
            <Bell size={24} className="text-blood mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold">Alert Settings</h1>
          </div>
          
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive SMS notifications for blood donation requests</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.receiveSmsAlerts}
                    onChange={() => setSettings({...settings, receiveSmsAlerts: !settings.receiveSmsAlerts})}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blood/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blood"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rare Blood Group Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified about rare blood group requests regardless of distance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.receiveRareBloodAlerts}
                    onChange={() => setSettings({...settings, receiveRareBloodAlerts: !settings.receiveRareBloodAlerts})}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blood/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blood"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Emergency Only</p>
                  <p className="text-sm text-muted-foreground">Only receive alerts for urgent/emergency blood requests</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.emergencyOnly}
                    onChange={() => setSettings({...settings, emergencyOnly: !settings.emergencyOnly})}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blood/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blood"></div>
                </label>
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block font-medium mb-1">Phone Number for SMS Alerts</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={settings.phoneNumber}
                  onChange={(e) => setSettings({...settings, phoneNumber: e.target.value})}
                  className="input-field"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="maxDistance" className="block font-medium mb-1">
                  Maximum Distance: {settings.maxDistance} km
                </label>
                <input
                  type="range"
                  id="maxDistance"
                  min="5"
                  max="100"
                  step="5"
                  value={settings.maxDistance}
                  onChange={(e) => setSettings({...settings, maxDistance: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5 km</span>
                  <span>50 km</span>
                  <span>100 km</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Blood Group Alerts</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Select the blood groups you would like to receive alerts for. By default, you'll receive alerts matching your own blood group.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {bloodGroups.map(group => (
                <div 
                  key={group}
                  onClick={() => handleBloodGroupToggle(group)}
                  className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
                    settings.bloodGroups.includes(group) 
                      ? 'bg-blood text-white border-blood' 
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {group}
                </div>
              ))}
            </div>
            
            <div className="flex items-center bg-yellow-50 p-3 rounded-lg">
              <AlertTriangle size={20} className="text-yellow-600 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-700">
                Rare blood groups (AB-, B-, O-) may receive more frequent alerts due to limited availability.
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg mb-8">
            <div className="flex items-start">
              <CheckCircle2 size={20} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Your alerts are currently active</p>
                <p className="text-sm text-green-700">You'll receive SMS alerts based on your preferences</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="text-red-600 hover:text-red-800 hover:bg-red-50"
            >
              Pause Alerts
            </Button>
          </div>
          
          <div className="flex justify-end">
            <Button
              variant="secondary"
              className="mr-3"
              onClick={() => navigate('/donor/dashboard')}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveSettings}
              disabled={isSaving}
            >
              <Save size={18} className="mr-2" />
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AlertSettings;
