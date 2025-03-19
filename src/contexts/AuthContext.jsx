
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
        // If user exists, log them in with their saved role and profile data
        const mockUser = {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role,
          profile: existingUser.profile || {}, // Keep any existing profile data
          bloodGroup: existingUser.bloodGroup,
          location: existingUser.location,
          gender: existingUser.gender,
          phone: existingUser.phone,
          isVerified: existingUser.isVerified || false
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        // If no user exists, create a mock user with the provided role
        const mockUser = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          role,
          profile: {},
          isVerified: false
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
        role,
        profile: {},
        isVerified: false
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

  const updateUserProfile = (profileData) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...profileData,
      profile: {
        ...(user.profile || {}),
        ...(profileData.profile || {})
      }
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Also update in the registered_ entry
    if (user.email) {
      localStorage.setItem(`registered_${user.email}`, JSON.stringify(updatedUser));
    }

    return updatedUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    role: user?.role || null,
    isVerified: user?.isVerified || false,
    login,
    register,
    logout,
    updateUserProfile
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
