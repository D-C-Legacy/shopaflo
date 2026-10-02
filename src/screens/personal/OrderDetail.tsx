import { TrackingStatus } from "../../components/commerce/TrackingStatus";
import * as tokens from "../../theme";
import { PriceDisplay } from "../../components/commerce/PriceDisplay";
import { Card } from "../../components/ui/Card";
import { ROUTES } from "../../constants/routes";
import React from "react";
import { View } from "react-native";
import {
  AppText,
  Badge,
  Button,
  Icon,
  Photo,
  Screen,
  Section,
  s,
} from "../../components";
import { orders } from "../../data";
import { colors as c, formatUSD } from "../../theme";
import { useApp } from "../../context";
export function OrderDetail({ id }: { id?: string }) {
  const app = useApp();
  const order = app.orders.find((x) => x.id === id) || app.orders[0]!;
  const product = app.inventory.find((x) => x.id === order.productId)!;
  return (
    <Screen title={order.id} onBack={app.back}>
      <Photo
        uri={product.image}
        style={{ height: 200, width: "100%", borderRadius: tokens.radii.card }}
      />
      <Section title={product.name} />
      <Badge label={order.status} color={c.success} />
      <Section title="The journey" />
      <TrackingStatus status={order.status} />
      <Card style={[{ gap: 10 }]}>
        <AppText bold>Payment summary</AppText>
        <View style={s.row}>
          <AppText>Item</AppText>
          <PriceDisplay value={order.amount ?? product.price} />
        </View>
        <View style={s.row}>
          <AppText>Shipping</AppText>
          <PriceDisplay value={order.shipping ?? 12} />
        </View>
        <View style={s.row}>
          <AppText bold>Total</AppText>
          <PriceDisplay
            bold
            value={(order.amount ?? product.price) + (order.shipping ?? 12)}
          />
        </View>
        <AppText muted size={12}>
          Demo tracking: SF001284 · Standard delivery
        </AppText>
      </Card>
      <View style={{ gap: tokens.spacing.md, marginTop: tokens.spacing.xl }}>
        {order.status === "Awaiting Payment" && (
          <Button
            label="Complete mock purchase"
            onPress={() => app.navigate(ROUTES.CHECKOUT, product.id)}
          />
        )}
        <Button
          secondary
          label="Message seller"
          onPress={() => app.navigate(ROUTES.CONVERSATION, product.sellerId)}
        />
        <Button
          secondary
          label="View receipt"
          onPress={() =>
            app.toast(
              `Demo receipt ${order.id} · ${formatUSD(product.price + 12)}`,
            )
          }
        />
        <Button
          secondary
          label="Report an issue"
          onPress={() => app.toast("Your demo report has been recorded")}
        />
      </View>
    </Screen>
  );
}
