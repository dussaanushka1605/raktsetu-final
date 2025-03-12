
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Droplet, AlertTriangle, CheckCircle2, Send } from 'lucide-react';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const rareBloodGroups = ["AB-", "B-", "O-"];

const EmergencyRequest = () => {
  const { user, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    bloodGroup: "A+",
    units: "1",
    patientName: "",
    patientAge: "",
    urgency: "normal",
    requiredDate: new Date().toISOString().split('T')[0],
    contactPerson: "",
    contactNumber: "",
    additionalNotes: "",
    sendRareAlert: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Redirect if not authenticated or not a hospital
    if (!isAuthenticated || role !== 'hospital') {
      navigate('/login');
      return;
    }
  }, [isAuthenticated, role, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.units || parseInt(formData.units) < 1) {
      newErrors.units = "At least 1 unit is required";
    }
    
    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }
    
    if (!formData.patientAge.trim()) {
      newErrors.patientAge = "Patient age is required";
    } else if (isNaN(parseInt(formData.patientAge)) || parseInt(formData.patientAge) <= 0) {
      newErrors.patientAge = "Please enter a valid age";
    }
    
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person is required";
    }
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid 10-digit contact number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Request submitted",
        description: "Your blood request has been submitted successfully.",
      });
      
      if (rareBloodGroups.includes(formData.bloodGroup) || formData.sendRareAlert) {
        toast({
          title: "SOS Alert Sent",
          description: "A rare blood group alert has been sent to matching donors in your area.",
          variant: "destructive",
        });
      }
      
      navigate('/hospital/dashboard');
    }, 1500);
  };

  const isRareBloodGroup = rareBloodGroups.includes(formData.bloodGroup);

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center mb-8">
            <Droplet size={24} className="text-blood mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold">New Blood Request</h1>
          </div>
          
          <div className="glass-card p-6 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="bloodGroup" className="block font-medium text-muted-foreground mb-1">
                    Blood Group*
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="units" className="block font-medium text-muted-foreground mb-1">
                    Number of Units*
                  </label>
                  <input
                    type="number"
                    id="units"
                    name="units"
                    min="1"
                    value={formData.units}
                    onChange={handleInputChange}
                    className={`input-field ${errors.units ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.units && <p className="mt-1 text-sm text-red-500">{errors.units}</p>}
                </div>
                
                <div>
                  <label htmlFor="patientName" className="block font-medium text-muted-foreground mb-1">
                    Patient Name*
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className={`input-field ${errors.patientName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.patientName && <p className="mt-1 text-sm text-red-500">{errors.patientName}</p>}
                </div>
                
                <div>
                  <label htmlFor="patientAge" className="block font-medium text-muted-foreground mb-1">
                    Patient Age*
                  </label>
                  <input
                    type="number"
                    id="patientAge"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleInputChange}
                    className={`input-field ${errors.patientAge ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.patientAge && <p className="mt-1 text-sm text-red-500">{errors.patientAge}</p>}
                </div>
                
                <div>
                  <label htmlFor="urgency" className="block font-medium text-muted-foreground mb-1">
                    Urgency Level*
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent (Within 24 hours)</option>
                    <option value="emergency">Emergency (Immediate)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="requiredDate" className="block font-medium text-muted-foreground mb-1">
                    Required By Date*
                  </label>
                  <input
                    type="date"
                    id="requiredDate"
                    name="requiredDate"
                    value={formData.requiredDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactPerson" className="block font-medium text-muted-foreground mb-1">
                    Contact Person*
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className={`input-field ${errors.contactPerson ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.contactPerson && <p className="mt-1 text-sm text-red-500">{errors.contactPerson}</p>}
                </div>
                
                <div>
                  <label htmlFor="contactNumber" className="block font-medium text-muted-foreground mb-1">
                    Contact Number*
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="10-digit number"
                    className={`input-field ${errors.contactNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.contactNumber && <p className="mt-1 text-sm text-red-500">{errors.contactNumber}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="additionalNotes" className="block font-medium text-muted-foreground mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Any additional information about the request..."
                />
              </div>
              
              {isRareBloodGroup && (
                <div className="flex items-center p-4 mb-6 bg-yellow-50 rounded-lg">
                  <AlertTriangle size={20} className="text-yellow-600 mr-3 flex-shrink-0" />
                  <p className="text-sm text-yellow-700">
                    <span className="font-semibold">{formData.bloodGroup}</span> is a rare blood group. An SOS alert will be automatically sent to matching donors in your area.
                  </p>
                </div>
              )}
              
              {!isRareBloodGroup && formData.urgency === "emergency" && (
                <div className="flex items-start mb-6">
                  <input
                    type="checkbox"
                    id="sendRareAlert"
                    name="sendRareAlert"
                    checked={formData.sendRareAlert}
                    onChange={handleInputChange}
                    className="mt-1 mr-2 h-4 w-4 rounded border-gray-300 text-blood focus:ring-blood"
                  />
                  <label htmlFor="sendRareAlert" className="text-sm">
                    Send SOS alert to all nearby donors regardless of blood group compatibility (for emergency situations only)
                  </label>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/hospital/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  <Send size={18} className="mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
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
