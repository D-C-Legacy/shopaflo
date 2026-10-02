import * as tokens from "../../theme";
import { PriceDisplay } from "../../components/commerce/PriceDisplay";
import { ROUTES } from "../../constants/routes";
import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { AppText, Badge, Chips, Photo, Screen, s } from "../../components";
import { orders, sellers } from "../../data";
import { colors as c } from "../../theme";
import { useApp } from "../../context";
export function Orders() {
  const app = useApp();
  const orders = app.orders;
  const [tab, setTab] = useState("Buying");
  return (
    <Screen title="Orders" onBack={app.back}>
      <Chips items={["Buying", "Selling"]} value={tab} onChange={setTab} />
      {orders.map((o) => {
        const p = app.inventory.find((x) => x.id === o.productId)!;
        return (
          <Pressable
            key={o.id}
            onPress={() => app.navigate(ROUTES.ORDER, o.id)}
            style={[
              s.card,
              { marginVertical: tokens.spacing.sm, gap: tokens.spacing.md },
            ]}
          >
            <View style={s.row}>
              <AppText muted size={12}>
                {o.id} · {o.date}
              </AppText>
              <Badge
                label={o.status}
                color={o.status === "Delivered" ? c.success : c.brand}
              />
            </View>
            <View style={[s.row, { gap: tokens.spacing.md }]}>
              <Photo
                uri={p.image}
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: tokens.radii.image,
                }}
              />
              <View style={{ flex: 1 }}>
                <AppText bold>{p.name}</AppText>
                <AppText muted size={12}>
                  {tab === "Buying" ? "From" : "Sold by"}{" "}
                  {sellers.find((x) => x.id === p.sellerId)!.name}
                </AppText>
                <PriceDisplay bold value={o.amount ?? p.price} />
              </View>
            </View>
          </Pressable>
        );
      })}
    </Screen>
  );
}
