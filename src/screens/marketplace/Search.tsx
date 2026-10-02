import { ROUTES } from "../../constants/routes";
import React, { useState } from "react";
import { View } from "react-native";
import {
  Chips,
  EmptyState,
  MenuRow,
  Screen,
  SearchBar,
  Section,
  StreamCard,
  s,
} from "../../components";
import { categories, products, sellers, streams } from "../../data";
import { useApp } from "../../context";
import { ProductGrid } from "./shared";
export function Search() {
  const app = useApp();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("Top");
  const [filter, setFilter] = useState("All");
  const [category, setCategory] = useState("For You");
  const filtered = products.filter(
    (p) =>
      (p.name + " " + p.category).toLowerCase().includes(query.toLowerCase()) &&
      (category === "For You" || p.category === category) &&
      (filter !== "Under $250" || p.price < 250) &&
      (filter !== "New" || p.condition === "New"),
  );
  return (
    <Screen title="Search" onBack={app.back}>
      <SearchBar value={query} onChange={setQuery} />
      {!query ? (
        <>
          <Section title="Recent searches" />
          {["Jordan 4", "Vintage jackets", "Headphones"].map((v) => (
            <MenuRow
              key={v}
              title={v}
              icon="time-outline"
              onPress={() => setQuery(v)}
            />
          ))}
          <Section title="Trending now" />
          <Chips
            items={categories}
            value={category}
            onChange={(v) => {
              setCategory(v);
              setQuery(v === "For You" ? " " : v);
            }}
          />
        </>
      ) : (
        <>
          <Chips
            items={["Top", ROUTES.LIVE, "Products", "Sellers"]}
            value={tab}
            onChange={setTab}
          />
          <Chips
            items={["All", "Live Now", "Under $250", "New", "Free shipping"]}
            value={filter}
            onChange={setFilter}
          />
          <Chips items={categories} value={category} onChange={setCategory} />
          {filter === "Free shipping" ? (
            <EmptyState
              title="No free-shipping finds"
              detail="Try clearing this filter."
              onPress={() => setFilter("All")}
              label="Clear filter"
            />
          ) : tab === "Sellers" ? (
            sellers
              .filter((x) =>
                (x.name + x.bio)
                  .toLowerCase()
                  .includes(query.trim().toLowerCase()),
              )
              .map((x) => (
                <MenuRow
                  key={x.id}
                  title={x.name}
                  detail={x.bio}
                  onPress={() => app.navigate(ROUTES.SELLER, x.id)}
                />
              ))
          ) : tab === ROUTES.LIVE || filter === "Live Now" ? (
            <View style={s.grid}>
              {streams
                .filter((x) =>
                  (
                    x.title +
                    " " +
                    sellers.find((s) => s.id === x.sellerId)!.name +
                    " " +
                    products.find((p) => p.id === x.productId)!.name
                  )
                    .toLowerCase()
                    .includes(query.trim().toLowerCase()),
                )
                .map((x) => (
                  <StreamCard
                    key={x.id}
                    stream={x}
                    seller={sellers.find((s) => s.id === x.sellerId)!}
                    onPress={() => app.selectStream(x.id)}
                  />
                ))}
            </View>
          ) : (
            <ProductGrid items={filtered} />
          )}
        </>
      )}
    </Screen>
  );
}
