import React from "react";
import { View, BackHandler } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../hooks";
import { colors } from "../theme";
import { SplashScreen } from "../screens/auth/SplashScreen";
import { OnboardingScreen } from "../screens/auth/OnboardingScreen";
import { AuthNavigator } from "./AuthNavigator";
import { MainTabNavigator } from "./MainTabNavigator";
export function RootNavigator() {
  const auth = useAuth();
  const insets = useSafeAreaInsets();
  React.useEffect(() => {
    if (auth.state !== "unauthenticated") return;
    const listener = BackHandler.addEventListener("hardwareBackPress", () => {
      if (auth.page === "welcome") return false;
      auth.setPage(auth.page === "verification" ? "sign-up" : "welcome");
      return true;
    });
    return () => listener.remove();
  }, [auth.state, auth.page]);
  if (auth.state === "loading") return <SplashScreen />;
  if (auth.state === "authenticated") return <MainTabNavigator />;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.softCanvas,
        alignItems: "center",
      }}
    >
      <StatusBar style="dark" />
      <View
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 480,
          backgroundColor: colors.canvas,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        {auth.state === "onboarding" ? <OnboardingScreen /> : <AuthNavigator />}
      </View>
    </View>
  );
}
