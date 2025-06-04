import ActivityScreen from "@/components/screens/ActivityScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import ManagementActivityScreen from "@/components/screens/ManagementActivityScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import { useAuth } from "@/context/AuthContext";
import { RootStackParamList } from "@/types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CaretLeft, NotePencil, SignOut } from "phosphor-react-native";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async (navigation: any) => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
  };

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ActivityScreen" 
        component={ActivityScreen}
        options={({ navigation, route }: { navigation: any; route: { params: { categoryName: string } } }) => ({
          headerShown: true,
          title: route.params.categoryName,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 32,
            fontFamily: "BebasNeue_400Regular",
          },
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={{ marginLeft: 20 }}
            >
              <CaretLeft size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
        initialParams={{ categoryName: "" }}
      />
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Perfil",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#00BC7D",
            borderBottomWidth: 0,
            ...Platform.select({
              web: {
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              },
              default: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              },
            }),
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontSize: 32,
            fontFamily: "BebasNeue_400Regular",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}>
              <CaretLeft size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SettingsScreen")}
                style={{ marginHorizontal: 8 }}
              >
                <NotePencil size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLogout(navigation)}
                style={{ marginHorizontal: 8 }}
              >
                <SignOut size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
        initialParams={{ userName: "Default User", profileImageUri: "https://example.com/default-profile.png" }}
      />
      <Stack.Screen 
        name="SettingsScreen" 
        component={SettingsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Atualizar Perfil",
          headerTitleAlign: "center",
          headerTintColor: "black",
          headerTitleStyle: {
            fontSize: 32,
            fontFamily: "BebasNeue_400Regular",
          },
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={{ marginLeft: 20 }}
            >
              <CaretLeft size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen 
        name="ManagementActivityScreen" 
        component={ManagementActivityScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Cadastrar Atividade",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#00BC7D",
            borderBottomWidth: 0,
            ...Platform.select({
              web: {
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              },
              default: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              },
            }),
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontSize: 32,
            fontFamily: "BebasNeue_400Regular",
          },
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={{ marginLeft: 20 }}
            >
              <CaretLeft size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
