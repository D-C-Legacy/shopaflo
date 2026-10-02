import * as tokens from "../../theme";
import { PriceDisplay } from "../../components/commerce/PriceDisplay";
import { ROUTES } from "../../constants/routes";
import React from "react";
import { View, Pressable } from "react-native";
import {
  AppText,
  Avatar,
  Badge,
  Button,
  IconButton,
  MenuRow,
  Photo,
  Screen,
  Section,
  s,
} from "../../components";
import { products, sellers, streams } from "../../data";
import { formatUSD } from "../../theme";
import { useApp } from "../../context";
import { ProductGrid } from "./shared";
export function ProductDetail({ id }: { id?: string }) {
  const app = useApp();
  const product = app.inventory.find((p) => p.id === id) || products[0]!;
  const seller = sellers.find((x) => x.id === product.sellerId)!;
  return (
    <Screen
      title="The find"
      onBack={app.back}
      right={
        <IconButton
          name={app.saved.includes(product.id) ? "heart" : "heart-outline"}
          label="Save product"
          onPress={() => app.toggleSave(product.id)}
        />
      }
    >
      <Photo
        uri={product.image}
        style={{ width: "100%", aspectRatio: 1, borderRadius: 22 }}
      />
      <View style={{ gap: tokens.spacing.md, marginTop: tokens.spacing.xl }}>
        <Badge
          label={
            product.status === "Sold"
              ? "SOLD"
              : product.listingType === "Buy Now"
                ? "BUY NOW"
                : "AUCTION"
          }
        />
        <AppText size={28} bold>
          {product.name}
        </AppText>
        <PriceDisplay size={32} bold value={product.price} />
        <AppText muted>
          {product.condition} · {product.variant}
        </AppText>
        <Pressable
          onPress={() => app.navigate(ROUTES.SELLER, seller.id)}
          style={[
            s.row,
            {
              justifyContent: "flex-start",
              gap: 10,
              paddingVertical: tokens.spacing.md,
            },
          ]}
        >
          <Avatar uri={seller.avatar} />
          <View>
            <AppText bold>{seller.name} ✓</AppText>
            <AppText muted size={12}>
              ★ {seller.rating} · {seller.sold} sold
            </AppText>
          </View>
        </Pressable>
        <AppText bold>Description</AppText>
        <AppText muted>
          Carefully selected, with every detail considered. A distinctive find
          from {seller.name}. View it up close in the live show and ask the
          seller your questions.
        </AppText>
        {[
          "Authenticity checked",
          `Shipping · ${formatUSD(12)}, 3–5 business days`,
          "Returns · Contact seller within 7 days",
        ].map((v) => (
          <MenuRow key={v} title={v} onPress={() => app.toast(v)} />
        ))}
        <Button
          label={
            product.listingType === "Buy Now" ? "Buy now" : "Join live auction"
          }
          disabled={product.status === "Sold"}
          onPress={() =>
            product.listingType === "Buy Now"
              ? app.navigate(ROUTES.CHECKOUT, product.id)
              : app.selectStream(
                  streams.find((x) => x.productId === product.id)?.id || "s1",
                )
          }
        />
        <Button
          secondary
          label="Message seller"
          onPress={() => app.navigate(ROUTES.CONVERSATION, seller.id)}
        />
        <Section title="More from this seller" />
        <ProductGrid
          items={products.filter(
            (x) => x.sellerId === seller.id && x.id !== product.id,
          )}
        />
      </View>
    </Screen>
  );
}
