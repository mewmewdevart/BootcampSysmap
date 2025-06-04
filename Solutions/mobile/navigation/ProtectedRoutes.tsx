import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthContext";
import AuthNavigator from "@/navigation/AuthNavigator";
import AppNavigator from "@/navigation/AppNavigator";

const ProtectedRoutes: React.FC = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  return token ? <AppNavigator /> : <AuthNavigator />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProtectedRoutes;
