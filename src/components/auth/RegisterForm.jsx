
import { useState } from 'react';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';

const RegisterForm = ({ 
  name, 
  setName, 
  email, 
  setEmail, 
  password, 
  setPassword, 
  confirmPassword, 
  setConfirmPassword, 
  agreeToTerms, 
  setAgreeToTerms, 
  errors, 
  isLoading, 
  handleSubmit, 
  role 
}) => {
  return (
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

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blood hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
