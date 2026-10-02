import * as tokens from "../../theme";
import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { AppText, Button, Icon, Screen } from "../../components";
import { ONBOARDING } from "../../constants";
import { colors, spacing, radii } from "../../theme";
import { useAuth } from "../../hooks";
export function OnboardingScreen() {
  const auth = useAuth();
  const [step, setStep] = useState(0);
  const item = ONBOARDING[step]!;
  return (
    <Screen title="ShopaFlo">
      <View style={{ gap: spacing.xl, paddingTop: spacing.xl }}>
        <View
          style={{
            backgroundColor: colors.ink,
            borderRadius: radii.sheet,
            height: 230,
            alignItems: "center",
            justifyContent: "center",
            gap: spacing.xl,
          }}
        >
          <View
            style={{
              backgroundColor: colors.brand,
              padding: spacing.xxl,
              borderRadius: radii.pill,
            }}
          >
            <Icon name={item.icon} size={64} color={tokens.colors.canvas} />
          </View>
          <AppText white size={13}>
            LIVE ENTERTAINMENT × GREAT FINDS
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: spacing.sm,
            justifyContent: "center",
          }}
        >
          {ONBOARDING.map((_, index) => (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityLabel={`Onboarding page ${index + 1}`}
              onPress={() => setStep(index)}
              style={{
                height: 8,
                width: step === index ? 28 : 8,
                borderRadius: radii.pill,
                backgroundColor: step === index ? colors.brand : colors.line,
              }}
            />
          ))}
        </View>
        <AppText muted size={12}>
          0{step + 1} / 03
        </AppText>
        <AppText size={36} bold>
          {item.title}
        </AppText>
        <AppText muted>{item.description}</AppText>
        <Button
          label={step === 2 ? "Get Started" : "Continue"}
          onPress={() =>
            step === 2 ? auth.finishOnboarding() : setStep((v) => v + 1)
          }
        />
        <Button
          secondary
          label="I already have an account"
          onPress={() => {
            auth.finishOnboarding();
            auth.setPage("sign-in");
          }}
        />
        {step > 0 && (
          <Button
            variant="ghost"
            label="Previous"
            onPress={() => setStep((v) => v - 1)}
          />
        )}
      </View>
    </Screen>
  );
}
