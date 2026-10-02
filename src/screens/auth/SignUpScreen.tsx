import * as tokens from "../../theme";
import React, { useState } from "react";
import { View, Switch } from "react-native";
import { AppText, Button, Field } from "../../components";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { useAuth, useForm, useMockSubmit } from "../../hooks";
import { validateSignUp } from "../../utils/auth";
import { colors } from "../../theme";
export function SignUpScreen() {
  const auth = useAuth();
  const { loading, submit } = useMockSubmit();
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState("");
  const form = useForm(
    { name: "", username: "", email: "", password: "", confirmPassword: "" },
    validateSignUp,
  );
  return (
    <AuthLayout
      title="Find your people."
      description="Create your demo profile and join the moment."
      onBack={() => auth.setPage("welcome")}
    >
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
        label="Email"
        value={form.values.email}
        onChange={(v) => form.setField("email", v)}
        keyboardType="email-address"
        error={form.errors.email}
      />
      <Field
        label="Password"
        value={form.values.password}
        onChange={(v) => form.setField("password", v)}
        secure
        error={form.errors.password}
      />
      <Field
        label="Confirm password"
        value={form.values.confirmPassword}
        onChange={(v) => form.setField("confirmPassword", v)}
        secure
        error={form.errors.confirmPassword}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing.md,
        }}
      >
        <Switch
          accessibilityLabel="Accept terms"
          value={terms}
          onValueChange={(v) => {
            setTerms(v);
            setTermsError("");
          }}
          trackColor={{ true: colors.brand }}
        />
        <AppText size={13} style={{ flex: 1 }}>
          I agree to the demo Terms and Privacy notice. My information stays in
          this session.
        </AppText>
      </View>
      {termsError && (
        <AppText size={13} style={{ color: colors.live }}>
          {termsError}
        </AppText>
      )}
      <Button
        label="Create Account"
        loading={loading}
        onPress={() => {
          const valid = form.validate();
          if (!terms) setTermsError("Accept the terms to continue.");
          if (valid && terms)
            submit(() =>
              auth.beginSignUp(
                form.values.name,
                form.values.username,
                form.values.email,
              ),
            );
        }}
      />
      <Button
        secondary
        label="Already have an account? Sign In"
        onPress={() => auth.setPage("sign-in")}
      />
    </AuthLayout>
  );
}
