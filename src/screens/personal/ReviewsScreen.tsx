import React from "react";
import { AppText, Screen, Section } from "../../components";
import { Card } from "../../components/ui/Card";
import { reviews } from "../../data";
import { useApp } from "../../hooks";
import { spacing } from "../../theme";
export function ReviewsScreen() {
  const app = useApp();
  return (
    <Screen title="Your reviews" onBack={app.back}>
      <AppText muted>Good experiences make a great community.</AppText>
      <Section title="★ 4.9 · Community feedback" />
      {reviews.map((review) => (
        <Card
          key={review.id}
          style={{ gap: spacing.sm, marginBottom: spacing.md }}
        >
          <AppText bold>{review.name} · ★★★★★</AppText>
          <AppText>{review.text}</AppText>
        </Card>
      ))}
    </Screen>
  );
}
