
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { useAuth } from "../context/AuthContext";
import LoadingState from "../components/LoadingState";
import colors from "../constants/colors";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState message="Checking authentication..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        key={isAuthenticated ? "authenticated" : "guest"}
        initialRouteName={isAuthenticated ? "Home" : "Login"}
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShadowVisible: false,
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Dashboard",
                headerBackVisible: false,
              }}
            />

            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                title: "My Profile",
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Login",
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
