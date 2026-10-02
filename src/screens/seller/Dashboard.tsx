import * as tokens from "../../theme";
import { Card } from "../../components/ui/Card";
import { ROUTES } from "../../constants/routes";
import React, { useState } from "react";
import { View } from "react-native";
import { AppText, Chips, MenuRow, Screen, Section, s } from "../../components";
import { analytics } from "../../data";
import { colors as c, formatUSD } from "../../theme";
import { useApp } from "../../context";
export function Dashboard() {
  const app = useApp();
  const [range, setRange] = useState("This month");
  return (
    <Screen title="Seller dashboard" onBack={app.back}>
      <Chips
        items={["This week", "This month", "All time"]}
        value={range}
        onChange={setRange}
      />
      <View style={s.grid}>
        {[
          [formatUSD(analytics.sales), "Sales"],
          ["32", "Orders"],
          ["1,482", "Viewers"],
          ["8.4%", "Conversion"],
        ].map(([value, label]) => (
          <Card
            key={label}
            style={[s.card, { width: "48%", marginBottom: tokens.spacing.md }]}
          >
            <AppText size={25} bold>
              {value}
            </AppText>
            <AppText muted size={12}>
              {label}
            </AppText>
          </Card>
        ))}
      </View>
      <Section title="A good week" />
      <Card
        style={[
          s.card,
          {
            height: 180,
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 10,
          },
        ]}
      >
        {analytics.weekly.map((v, i) => (
          <View key={i} style={{ flex: 1, alignItems: "center", gap: 6 }}>
            <View
              style={{
                width: "100%",
                height:
                  v *
                  (range === "This week"
                    ? 1
                    : range === "All time"
                      ? 1.4
                      : 1.2),
                backgroundColor: i === 5 ? c.brand : tokens.colors.chartSoft,
                borderRadius: 6,
              }}
            />
            <AppText muted size={10}>
              {["M", "T", "W", "T", "F", "S", "S"][i]}
            </AppText>
          </View>
        ))}
      </Card>
      <AppText muted size={12} style={{ marginTop: tokens.spacing.sm }}>
        Mock sales distribution · {range}
      </AppText>
      {(
        [
          ["Orders", ROUTES.ORDERS],
          ["Inventory", ROUTES.INVENTORY],
          ["Shows", ROUTES.CREATE_SHOW],
          ["Payouts", ROUTES.PAYOUTS],
          ["Reviews", ROUTES.REVIEWS],
        ] as const
      ).map(([label, route]) => (
        <MenuRow
          key={route}
          title={label!}
          onPress={() => app.navigate(route!)}
        />
      ))}
    </Screen>
  );
}
