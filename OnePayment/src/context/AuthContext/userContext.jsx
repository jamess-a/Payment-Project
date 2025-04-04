import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase"; // ตรวจสอบว่าพาธนี้ถูกต้อง
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ฟังก์ชันอัปเดต user
  const updateUser = (userData) => {
    setUser(userData);
  };

  // ตรวจสอบ auth state ตลอดเวลา
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          role: currentUser.role,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // ยกเลิก listener เมื่อ component ถูก unmount
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
