import React from "react";
import { AppText, Button, Field, Screen } from "../../components";
import { useApp, useForm, useMockSubmit } from "../../hooks";
import { validPassword } from "../../utils/auth";
export function ChangePasswordScreen() {
  const app = useApp(),
    mock = useMockSubmit();
  const form = useForm({ current: "", password: "", confirm: "" }, (v) => ({
    ...(!v.current ? { current: "Enter a fictional current password." } : {}),
    ...(!validPassword(v.password)
      ? { password: "Use at least 8 characters." }
      : {}),
    ...(v.password !== v.confirm ? { confirm: "Passwords must match." } : {}),
  }));
  return (
    <Screen title="Change password" onBack={app.back}>
      <AppText muted>
        Use fictional passwords. This demo does not store credentials.
      </AppText>
      <Field
        label="Current password"
        secure
        value={form.values.current}
        onChange={(v) => form.setField("current", v)}
        error={form.errors.current}
      />
      <Field
        label="New password"
        secure
        value={form.values.password}
        onChange={(v) => form.setField("password", v)}
        error={form.errors.password}
      />
      <Field
        label="Confirm password"
        secure
        value={form.values.confirm}
        onChange={(v) => form.setField("confirm", v)}
        error={form.errors.confirm}
      />
      <Button
        label="Update password"
        loading={mock.loading}
        onPress={() => {
          if (form.validate())
            mock.submit(() => {
              app.toast("Demo password update complete");
              app.back();
            });
        }}
      />
    </Screen>
  );
}
