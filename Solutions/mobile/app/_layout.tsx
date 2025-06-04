import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import { Slot } from "expo-router";
import React from "react";

const RootLayout: React.FC = () => {
  return (
    <UserProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </UserProvider>
  );
};

export default RootLayout;
