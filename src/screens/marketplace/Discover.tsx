import { ROUTES } from "../../constants/routes";
import React, { useState } from "react";
import { View } from "react-native";
import {
  AppText,
  Chips,
  IconButton,
  MenuRow,
  Screen,
  SearchBar,
  Section,
  StreamCard,
  s,
} from "../../components";
import { categories, products, sellers, streams } from "../../data";
import { useApp } from "../../context";
import { ProductGrid, SellerList } from "./shared";
export function Discover() {
  const app = useApp();
  const [category, setCategory] = useState("For You");
  const [query, setQuery] = useState("");
  return (
    <Screen
      title={ROUTES.DISCOVER}
      right={
        <IconButton
          name="notifications-outline"
          label="Notifications"
          onPress={() => app.navigate(ROUTES.ACTIVITY)}
        />
      }
    >
      <AppText muted>Find your people. Find your next favorite.</AppText>
      <SearchBar
        value={query}
        onChange={setQuery}
        onFocus={() => app.navigate(ROUTES.SEARCH)}
      />
      <Chips items={categories} value={category} onChange={setCategory} />
      <Section
        title="Live now"
        action="See all"
        onPress={() => app.selectStream("s1")}
      />
      <View style={s.grid}>
        {streams
          .filter((x) => !x.upcoming)
          .slice(0, 2)
          .map((stream) => (
            <StreamCard
              key={stream.id}
              stream={stream}
              seller={sellers.find((x) => x.id === stream.sellerId)!}
              onPress={() => app.selectStream(stream.id)}
            />
          ))}
      </View>
      <Section
        title="Trending sellers"
        action="Meet them"
        onPress={() => app.navigate(ROUTES.FOLLOWING)}
      />
      <SellerList />
      <Section title="Popular auctions" />
      <ProductGrid
        items={products.filter(
          (p) => category === "For You" || p.category === category,
        )}
      />
      <Section title="Starting soon" />
      <MenuRow
        title="Friday night finds"
        detail="SneakerVault · Today, 7:00 PM"
        onPress={() => app.navigate(ROUTES.SELLER, "vault")}
      />
      <Section title="Recommended for you" />
      <ProductGrid items={products.slice(2, 4)} />
    </Screen>
  );
}
