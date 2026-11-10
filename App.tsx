
import React from "react";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <StatusBar style="light" backgroundColor="#2563EB" />

      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
