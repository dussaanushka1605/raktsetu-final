
import Layout from "@/components/Layout";
import { Heart, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ValueCard = ({ icon, title, description, delay = 0 }: ValueCardProps) => {
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

interface FAQProps {
  question: string;
  answer: string;
  delay?: number;
}

const FAQ = ({ question, answer, delay = 0 }: FAQProps) => {
  return (
    <div 
      className={cn(
        "border-b border-border last:border-0 py-6 animate-reveal",
        delay > 0 ? `[animation-delay:${delay}ms]` : ""
      )}
    >
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  );
};

const About = () => {
  const faqs = [
    {
      question: "How does RaktSetu work?",
      answer: "RaktSetu connects blood donors with recipients by allowing users to search for donors based on blood type, location, and availability. After finding a suitable donor, users can contact them directly through the platform."
    },
    {
      question: "Is my information secure on RaktSetu?",
      answer: "Yes, we take data privacy seriously. Your information is encrypted and stored securely. Only verified users can access contact information, and you can control who sees your details."
    },
    {
      question: "How can I verify my donor account?",
      answer: "You can verify your account by uploading a medical document confirming your blood type or by linking your profile to a recognized blood bank or hospital where you've donated before."
    },
    {
      question: "How often can I donate blood?",
      answer: "Generally, you can donate whole blood every 3 months (or 12 weeks). This period allows your body to replenish the donated blood. For specific components like platelets, you may be able to donate more frequently."
    },
    {
      question: "Can I specify when I'm available to donate?",
      answer: "Yes, as a registered donor, you can update your availability status to indicate when you're ready to donate. This helps users search for donors who are immediately available."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-16">
        {/* Mission Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 -z-10 opacity-10 blur-3xl">
              <svg 
                width="800" 
                height="800" 
                viewBox="0 0 100 100" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="40" fill="#E63946" />
              </svg>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-reveal">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                At RaktSetu, our mission is to bridge the gap between blood donors and recipients, creating a seamless connection that saves lives. We envision a world where no one loses their life due to lack of access to blood.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ValueCard 
                icon={<Heart size={28} />} 
                title="Compassion" 
                description="We believe in the power of human compassion to save lives and make a difference in our communities."
                delay={0}
              />
              <ValueCard 
                icon={<Users size={28} />} 
                title="Connection" 
                description="We strive to create a robust network that connects donors and recipients efficiently and effectively."
                delay={300}
              />
              <ValueCard 
                icon={<Shield size={28} />} 
                title="Trust" 
                description="We maintain the highest standards of privacy, security, and verification to ensure trust in our platform."
                delay={600}
              />
            </div>
          </div>
        </section>
        
        {/* Story Section */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-reveal">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    RaktSetu was founded in 2023 with a simple goal: to make blood donation more accessible and efficient. After witnessing the struggles people face in finding blood donors during emergencies, our founders decided to create a platform that addresses this critical need.
                  </p>
                  <p>
                    What started as a small project has grown into a community of thousands of donors and recipients across the country. Our platform has facilitated countless successful donations, each one representing a life saved or improved.
                  </p>
                  <p>
                    Today, RaktSetu continues to innovate and expand, driven by the belief that technology can help solve one of healthcare's most persistent challenges. We're constantly improving our platform based on user feedback and emerging needs.
                  </p>
                </div>
              </div>
              
              <div className="relative animate-reveal [animation-delay:300ms]">
                <div className="relative rounded-2xl overflow-hidden shadow-glass-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Blood donation drive" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 animate-reveal">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find answers to the most common questions about RaktSetu and blood donation.
              </p>
            </div>
            
            <div className="glass-card p-6">
              {faqs.map((faq, index) => (
                <FAQ 
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
