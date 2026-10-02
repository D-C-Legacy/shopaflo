import React from "react";
import { useAuth } from "../hooks";
import { WelcomeScreen } from "../screens/auth/WelcomeScreen";
import { SignInScreen } from "../screens/auth/SignInScreen";
import { SignUpScreen } from "../screens/auth/SignUpScreen";
import { ForgotPasswordScreen } from "../screens/auth/ForgotPasswordScreen";
import { VerificationScreen } from "../screens/auth/VerificationScreen";
export function AuthNavigator() {
  const { page } = useAuth();
  switch (page) {
    case "sign-in":
      return <SignInScreen />;
    case "sign-up":
      return <SignUpScreen />;
    case "forgot-password":
      return <ForgotPasswordScreen />;
    case "verification":
      return <VerificationScreen />;
    default:
      return <WelcomeScreen />;
  }
}
