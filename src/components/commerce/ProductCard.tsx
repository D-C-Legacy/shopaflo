import * as tokens from "../../theme";
import React from "react";
import { View, Pressable } from "react-native";
import { colors as c, formatUSD } from "../../theme";
import type { Product } from "../../data";
import { AppText, Photo, IconButton } from "../ui";
export function ProductCard({
  product,
  onPress,
  saved,
  onSave,
}: {
  product: Product;
  onPress: () => void;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <View style={{ width: "48%", marginBottom: 18 }}>
      <Pressable onPress={onPress} accessibilityLabel={`View ${product.name}`}>
        <Photo
          uri={product.image}
          style={{
            width: "100%",
            aspectRatio: 1.05,
            borderRadius: tokens.radii.button,
          }}
        />
        <AppText size={13} bold style={{ marginTop: tokens.spacing.sm }}>
          {product.name}
        </AppText>
        <AppText size={15} bold>
          {formatUSD(product.price)}
        </AppText>
        <AppText muted size={11}>
          {product.condition} · {product.variant}
        </AppText>
      </Pressable>
      <View
        style={{
          position: "absolute",
          right: 4,
          top: 4,
          backgroundColor: tokens.colors.whiteSoft,
          borderRadius: 30,
        }}
      >
        <IconButton
          name={saved ? "heart" : "heart-outline"}
          color={saved ? c.brand : c.text}
          label={saved ? "Unsave product" : "Save product"}
          onPress={onSave}
        />
      </View>
    </View>
  );
}
