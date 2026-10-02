import React, { useState } from "react";
import { AppText, Button, Field, MenuRow, Screen } from "../../components";
import { useApp, useForm } from "../../hooks";
import { usePreferences } from "../../hooks/usePreferences";
export function AddressesScreen() {
  const app = useApp(),
    prefs = usePreferences();
  const [adding, setAdding] = useState(false);
  const form = useForm(
    { name: "", street: "", city: "", region: "", postal: "" },
    (v) =>
      Object.fromEntries(
        Object.entries(v)
          .filter(([, value]) => !value.trim())
          .map(([key]) => [key, "This field is required."]),
      ),
  );
  return (
    <Screen title="Addresses" onBack={app.back}>
      <AppText muted>Use fictional addresses for the demo.</AppText>
      {prefs.addresses.map((address, index) => (
        <MenuRow
          key={address.id}
          title={address.street}
          detail={`${address.name} · ${address.city}, ${address.region} ${address.postal}${index === 0 ? " · Default" : ""}`}
          onPress={() => {
            prefs.setAddresses((v) => [
              address,
              ...v.filter((x) => x.id !== address.id),
            ]);
            app.toast("Default address updated");
          }}
        />
      ))}
      {adding ? (
        <>
          {(
            [
              ["name", "Recipient name"],
              ["street", "Street address"],
              ["city", "City"],
              ["region", "State"],
              ["postal", "ZIP code"],
            ] as const
          ).map(([key, label]) => (
            <Field
              key={key}
              label={label}
              value={form.values[key]}
              onChange={(v) => form.setField(key, v)}
              error={form.errors[key]}
            />
          ))}
          <AppText muted>United States</AppText>
          <Button
            label="Save address"
            onPress={() => {
              if (!form.validate()) return;
              prefs.setAddresses((v) => [
                ...v,
                {
                  ...form.values,
                  id: "address-" + Date.now(),
                  country: "United States",
                },
              ]);
              setAdding(false);
            }}
          />
          <Button secondary label="Cancel" onPress={() => setAdding(false)} />
        </>
      ) : (
        <Button label="Add address" onPress={() => setAdding(true)} />
      )}
    </Screen>
  );
}
