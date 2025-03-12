
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import DonorForm from "@/components/DonorForm";
import { ListChecks, LogIn } from "lucide-react";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";

const eligibilityCriteria = [
  "Age between 18 and 65 years",
  "Weight more than 45 kg",
  "Hemoglobin more than 12.5 g/dL",
  "No chronic illnesses such as diabetes, hypertension",
  "Not under medication for any disease",
  "No history of high-risk behavior",
  "No previous history of Hepatitis B, C or HIV",
  "No tattoo, ear or skin piercing in the past 6 months",
  "No major surgeries in the past 6 months",
  "No blood donation in the past 3 months"
];

const BecomeDonor = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-reveal">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Become a Blood Donor</h1>
            <p className="text-lg text-muted-foreground">
              Join our community of lifesavers by registering as a blood donor today.
            </p>
          </div>
          
          {!isAuthenticated ? (
            <div className="glass-card p-8 text-center max-w-lg mx-auto animate-reveal">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blood/10 text-blood mb-6">
                <LogIn size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Login</h3>
              <p className="text-muted-foreground mb-6">
                To register as a blood donor, please log in to your account.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary"
                  onClick={handleLoginClick}
                  className="w-full sm:w-auto"
                >
                  <LogIn size={18} className="mr-2" />
                  Login
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/register')}
                  className="w-full sm:w-auto"
                >
                  Create an Account
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                First time here? Create an account to join our donor community.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <DonorForm />
              </div>
              
              <div className="glass-card p-6 animate-reveal [animation-delay:200ms] h-fit">
                <div className="flex items-center mb-4">
                  <ListChecks size={24} className="text-blood mr-2" />
                  <h2 className="text-xl font-semibold">Eligibility Criteria</h2>
                </div>
                <ul className="space-y-3">
                  {eligibilityCriteria.map((criteria, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        className="w-5 h-5 text-blood mt-0.5 mr-2 flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-muted-foreground">{criteria}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 bg-blood/5 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-blood">Note:</strong> These criteria are general guidelines. The final eligibility will be determined at the time of donation based on a screening process conducted by medical professionals.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BecomeDonor;
