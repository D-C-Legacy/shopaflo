import React from "react";
import { AppText, Button, Screen } from "../../components";
import { useApp, useAuth } from "../../hooks";
export function Entry() {
  const app = useApp(),
    auth = useAuth();
  return (
    <Screen title="Your demo session" onBack={app.back}>
      <AppText muted>
        Replay the launch experience, or log out to try Sign In and Sign Up.
      </AppText>
      <Button label="Replay onboarding" onPress={auth.restartOnboarding} />
      <Button secondary label="Log out" onPress={auth.logout} />
    </Screen>
  );
}
