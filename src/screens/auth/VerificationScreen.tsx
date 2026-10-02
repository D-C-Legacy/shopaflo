import React, { useState } from "react";
import { AppText, Button, Field } from "../../components";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { useAuth, useCountdown, useMockSubmit } from "../../hooks";
import { MOCK_CONFIG } from "../../constants";
export function VerificationScreen({
  onVerified,
  onBack,
}: { onVerified?: () => void; onBack?: () => void } = {}) {
  const auth = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const countdown = useCountdown(MOCK_CONFIG.otpSeconds);
  const { loading, submit } = useMockSubmit();
  return (
    <AuthLayout
      title="One last little step."
      description={`Verify your demo profile for ${auth.email}.`}
      onBack={onBack ?? (() => auth.setPage("sign-up"))}
    >
      <Field
        label="Verification code"
        value={code}
        onChange={(v) => {
          setCode(v.replace(/\D/g, "").slice(0, 6));
          setError("");
        }}
        keyboardType="numeric"
        maxLength={6}
        error={error}
      />
      <AppText muted>Demo code: {MOCK_CONFIG.otpCode}</AppText>
      <Button
        label="Verify"
        loading={loading}
        disabled={code.length !== 6}
        onPress={() => {
          if (code !== MOCK_CONFIG.otpCode) {
            setError("That code does not match. Try the demo code.");
            return;
          }
          submit(onVerified ?? auth.verify);
        }}
      />
      <Button
        secondary
        label={
          countdown.seconds
            ? `Resend code in ${countdown.seconds}s`
            : "Resend code"
        }
        disabled={countdown.seconds > 0}
        onPress={() => {
          countdown.restart();
          setResent(true);
        }}
      />
      {resent && (
        <AppText muted size={13}>
          A new code is simulated. Use {MOCK_CONFIG.otpCode}.
        </AppText>
      )}
    </AuthLayout>
  );
}
