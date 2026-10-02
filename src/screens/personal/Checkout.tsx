import * as tokens from "../../theme";
import { PriceDisplay } from "../../components/commerce/PriceDisplay";
import { Card } from "../../components/ui/Card";
import { useAuth, usePreferences } from "../../hooks";
import { ROUTES } from "../../constants/routes";
import React, { useState } from "react";
import { View, Switch } from "react-native";
import {
  AppText,
  Button,
  Chips,
  EmptyState,
  Field,
  Photo,
  Screen,
  Section,
  s,
} from "../../components";
import { orders, products } from "../../data";
import { colors as c, formatUSD } from "../../theme";
import { useApp } from "../../context";
export function Checkout({ id, amount }: { id?: string; amount?: number }) {
  const app = useApp();
  const auth = useAuth(),
    prefs = usePreferences();
  const defaultAddress = prefs.addresses[0];
  const shipping = productShipping();
  function productShipping() {
    return app.inventory.find((p) => p.id === id)?.shipping ?? 12;
  }
  const product = app.inventory.find((x) => x.id === id) || products[0]!;
  const [step, setStep] = useState(0);
  const [name, setName] = useState(auth.user.name);
  const [address, setAddress] = useState(defaultAddress?.street ?? "");
  const [city, setCity] = useState(
    defaultAddress
      ? `${defaultAddress.city}, ${defaultAddress.region} ${defaultAddress.postal}`
      : "",
  );
  const [payment, setPayment] = useState(
    prefs.payments[0]
      ? `${prefs.payments[0].brand} ···· ${prefs.payments[0].last4}`
      : "",
  );
  const [failure, setFailure] = useState(false);
  const steps = [
    "Shipping address",
    "Payment method",
    "Order review",
    "All yours",
  ];
  return (
    <Screen
      title={steps[step]!}
      onBack={step > 0 && step < 3 ? () => setStep((v) => v - 1) : app.back}
    >
      {step < 3 && (
        <AppText muted size={12}>
          MOCK CHECKOUT · STEP {step + 1} OF 3
        </AppText>
      )}
      {step === 0 ? (
        <View style={{ marginTop: tokens.spacing.xxl }}>
          <Field label="Full name" value={name} onChange={setName} />
          <Field label="Street address" value={address} onChange={setAddress} />
          <Field label="City, state, ZIP" value={city} onChange={setCity} />
          <AppText muted>
            United States · Shipping {formatUSD(shipping)}
          </AppText>
        </View>
      ) : step === 1 ? (
        <>
          <Section title="Choose a demo card" />
          <Chips
            items={prefs.payments.map((p) => `${p.brand} ···· ${p.last4}`)}
            value={payment}
            onChange={setPayment}
          />
          <AppText muted>No card details are collected or charged.</AppText>
          <View style={[s.row, { marginVertical: tokens.spacing.xxl }]}>
            <AppText>Simulate payment failure</AppText>
            <Switch
              value={failure}
              onValueChange={setFailure}
              trackColor={{ true: c.brand }}
            />
          </View>
        </>
      ) : step === 2 ? (
        <View style={{ gap: tokens.spacing.lg, marginTop: tokens.spacing.xxl }}>
          <Photo
            uri={product.image}
            style={{
              width: "100%",
              height: 180,
              borderRadius: tokens.radii.card,
            }}
          />
          <AppText size={24} bold>
            {product.name}
          </AppText>
          <AppText>
            {name} · {address} · {city}
          </AppText>
          <AppText>{payment}</AppText>
          <Card style={[{ gap: tokens.spacing.md }]}>
            <View style={s.row}>
              <AppText>Item</AppText>
              <PriceDisplay value={amount ?? product.price} />
            </View>
            <View style={s.row}>
              <AppText>Shipping</AppText>
              <PriceDisplay value={12} />
            </View>
            <View style={s.row}>
              <AppText bold>Total</AppText>
              <PriceDisplay bold value={(amount ?? product.price) + shipping} />
            </View>
          </Card>
        </View>
      ) : (
        <EmptyState
          title="It’s all yours!"
          detail="Your mock purchase is confirmed. No payment was processed."
          onPress={() => app.navigate(ROUTES.ORDERS)}
          label="View orders"
        />
      )}
      {step < 3 && (
        <View style={{ marginTop: tokens.spacing.xxl, gap: tokens.spacing.md }}>
          <Button
            label={step === 2 ? "Confirm mock purchase" : "Continue"}
            disabled={
              step === 0 && (!name.trim() || !address.trim() || !city.trim())
            }
            onPress={() => {
              if (step === 2 && failure) {
                app.toast(
                  "Payment failed. Choose another demo method and try again.",
                );
                setStep(1);
                return;
              }
              if (step === 2)
                app.addOrder(product.id, amount ?? product.price, shipping);
              setStep((v) => v + 1);
            }}
          />
          {step === 2 && (
            <AppText muted size={12}>
              UI preview only · No real purchase
            </AppText>
          )}
        </View>
      )}
    </Screen>
  );
}
