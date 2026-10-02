import React from "react";
import { Button, Field } from "../../components";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { useAuth, useForm, useMockSubmit } from "../../hooks";
import { validEmail, validPassword } from "../../utils/auth";
export function SignInScreen() {
  const auth = useAuth();
  const { loading, submit } = useMockSubmit();
  const form = useForm({ email: "", password: "" }, (v) => ({
    ...(!validEmail(v.email) ? { email: "Enter a valid email address." } : {}),
    ...(!validPassword(v.password)
      ? { password: "Use at least 8 characters." }
      : {}),
  }));
  return (
    <AuthLayout
      title="Welcome back."
      description="Your people and your next find are waiting."
      onBack={() => auth.setPage("welcome")}
    >
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
      <Button
        variant="ghost"
        label="Forgot Password"
        onPress={() => auth.setPage("forgot-password")}
      />
      <Button
        label="Sign In"
        loading={loading}
        onPress={() => {
          if (form.validate()) submit(() => auth.signIn(form.values.email));
        }}
      />
      <Button
        secondary
        label="Don't have an account? Sign Up"
        onPress={() => auth.setPage("sign-up")}
      />
    </AuthLayout>
  );
}
