import React from "react";
import { Avatar, Button, Field, Screen } from "../../components";
import { useApp, useAuth, useForm } from "../../hooks";
export function EditProfileScreen() {
  const app = useApp(),
    auth = useAuth();
  const form = useForm(
    {
      name: auth.user.name,
      username: auth.user.handle.replace("@", ""),
      bio: auth.user.bio,
    },
    (v) => ({
      ...(!v.name.trim() ? { name: "Enter your name." } : {}),
      ...(!/^[a-zA-Z0-9_]{3,20}$/.test(v.username)
        ? { username: "Use 3–20 letters, numbers, or underscores." }
        : {}),
    }),
  );
  return (
    <Screen title="Edit profile" onBack={app.back}>
      <Avatar uri={auth.user.avatar} size={80} />
      <Field
        label="Full name"
        value={form.values.name}
        onChange={(v) => form.setField("name", v)}
        error={form.errors.name}
      />
      <Field
        label="Username"
        value={form.values.username}
        onChange={(v) => form.setField("username", v)}
        error={form.errors.username}
        autoCapitalize="none"
      />
      <Field
        label="Bio"
        value={form.values.bio}
        onChange={(v) => form.setField("bio", v)}
        multiline
        maxLength={160}
      />
      <Button
        label="Save profile"
        onPress={() => {
          if (!form.validate()) return;
          auth.updateUser({
            name: form.values.name.trim(),
            handle: "@" + form.values.username,
            bio: form.values.bio,
          });
          app.toast("Profile updated");
          app.back();
        }}
      />
    </Screen>
  );
}
