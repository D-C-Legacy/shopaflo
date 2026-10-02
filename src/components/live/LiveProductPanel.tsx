import * as tokens from "../../theme";
import React from "react";
import { View, Pressable } from "react-native";
import { AppText, Photo, Badge, Button, s } from "../ui";
import type { Auction, Product } from "../../types";
import { colors, spacing, radii, formatUSD } from "../../theme";
export function LiveProductPanel({
  product,
  auction,
  issue,
  onProduct,
  onBid,
  onCustom,
  onPurchase,
  onReset,
}: {
  product: Product;
  auction: Auction;
  issue: string;
  onProduct: () => void;
  onBid: () => void;
  onCustom: () => void;
  onPurchase: () => void;
  onReset: () => void;
}) {
  const finished = auction.state === "won" || auction.state === "lost";
  const unavailable =
    ["upcoming", "preparing", "preview", "ended"].includes(auction.state) ||
    [
      "Stream ended",
      "Product withdrawn",
      "Auction cancelled",
      "Reconnecting…",
    ].includes(issue);
  return (
    <View
      style={{
        backgroundColor: tokens.colors.mediaPanel,
        borderWidth: 1,
        borderColor: tokens.colors.mediaBorder,
        borderRadius: radii.card,
        padding: spacing.lg,
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open live product details"
        onPress={onProduct}
        style={[s.row, { gap: spacing.md }]}
      >
        <Photo
          uri={product.image}
          style={{ width: 64, height: 64, borderRadius: tokens.radii.image }}
        />
        <View style={{ flex: 1 }}>
          <AppText white bold size={16}>
            {product.name}
          </AppText>
          <AppText white size={12}>
            {product.variant} · {product.condition}
          </AppText>
        </View>
      </Pressable>
      <View style={[s.row, { marginVertical: 14 }]}>
        <View>
          <AppText white size={12}>
            Current bid
          </AppText>
          <AppText
            white
            bold
            size={30}
            style={{ fontVariant: ["tabular-nums"] }}
          >
            {formatUSD(auction.current)}
          </AppText>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <AppText white size={12}>
            {auction.bids} bids
          </AppText>
          <AppText
            bold
            size={22}
            style={{ color: colors.live, fontVariant: ["tabular-nums"] }}
          >
            00:{String(auction.seconds).padStart(2, "0")}
          </AppText>
        </View>
      </View>
      {auction.state === "leading" && (
        <Badge label="✓ You're winning" color={colors.success} />
      )}
      {auction.state === "outbid" && (
        <AppText
          bold
          size={14}
          style={{ color: colors.warning, marginBottom: tokens.spacing.sm }}
        >
          ↑ You've been outbid
        </AppText>
      )}
      {auction.state === "finalCountdown" && (
        <AppText
          white
          bold
          size={13}
          style={{ marginBottom: tokens.spacing.sm }}
        >
          Final countdown · Last chance
        </AppText>
      )}
      {finished ? (
        <View style={{ gap: spacing.sm }}>
          <AppText white bold size={24}>
            {auction.state === "won" ? "YOU WON 🎉" : "Auction finished"}
          </AppText>
          <Button
            label={
              auction.state === "won"
                ? "Complete purchase"
                : "Explore the next find"
            }
            onPress={auction.state === "won" ? onPurchase : onReset}
          />
        </View>
      ) : (
        <Button
          variant="bid"
          label={
            unavailable
              ? auction.state.toUpperCase()
              : `BID ${formatUSD(auction.minimum)}`
          }
          disabled={unavailable}
          onPress={onBid}
        />
      )}
      <View style={[s.row, { marginTop: spacing.md }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Custom Bid"
          onPress={onCustom}
        >
          <AppText white size={12}>
            Custom Bid ›
          </AppText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Product Details"
          onPress={onProduct}
        >
          <AppText white size={12}>
            Product Details ›
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}
