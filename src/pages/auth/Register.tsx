
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hospital, Droplet, Check } from 'lucide-react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { UserRole } from '@/contexts/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('donor');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      await register(email, password, name, role);
      toast({
        title: 'Registration successful',
        description: `Your ${role} account has been created successfully.`,
      });
      
      // Redirect based on role
      if (role === 'hospital') {
        navigate('/hospital/dashboard');
      } else {
        navigate('/donor/dashboard');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Registration failed',
        description: 'There was an error creating your account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center mb-8 animate-reveal">
            <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
            <p className="text-muted-foreground">Join RaktSetu and help save lives</p>
          </div>

          <div className="glass-card p-6 animate-reveal">
            <div className="flex justify-center mb-6 space-x-4">
              <button
                type="button"
                onClick={() => setRole('donor')}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                  role === 'donor' ? 'bg-blood/10 border border-blood' : 'bg-secondary hover:bg-blood/5'
                }`}
              >
                <Droplet size={24} className={role === 'donor' ? 'text-blood' : 'text-muted-foreground'} />
                <span className={`mt-2 font-medium ${role === 'donor' ? 'text-blood' : 'text-muted-foreground'}`}>
                  Donor
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => setRole('hospital')}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                  role === 'hospital' ? 'bg-blood/10 border border-blood' : 'bg-secondary hover:bg-blood/5'
                }`}
              >
                <Hospital size={24} className={role === 'hospital' ? 'text-blood' : 'text-muted-foreground'} />
                <span className={`mt-2 font-medium ${role === 'hospital' ? 'text-blood' : 'text-muted-foreground'}`}>
                  Hospital
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                  {role === 'hospital' ? 'Hospital Name' : 'Full Name'}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={role === 'hospital' ? 'Enter hospital name' : 'Enter your full name'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`input-field ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
              
              <div className="mt-4">
                <div className="flex items-start">
                  <input
                    id="agreeToTerms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className={`mt-1 mr-2 h-4 w-4 rounded border-gray-300 text-blood focus:ring-blood ${
                      errors.agreeToTerms ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <a href="#" className="text-blood hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blood hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
                )}
              </div>
              
              <Button
                type="submit"
                variant="primary"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blood hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
