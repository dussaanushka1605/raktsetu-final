
import { useState } from 'react';
import { Check, X, MapPin, Mail, Send, Loader } from 'lucide-react';
import Button from '../Button';
import { useToast } from '@/hooks/use-toast';

const DonorApproval = ({ donor, onClose }) => {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [message, setMessage] = useState('');
  const [viewingLocation, setViewingLocation] = useState(false);
  const { toast } = useToast();

  const handleApprove = () => {
    setIsApproving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Donor approved",
        description: "The donor has been notified and will receive your hospital details.",
        variant: "default",
      });
      
      setIsApproving(false);
      onClose();
    }, 1500);
  };

  const handleReject = () => {
    setIsRejecting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Donor rejected",
        description: "The donor has been notified of the rejection.",
        variant: "default",
      });
      
      setIsRejecting(false);
      onClose();
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the donor.",
      variant: "default",
    });
    
    setMessage('');
  };

  const handleViewLocation = () => {
    setViewingLocation(true);
    
    // In a real app, this would load a map with the donor's location
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold">Donor Approval</h2>
          <p className="text-muted-foreground text-sm">Approve or reject donation request</p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
            {donor.bloodGroup}
          </div>
          <div>
            <h3 className="font-medium text-lg">{donor.name}</h3>
            <p className="text-muted-foreground text-sm">{donor.age} years old • Last donation: {donor.lastDonation}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium mb-2">Contact Information</h4>
            <p className="text-sm">Email: {donor.email}</p>
            <p className="text-sm">Phone: {donor.phone}</p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium mb-2">Medical Information</h4>
            <p className="text-sm">Blood Group: {donor.bloodGroup}</p>
            <p className="text-sm">Health: {donor.healthStatus}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={handleViewLocation}
          >
            <MapPin size={16} className="mr-2" />
            {viewingLocation ? 'Viewing Location' : 'View Location'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={() => window.location.href = `mailto:${donor.email}`}
          >
            <Mail size={16} className="mr-2" />
            Send Email
          </Button>
        </div>
        
        {viewingLocation && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium mb-2">Donor Location</h4>
            <p className="text-sm mb-2">Distance: {donor.distance} km away</p>
            <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                In a real application, a map would be displayed here
              </p>
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h4 className="font-medium mb-2">Send a message to donor</h4>
          <div className="flex gap-2">
            <input
              type="text"
              className="input-field"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button 
              variant="outline" 
              onClick={handleSendMessage} 
              disabled={!message.trim()}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={handleReject} 
          disabled={isRejecting || isApproving}
          className="flex items-center"
        >
          {isRejecting ? <Loader size={16} className="mr-2 animate-spin" /> : <X size={16} className="mr-2" />}
          Reject
        </Button>
        <Button 
          variant="primary" 
          onClick={handleApprove} 
          disabled={isRejecting || isApproving}
          className="flex items-center"
        >
          {isApproving ? <Loader size={16} className="mr-2 animate-spin" /> : <Check size={16} className="mr-2" />}
          Approve
        </Button>
      </div>
    </div>
  );
};

// Default donor data for demonstration
DonorApproval.defaultProps = {
  donor: {
    name: "John Doe",
    age: 28,
    bloodGroup: "O+",
    lastDonation: "6 months ago",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    healthStatus: "Good",
    distance: 3.5
  },
  onClose: () => {}
};

export default DonorApproval;
