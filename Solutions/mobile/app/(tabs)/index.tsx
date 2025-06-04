import { ActivitiesProvider } from "@/context/ActivitiesContext";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import ProtectedRoutes from "@/navigation/ProtectedRoutes";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { DMSans_400Regular, useFonts } from "@expo-google-fonts/dm-sans";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    BebasNeue_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <UserProvider>
        <ActivitiesProvider>
          <ProtectedRoutes />
          <Toast />
        </ActivitiesProvider>
      </UserProvider>
    </AuthProvider>
  );
}
