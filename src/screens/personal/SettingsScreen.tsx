import React from "react";
import { AppText, Button, MenuRow, Screen, Section } from "../../components";
import { useApp, useAuth } from "../../hooks";
import { ROUTES } from "../../constants";
export function SettingsScreen() {
  const app = useApp(),
    auth = useAuth();
  const items = [
    ["Edit profile", ROUTES.EDIT_PROFILE],
    ["Payment methods", ROUTES.PAYMENTS],
    ["Addresses", ROUTES.ADDRESSES],
    ["Notifications", ROUTES.NOTIFICATIONS],
    ["Privacy", ROUTES.PRIVACY],
    ["Security", ROUTES.SECURITY],
    ["Help & support", ROUTES.HELP],
    ["Preview states", ROUTES.STATES],
  ] as const;
  return (
    <Screen title="Settings" onBack={app.back}>
      <AppText muted>{auth.user.name} · Local demo session</AppText>
      {items.map(([title, route]) => (
        <MenuRow
          key={route}
          title={title}
          onPress={() => app.navigate(route)}
        />
      ))}
      <Section title="Your session" />
      <Button variant="danger" label="Log out" onPress={auth.logout} />
      <Button
        variant="ghost"
        label="Replay onboarding"
        onPress={auth.restartOnboarding}
      />
    </Screen>
  );
}
