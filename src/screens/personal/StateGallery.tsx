import { ErrorState } from "../../components/ui/ErrorState";
import * as tokens from "../../theme";
import { Card } from "../../components/ui/Card";
import { ROUTES } from "../../constants/routes";
import React, { useState } from "react";

import {
  AppText,
  Badge,
  Button,
  Chips,
  EmptyState,
  MenuRow,
  Screen,
  Section,
  Skeleton,
  s,
} from "../../components";
import { colors as c } from "../../theme";
import { useApp } from "../../context";
export function StateGallery() {
  const app = useApp();
  const [empty, setEmpty] = useState("Saved");
  const [state, setState] = useState("Default");
  return (
    <Screen title="Preview states" onBack={app.back}>
      <Chips
        items={[
          "Default",
          "Pressed",
          "Selected",
          "Disabled",
          "Loading",
          "Success",
          "Warning",
          "Error",
          "Empty",
          "Offline",
        ]}
        value={state}
        onChange={setState}
      />
      {state === "Error" ? (
        <ErrorState
          message="Bid rejected. Your bid was not placed."
          onRetry={() => setState("Default")}
        />
      ) : state === "Loading" ? (
        <Skeleton />
      ) : state === "Empty" ? (
        <>
          <Chips
            items={["Saved", "Orders", "Messages", "Inventory", "Search"]}
            value={empty}
            onChange={setEmpty}
          />
          <EmptyState
            title={`No ${empty.toLowerCase()} yet`}
            detail="Your next favorite is waiting to be discovered."
            onPress={() => app.navigate(ROUTES.DISCOVER)}
          />
        </>
      ) : state === "Offline" ? (
        <Card style={[{ gap: tokens.spacing.md }]}>
          <Badge label="OFFLINE" color={c.warning} />
          <AppText bold>You’re offline</AppText>
          <AppText muted>
            Your saved finds are still here. Reconnect to catch the next show.
          </AppText>
          <Button
            label="Reconnect preview"
            onPress={() => {
              setState("Success");
              app.toast("Connected");
            }}
          />
        </Card>
      ) : (
        <Card
          style={[{ gap: tokens.spacing.lg, marginTop: tokens.spacing.xl }]}
        >
          <Badge
            label={state.toUpperCase()}
            color={
              state === "Error"
                ? c.live
                : state === "Success"
                  ? c.success
                  : state === "Warning"
                    ? c.warning
                    : c.brand
            }
          />
          <AppText size={22} bold>
            {state === "Success"
              ? "You’re all set"
              : state === "Error"
                ? "Something went wrong"
                : state === "Warning"
                  ? "One more step"
                  : "A considered little detail"}
          </AppText>
          <AppText muted>
            {state === "Error"
              ? "Bid rejected. Your bid was not placed."
              : state === "Warning"
                ? "Verification required before bidding."
                : "Every state deserves the same care."}
          </AppText>
          <Button
            label={state === "Error" ? "Try again" : "Preview button"}
            disabled={state === "Disabled"}
            onPress={() => app.toast("Control responds locally")}
          />
        </Card>
      )}
      <Section title="Auction & connection examples" />
      {[
        "Reconnecting",
        "Stream ended",
        "Product withdrawn",
        "Auction cancelled",
        "Verification required",
        "Payment failed",
      ].map((v) => (
        <MenuRow
          key={v}
          title={v}
          onPress={() =>
            v === "Payment failed"
              ? app.navigate(ROUTES.CHECKOUT, "jordan")
              : app.selectStream("s1")
          }
        />
      ))}
      <AppText muted size={12}>
        Live options expose auction and connection states. Checkout includes a
        payment failure switch.
      </AppText>
    </Screen>
  );
}
