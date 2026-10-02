import React from "react";
import { View } from "react-native";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { AppText, Button, Icon } from "../../components";
import { colors, radii, spacing } from "../../theme";
import { useAuth } from "../../hooks";
export function WelcomeScreen() {
  const auth = useAuth();
  return (
    <AuthLayout
      title="Where shopping goes live."
      description="Watch. Bid. Buy. Discover something worth staying for."
    >
      <View
        style={{
          height: 170,
          borderRadius: radii.sheet,
          backgroundColor: colors.ink,
          alignItems: "center",
          justifyContent: "center",
          gap: spacing.md,
        }}
      >
        <Icon name="sparkles-outline" size={52} color={colors.brand} />
        <AppText white bold size={22}>
          Your next favorite. Found live.
        </AppText>
      </View>
      <Button label="Create Account" onPress={() => auth.setPage("sign-up")} />
      <Button
        secondary
        label="Sign In"
        onPress={() => auth.setPage("sign-in")}
      />
      <Button
        variant="ghost"
        label="Replay onboarding"
        onPress={auth.restartOnboarding}
      />
    </AuthLayout>
  );
}
