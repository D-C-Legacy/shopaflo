import React from "react";
import { View } from "react-native";
import { APP_NAME } from "../../constants";
import { AppText, Icon, Screen } from "../ui";
import { colors, spacing } from "../../theme";
export function AuthLayout({
  title,
  description,
  onBack,
  children,
}: {
  title: string;
  description: string;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Screen title="" onBack={onBack}>
      <View style={{ gap: spacing.xl, paddingTop: spacing.lg }}>
        <View
          style={{
            flexDirection: "row",
            gap: spacing.sm,
            alignItems: "center",
          }}
        >
          <Icon name="radio-outline" color={colors.brand} />
          <AppText bold size={20}>
            {APP_NAME}
          </AppText>
        </View>
        <AppText bold size={36}>
          {title}
        </AppText>
        <AppText muted>{description}</AppText>
        <View style={{ gap: spacing.md }}>{children}</View>
        <AppText muted size={11}>
          Demo experience · Use fictional information. No account, email, or
          payment is processed.
        </AppText>
      </View>
    </Screen>
  );
}
