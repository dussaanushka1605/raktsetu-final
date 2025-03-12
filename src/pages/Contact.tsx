
import { useState } from "react";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactInfo = () => {
  return (
    <div className="glass-card p-6 animate-reveal [animation-delay:300ms]">
      <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
      
      <div className="space-y-6">
        <div className="flex">
          <MapPin size={20} className="text-blood mr-3 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium">Office Address</h4>
            <p className="text-muted-foreground mt-1">
              123 Blood Bank Street<br />
              Medical District<br />
              City, Country
            </p>
          </div>
        </div>
        
        <div className="flex">
          <Phone size={20} className="text-blood mr-3 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium">Phone Number</h4>
            <p className="text-muted-foreground mt-1">
              <a href="tel:+1234567890" className="hover:text-blood transition-colors">
                +123 456 7890
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Monday to Friday, 9am to 6pm
            </p>
          </div>
        </div>
        
        <div className="flex">
          <Mail size={20} className="text-blood mr-3 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium">Email</h4>
            <p className="text-muted-foreground mt-1">
              <a href="mailto:contact@raktsetu.com" className="hover:text-blood transition-colors">
                contact@raktsetu.com
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              We aim to respond within 24 hours
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-medium mb-4">Emergency Contact</h4>
        <p className="text-muted-foreground mb-2">
          For urgent blood requirements:
        </p>
        <a 
          href="tel:+1234567890" 
          className="flex items-center text-blood font-medium hover:underline"
        >
          <Phone size={16} className="mr-2" />
          +123 456 7890 (24/7 Helpline)
        </a>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
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
        email: "",
        subject: "",
        message: ""
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-reveal">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions about blood donation or need assistance? We're here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="glass-card p-8 text-center animate-scale-in h-full flex flex-col justify-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6 mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.
                  </p>
                  <Button 
                    variant="primary"
                    onClick={() => setIsSubmitted(false)}
                    className="mx-auto"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="glass-card p-6 animate-reveal">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={cn(
                            "input-field",
                            errors.email && "border-red-500 focus:ring-red-500"
                          )}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">
                        Subject*
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={cn(
                          "input-field",
                          errors.subject && "border-red-500 focus:ring-red-500"
                        )}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                        Message*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={cn(
                          "input-field resize-none",
                          errors.message && "border-red-500 focus:ring-red-500"
                        )}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Button type="submit" variant="primary">
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
            <ContactInfo />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
