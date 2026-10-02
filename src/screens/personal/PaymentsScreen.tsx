import React, { useState } from "react";
import {
  AppText,
  Button,
  Chips,
  Field,
  MenuRow,
  Screen,
} from "../../components";
import { useApp, useForm } from "../../hooks";
import { usePreferences } from "../../hooks/usePreferences";
export function PaymentsScreen() {
  const app = useApp(),
    prefs = usePreferences();
  const [adding, setAdding] = useState(false),
    [brand, setBrand] = useState("Visa");
  const form = useForm({ label: "", last4: "" }, (v) => ({
    ...(!v.label.trim() ? { label: "Add a nickname." } : {}),
    ...(!/^\d{4}$/.test(v.last4)
      ? { last4: "Enter four fictional digits." }
      : {}),
  }));
  return (
    <Screen title="Payment methods" onBack={app.back}>
      <AppText muted>
        Demo cards only. No card number or payment is collected.
      </AppText>
      {prefs.payments.map((p, index) => (
        <MenuRow
          key={p.id}
          title={`${p.brand} ···· ${p.last4}`}
          detail={`${p.label}${index === 0 ? " · Default" : ""}`}
          onPress={() => {
            prefs.setPayments((v) => [p, ...v.filter((x) => x.id !== p.id)]);
            app.toast("Default demo card updated");
          }}
        />
      ))}
      {adding ? (
        <>
          <Field
            label="Card nickname"
            value={form.values.label}
            onChange={(v) => form.setField("label", v)}
            error={form.errors.label}
          />
          <Chips
            items={["Visa", "Mastercard"]}
            value={brand}
            onChange={setBrand}
          />
          <Field
            label="Last four demo digits"
            value={form.values.last4}
            onChange={(v) =>
              form.setField("last4", v.replace(/\D/g, "").slice(0, 4))
            }
            keyboardType="numeric"
            maxLength={4}
            error={form.errors.last4}
          />
          <Button
            label="Save demo card"
            onPress={() => {
              if (!form.validate()) return;
              prefs.setPayments((v) => [
                ...v,
                {
                  id: "card-" + Date.now(),
                  label: form.values.label,
                  brand,
                  last4: form.values.last4,
                },
              ]);
              setAdding(false);
            }}
          />
          <Button secondary label="Cancel" onPress={() => setAdding(false)} />
        </>
      ) : (
        <Button label="Add demo card" onPress={() => setAdding(true)} />
      )}
    </Screen>
  );
}
