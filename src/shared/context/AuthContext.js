import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

/**
 * Simulated identity for MVP demo only.
 * NOT secure — server trusts headers blindly.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (role) => {
    if (role === 'Farmer') {
      setUser({ id: 'seller_123', name: 'Demo Farmer', role: 'Farmer' });
    } else {
      setUser({ id: 'buyer_default', name: 'Demo Buyer', role: 'Buyer' });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
