import React from "react";
import { AppText, MenuRow, Screen, Section } from "../../components";
import { Card } from "../../components/ui/Card";
import { PriceDisplay } from "../../components/commerce/PriceDisplay";
import { analytics } from "../../data";
import { payouts } from "../../data/payouts";
import { formatUSD, spacing } from "../../theme";
import { useApp } from "../../hooks";
export function PayoutsScreen() {
  const app = useApp();
  return (
    <Screen title="Payouts" onBack={app.back}>
      <Card style={{ gap: spacing.md }}>
        <AppText muted>Mock available balance</AppText>
        <PriceDisplay value={analytics.sales} size={40} bold />
        <AppText muted>No money is held or transferred in this demo.</AppText>
      </Card>
      <Section title="Payout history" />
      {payouts.map((payout) => (
        <MenuRow
          key={payout.id}
          title={formatUSD(payout.amount)}
          detail={`${payout.date} · ${payout.status}`}
          onPress={() =>
            app.toast(`Demo payout ${payout.id} · ${formatUSD(payout.amount)}`)
          }
        />
      ))}
    </Screen>
  );
}
