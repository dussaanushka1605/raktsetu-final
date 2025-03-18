
/**
 * Validates registration form data
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} confirmPassword - Confirmation password
 * @param {boolean} agreeToTerms - Whether user agreed to terms
 * @returns {Object} - Object containing errors (if any)
 */
export const validateRegistrationForm = (name, email, password, confirmPassword, agreeToTerms) => {
  const errors = {};
  
  if (!name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (!agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms and conditions';
  }
  
  return errors;
};
