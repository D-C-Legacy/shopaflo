import { useCountdown } from "../../hooks/useCountdown";
import * as tokens from "../../theme";
import { PriceDisplay } from "../../components/commerce/PriceDisplay";
import { ROUTES } from "../../constants/routes";
import React, { useState } from "react";
import { View } from "react-native";
import {
  AppText,
  Badge,
  Button,
  Icon,
  MenuRow,
  Photo,
  Screen,
  Section,
} from "../../components";
import { buyer, products } from "../../data";
import { colors as c } from "../../theme";
import { useApp } from "../../context";
export function ControlRoom() {
  const app = useApp();
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const countdown = useCountdown(30, active);
  React.useEffect(() => {
    if (active && countdown.seconds === 0) {
      setActive(false);
      app.toast("Auction ended");
    }
  }, [active, countdown.seconds]);
  const [pinned, setPinned] = useState(false);
  const [ended, setEnded] = useState(false);
  const product = app.inventory[index % app.inventory.length] || products[0]!;
  return (
    <Screen title="Live control room" onBack={app.back}>
      <View
        style={{
          height: 210,
          backgroundColor: c.ink,
          borderRadius: tokens.radii.cardLarge,
          alignItems: "center",
          justifyContent: "center",
          gap: tokens.spacing.md,
        }}
      >
        <Icon name="videocam-outline" color={tokens.colors.canvas} size={40} />
        <Badge label={ended ? "ENDED" : "SIMULATED CAMERA"} color={c.live} />
        <AppText white size={12}>
          1,482 viewers · Preview session
        </AppText>
      </View>
      <Section title="On the stage" />
      <Photo
        uri={product.image}
        style={{
          height: 160,
          width: "100%",
          borderRadius: tokens.radii.button,
        }}
      />
      <View style={{ gap: tokens.spacing.sm, marginVertical: 18 }}>
        <AppText size={24} bold>
          {product.name}
        </AppText>
        <PriceDisplay size={30} bold value={product.price} />
        <AppText muted>
          {active
            ? `Auction running · 12 bids · 00:${String(countdown.seconds).padStart(2, "0")}`
            : "Ready for your next auction"}
        </AppText>
        {pinned && <Badge label="PINNED" />}
        <Button
          label={active ? "End auction" : "Start auction"}
          disabled={ended}
          onPress={() => {
            if (!active) countdown.restart();
            setActive((v) => !v);
            app.toast(active ? "Auction ended" : "Mock auction started");
          }}
        />
        <Button
          secondary
          label="Next product"
          disabled={ended}
          onPress={() => {
            setIndex((v) => (v + 1) % app.inventory.length);
            setActive(false);
          }}
        />
        <Button
          secondary
          label={pinned ? "Unpin product" : "Pin product"}
          onPress={() => setPinned((v) => !v)}
        />
      </View>
      <Section title="The queue" />
      {app.inventory.slice(0, 3).map((p, i) => (
        <MenuRow
          key={p.id}
          title={`${i === index ? "NOW" : i === index + 1 ? "NEXT" : "LATER"} · ${p.name}`}
          onPress={() => {
            setIndex(i);
            setActive(false);
          }}
        />
      ))}
      <Section title="Show tools" />
      {["Chat", "Orders", "Viewers", "Moderation"].map((v) => (
        <MenuRow
          key={v}
          title={v}
          onPress={() =>
            v === "Orders"
              ? app.navigate(ROUTES.ORDERS)
              : app.toast(
                  v === "Moderation"
                    ? "No moderation reports in this mock show"
                    : v === "Viewers"
                      ? "1,482 viewers · 32 active collectors"
                      : "Chat is open in the buyer live preview",
                )
          }
        />
      ))}
      <Button
        secondary
        label={ended ? "Restart preview" : "End show"}
        onPress={() => {
          setEnded((v) => !v);
          setActive(false);
        }}
      />
    </Screen>
  );
}
