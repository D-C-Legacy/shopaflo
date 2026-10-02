import { ROUTES } from "../../constants/routes";
import React from "react";
import { View, Pressable, ScrollView } from "react-native";
import { AppText, Avatar, EmptyState, ProductCard, s } from "../../components";
import { products, sellers } from "../../data";
import { useApp } from "../../context";
export function ProductGrid({ items = products }: { items?: typeof products }) {
  const app = useApp();
  return items.length ? (
    <View style={s.grid}>
      {items.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onPress={() => app.navigate(ROUTES.PRODUCT, p.id)}
          saved={app.saved.includes(p.id)}
          onSave={() => app.toggleSave(p.id)}
        />
      ))}
    </View>
  ) : (
    <EmptyState
      title="No finds yet"
      detail="Try another category or come back for the next drop."
    />
  );
}
export function SellerList() {
  const app = useApp();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 22 }}
    >
      {sellers.map((seller) => (
        <Pressable
          key={seller.id}
          onPress={() => app.navigate(ROUTES.SELLER, seller.id)}
          style={{ alignItems: "center", gap: 6, width: 100 }}
        >
          <Avatar uri={seller.avatar} size={62} />
          <AppText size={12} bold>
            {seller.name} ✓
          </AppText>
          <AppText size={10} muted>
            {seller.handle}
          </AppText>
        </Pressable>
      ))}
    </ScrollView>
  );
}
