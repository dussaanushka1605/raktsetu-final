
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "./Button";
import { cn } from "@/lib/utils";

interface DonorFormProps {
  className?: string;
}

interface FormData {
  name: string;
  age: string;
  bloodGroup: string;
  location: string;
  contactNumber: string;
  lastDonation: string;
  hasConsented: boolean;
}

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonorForm = ({ className }: DonorFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    bloodGroup: "A+",
    location: "",
    contactNumber: "",
    lastDonation: "",
    hasConsented: false
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is changed
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (parseInt(formData.age) < 18 || parseInt(formData.age) > 65) {
      newErrors.age = "Age must be between 18 and 65";
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits";
    }
    
    if (!formData.hasConsented) {
      newErrors.hasConsented = "You must consent to the terms";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setFormData({
        name: "",
        age: "",
        bloodGroup: "A+",
        location: "",
        contactNumber: "",
        lastDonation: "",
        hasConsented: false
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className={cn("glass-card p-8 text-center animate-scale-in", className)}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-2">Registration Successful!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for registering as a blood donor. Your information has been submitted successfully.
        </p>
        <Button 
          variant="primary"
          onClick={() => setIsSubmitted(false)}
        >
          Register Another Donor
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("glass-card p-6 animate-reveal", className)}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
              Full Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={cn(
                "input-field",
                errors.name && "border-red-500 focus:ring-red-500"
              )}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-muted-foreground mb-1">
              Age* (18-65)
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="18"
              max="65"
              value={formData.age}
              onChange={handleInputChange}
              className={cn(
                "input-field",
                errors.age && "border-red-500 focus:ring-red-500"
              )}
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-500">{errors.age}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-muted-foreground mb-1">
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
            <label htmlFor="location" className="block text-sm font-medium text-muted-foreground mb-1">
              Location*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, State"
              className={cn(
                "input-field",
                errors.location && "border-red-500 focus:ring-red-500"
              )}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">{errors.location}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-muted-foreground mb-1">
              Contact Number*
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="10-digit number"
              className={cn(
                "input-field",
                errors.contactNumber && "border-red-500 focus:ring-red-500"
              )}
            />
            {errors.contactNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.contactNumber}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastDonation" className="block text-sm font-medium text-muted-foreground mb-1">
              Last Donation Date (if any)
            </label>
            <input
              type="date"
              id="lastDonation"
              name="lastDonation"
              value={formData.lastDonation}
              onChange={handleInputChange}
              className="input-field"
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="hasConsented"
              name="hasConsented"
              checked={formData.hasConsented}
              onChange={handleInputChange}
              className={cn(
                "mt-1 mr-2 h-4 w-4 rounded border-gray-300 text-blood focus:ring-blood",
                errors.hasConsented && "border-red-500 focus:ring-red-500"
              )}
            />
            <label htmlFor="hasConsented" className="text-sm text-muted-foreground">
              I consent to be contacted by those in need of blood donation. I understand my contact information will be shared with verified users of the platform.*
            </label>
          </div>
          {errors.hasConsented && (
            <p className="mt-1 text-sm text-red-500">{errors.hasConsented}</p>
          )}
        </div>
        
        <div className="mt-6">
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            Register as a Donor
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DonorForm;
