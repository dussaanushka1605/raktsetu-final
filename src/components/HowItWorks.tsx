
import { CheckCircle, PhoneCall, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const Step = ({ title, description, icon, delay = 0 }: StepProps) => {
  return (
    <div 
      className={cn(
        "glass-card glass-card-hover p-6 animate-reveal",
        delay > 0 ? `[animation-delay:${delay}ms]` : ""
      )}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blood/10 text-blood mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to connect blood donors with recipients and save lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Step 
            title="Search for Donors" 
            description="Find blood donors near you by blood type, location, and availability with our easy-to-use search system."
            icon={<Search size={28} />}
            delay={0}
          />
          <Step 
            title="Contact Donor" 
            description="Connect directly with verified donors through our secure platform for quick and efficient communication."
            icon={<PhoneCall size={28} />}
            delay={300}
          />
          <Step 
            title="Save a Life" 
            description="Complete the donation process and contribute to saving a precious life through your generous gift."
            icon={<CheckCircle size={28} />}
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
