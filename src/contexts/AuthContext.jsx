
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user data on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password, role) => {
    setIsLoading(true);
    try {
      // Check if a user with this email exists in localStorage (for demo purposes)
      const allUsers = Object.keys(localStorage)
        .filter(key => key.startsWith('registered_'))
        .map(key => JSON.parse(localStorage.getItem(key) || '{}'));
      
      const existingUser = allUsers.find(u => u.email === email);
      
      if (existingUser) {
        // If user exists, log them in with their saved role
        const mockUser = {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        // If no user exists, create a mock user with the provided role
        const mockUser = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          role
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name, role) => {
    setIsLoading(true);
    try {
      // Generate a unique ID for the user
      const userId = Math.random().toString(36).substr(2, 9);
      
      // Create the user object
      const mockUser = {
        id: userId,
        email,
        name,
        role
      };
      
      // Store the registered user in localStorage with a unique key
      localStorage.setItem(`registered_${email}`, JSON.stringify(mockUser));
      
      // Set the current user and log them in
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    role: user?.role || null,
    login,
    register,
    logout
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
