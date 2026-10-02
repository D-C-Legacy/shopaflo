import React from "react";
import { AppText, Badge, MenuRow, Screen } from "../../components";
import { useApp } from "../../hooks";
import { usePreferences } from "../../hooks/usePreferences";
import { ROUTES } from "../../constants";
import { colors } from "../../theme";
export function SecurityScreen() {
  const app = useApp(),
    prefs = usePreferences();
  return (
    <Screen title="Security" onBack={app.back}>
      <AppText muted>Keep your account yours.</AppText>
      <MenuRow
        title="Change password"
        onPress={() => app.navigate(ROUTES.CHANGE_PASSWORD)}
      />
      <MenuRow
        title={prefs.verified ? "Profile verified" : "Verify profile"}
        detail="Local six-digit verification preview"
        onPress={() => app.navigate(ROUTES.VERIFICATION)}
      />
      <Badge
        label={prefs.verified ? "VERIFIED" : "VERIFICATION AVAILABLE"}
        color={prefs.verified ? colors.success : colors.warning}
      />
      <MenuRow
        title="Active sessions"
        detail="This device · Demo session"
        onPress={() => app.toast("Only this local session is active")}
      />
    </Screen>
  );
}
