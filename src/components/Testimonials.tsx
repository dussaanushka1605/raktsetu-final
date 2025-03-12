
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Blood Recipient",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
    quote: "RaktSetu helped me find a blood donor when my mother needed an emergency transfusion. The process was quick and saved her life. I'm forever grateful."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Donor",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
    quote: "I've been donating blood for years, but RaktSetu made it easier to connect with people in need. The platform is intuitive and gives me notifications when my blood type is urgently needed."
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Hospital Coordinator",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
    quote: "As a hospital coordinator, I've seen how RaktSetu bridges the gap between donors and patients. The verification system ensures reliable donors, which is crucial in emergency situations."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const nextTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 500);
  };
  
  const prevTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 500);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonials</h2>
          <p className="text-lg text-muted-foreground">
            Real stories from donors and recipients who've experienced the impact of blood donation.
          </p>
        </div>
        
        <div className="relative glass-card p-8 md:p-10 animate-reveal">
          <div className="absolute -top-4 -left-4 text-blood/20">
            <Quote size={64} />
          </div>
          
          <div 
            className={cn(
              "transition-opacity duration-500",
              isTransitioning ? "opacity-0" : "opacity-100"
            )}
          >
            <p className="text-lg md:text-xl text-foreground mb-8 text-balance relative z-10">
              "{testimonials[currentIndex].quote}"
            </p>
            
            <div className="flex items-center">
              <img 
                src={testimonials[currentIndex].image} 
                alt={testimonials[currentIndex].name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                <p className="text-muted-foreground text-sm">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-6 right-6 flex space-x-2">
            <button 
              onClick={prevTestimonial} 
              className="p-2 rounded-full bg-secondary text-foreground hover:bg-blood/10 hover:text-blood transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextTestimonial} 
              className="p-2 rounded-full bg-secondary text-foreground hover:bg-blood/10 hover:text-blood transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="absolute bottom-6 left-6 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isTransitioning) return;
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex 
                    ? "bg-blood w-6" 
                    : "bg-secondary hover:bg-blood/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
