import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/providers/AuthProvider";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { PreferencesProvider } from "./src/providers/PreferencesProvider";
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PreferencesProvider>
          <RootNavigator />
        </PreferencesProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
