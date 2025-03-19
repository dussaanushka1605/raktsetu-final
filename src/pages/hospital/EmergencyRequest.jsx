
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { AlertTriangle, MapPin, Clock, Users, Bell } from 'lucide-react';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const EmergencyRequest = () => {
  const { user, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bloodGroup: '',
    units: 1,
    urgency: 'high',
    patientCondition: '',
    contactName: '',
    contactPhone: '',
    location: '',
    sendSMS: true,
    sendEmail: true,
    maxDistance: 10,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Emergency Request Sent',
        description: `Your request for ${formData.units} units of ${formData.bloodGroup} blood has been sent to nearby donors.`,
      });
      
      navigate('/hospital/dashboard');
    } catch (error) {
      console.error('Error submitting request:', error);
      
      toast({
        title: 'Failed to Send Request',
        description: 'There was an error sending your emergency request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-8 animate-reveal">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Emergency Blood Request</h1>
            <p className="text-muted-foreground">
              Submit an urgent request for blood donors in your area
            </p>
          </div>
          
          <div className="glass-card p-6 mb-8 animate-reveal">
            <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start mb-6">
              <AlertTriangle size={24} className="mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Emergency Requests</h3>
                <p className="text-sm">
                  Emergency requests will send immediate notifications to all eligible donors within the specified radius. 
                  Please only use this for genuine emergencies.
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-muted-foreground mb-1">
                    Blood Group *
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="units" className="block text-sm font-medium text-muted-foreground mb-1">
                    Units Required *
                  </label>
                  <input
                    id="units"
                    name="units"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.units}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="patientCondition" className="block text-sm font-medium text-muted-foreground mb-1">
                  Patient Condition
                </label>
                <textarea
                  id="patientCondition"
                  name="patientCondition"
                  value={formData.patientCondition}
                  onChange={handleChange}
                  rows="3"
                  className="input-field"
                  placeholder="Briefly describe the patient's condition and why blood is needed urgently"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-muted-foreground mb-1">
                    Contact Person *
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Name of the contact person"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-muted-foreground mb-1">
                    Contact Phone *
                  </label>
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Phone number for donors to contact"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-muted-foreground mb-1">
                  Hospital Location *
                </label>
                <div className="relative">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="Full hospital address"
                    required
                  />
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              
              <div>
                <label htmlFor="maxDistance" className="block text-sm font-medium text-muted-foreground mb-1">
                  Search Radius (km): {formData.maxDistance}
                </label>
                <input
                  id="maxDistance"
                  name="maxDistance"
                  type="range"
                  min="5"
                  max="50"
                  value={formData.maxDistance}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5 km</span>
                  <span>50 km</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="sendSMS"
                      name="sendSMS"
                      type="checkbox"
                      checked={formData.sendSMS}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-blood focus:ring-blood"
                    />
                    <label htmlFor="sendSMS" className="ml-2 block text-sm text-muted-foreground">
                      Send SMS to nearby donors
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="sendEmail"
                      name="sendEmail"
                      type="checkbox"
                      checked={formData.sendEmail}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-blood focus:ring-blood"
                    />
                    <label htmlFor="sendEmail" className="ml-2 block text-sm text-muted-foreground">
                      Send email to nearby donors
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Request...' : 'Send Emergency Request'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmergencyRequest;
