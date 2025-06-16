import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 add loading

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
    setLoading(false); // ✅ set loading to false after checking
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children} {/* ✅ render only when done checking */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
