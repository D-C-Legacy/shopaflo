import React from "react";
import { View, Switch } from "react-native";
import { AppText, Screen, s } from "../../components";
import { useApp } from "../../hooks";
import { usePreferences } from "../../hooks/usePreferences";
import { colors, spacing } from "../../theme";
export function NotificationSettingsScreen() {
  const app = useApp(),
    preferences = usePreferences();
  const labels = {
    live: "Sellers going live",
    bids: "Bid and auction updates",
    orders: "Order updates",
    messages: "Messages",
  } as const;
  return (
    <Screen title="Notifications" onBack={app.back}>
      <AppText muted>Choose what you want to hear about in this demo.</AppText>
      {(Object.keys(labels) as (keyof typeof labels)[]).map((key) => (
        <View key={key} style={[s.row, { paddingVertical: spacing.xl }]}>
          <AppText bold>{labels[key]}</AppText>
          <Switch
            accessibilityLabel={labels[key]}
            value={preferences.notifications[key]}
            trackColor={{ true: colors.brand }}
            onValueChange={(value) =>
              preferences.setNotifications((v) => ({ ...v, [key]: value }))
            }
          />
        </View>
      ))}
    </Screen>
  );
}
