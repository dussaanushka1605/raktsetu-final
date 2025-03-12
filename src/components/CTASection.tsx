
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-blood relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 opacity-10">
          <svg 
            width="500" 
            height="500" 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="40" fill="white" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 opacity-10">
          <svg 
            width="400" 
            height="400" 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="40" fill="white" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="animate-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Make a Difference?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking for a donor or want to become one, RaktSetu is here to connect you with the right people. Join our growing community today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/find-donor">
              <Button 
                variant="secondary" 
                size="lg" 
                className="font-medium bg-white text-blood hover:bg-white/90"
              >
                Find a Donor <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/become-donor">
              <Button 
                variant="primary" 
                size="lg" 
                className="font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20"
              >
                Become a Donor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
