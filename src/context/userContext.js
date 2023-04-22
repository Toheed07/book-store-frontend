import React, { useContext, useState, useEffect } from "react";
import { auth, fetchUser } from "../utils/firebase/firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        try {
          const userData = await fetchUser(userId);
          setCurrentUser(userData);
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
