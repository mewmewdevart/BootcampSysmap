import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/components/screens/LoginScreen";
import { RootStackParamList } from "@/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
