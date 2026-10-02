import React from "react";
import { View, Switch } from "react-native";
import { AppText, Screen, s } from "../../components";
import { useApp } from "../../hooks";
import { usePreferences } from "../../hooks/usePreferences";
import { colors, spacing } from "../../theme";
export function PrivacyScreen() {
  const app = useApp(),
    prefs = usePreferences();
  const labels = {
    publicProfile: "Public profile",
    showActivity: "Show bidding activity",
    onlineStatus: "Show online status",
  } as const;
  return (
    <Screen title="Privacy" onBack={app.back}>
      <AppText muted>
        Your space, your choices. Preferences stay in this session.
      </AppText>
      {(Object.keys(labels) as (keyof typeof labels)[]).map((key) => (
        <View key={key} style={[s.row, { paddingVertical: spacing.xl }]}>
          <AppText bold>{labels[key]}</AppText>
          <Switch
            accessibilityLabel={labels[key]}
            value={prefs.privacy[key]}
            trackColor={{ true: colors.brand }}
            onValueChange={(value) =>
              prefs.setPrivacy((v) => ({ ...v, [key]: value }))
            }
          />
        </View>
      ))}
    </Screen>
  );
}
