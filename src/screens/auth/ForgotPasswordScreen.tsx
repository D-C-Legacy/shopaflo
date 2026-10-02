import React, { useState } from "react";
import { AppText, Button, Field, EmptyState } from "../../components";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { useAuth, useForm, useMockSubmit } from "../../hooks";
import { validEmail } from "../../utils/auth";
export function ForgotPasswordScreen() {
  const auth = useAuth();
  const [sent, setSent] = useState(false);
  const { loading, submit } = useMockSubmit();
  const form = useForm({ email: "" }, (v) =>
    validEmail(v.email) ? {} : { email: "Enter a valid email address." },
  );
  return (
    <AuthLayout
      title={sent ? "Check your email" : "A fresh start."}
      description={
        sent
          ? "Your reset-link preview is ready."
          : "Enter your email to preview a password reset."
      }
      onBack={() => auth.setPage("sign-in")}
    >
      {sent ? (
        <>
          <EmptyState
            title="Check your email"
            detail={`A reset link for ${form.values.email} is simulated. No email was sent.`}
          />
          <Button
            label="Back to Sign In"
            onPress={() => auth.setPage("sign-in")}
          />
        </>
      ) : (
        <>
          <Field
            label="Email"
            value={form.values.email}
            onChange={(v) => form.setField("email", v)}
            keyboardType="email-address"
            error={form.errors.email}
          />
          <Button
            label="Send Reset Link"
            loading={loading}
            onPress={() => {
              if (form.validate()) submit(() => setSent(true));
            }}
          />
          <AppText muted size={12}>
            This action does not contact an email service.
          </AppText>
        </>
      )}
    </AuthLayout>
  );
}
