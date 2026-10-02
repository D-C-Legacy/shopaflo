import * as tokens from "../../theme";
import { ROUTES } from "../../constants/routes";
import React, { useState } from "react";
import { View, Pressable } from "react-native";
import {
  AppText,
  Badge,
  Button,
  Chips,
  EmptyState,
  Icon,
  Photo,
  Screen,
  s,
} from "../../components";
import { colors as c, formatUSD } from "../../theme";
import { useApp } from "../../context";
export function Inventory() {
  const app = useApp();
  const [filter, setFilter] = useState("All");
  const items = app.inventory.filter(
    (x) => filter === "All" || x.status === filter,
  );
  return (
    <Screen title="Inventory" onBack={app.back}>
      <Button
        label="Create listing"
        icon="add"
        onPress={() => app.navigate(ROUTES.LISTING)}
      />
      <Chips
        items={["All", "Active", "Draft", "Sold", "Archived"]}
        value={filter}
        onChange={setFilter}
      />
      {items.length ? (
        items.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => app.navigate(ROUTES.LISTING, p.id)}
            style={[
              s.row,
              {
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.lg,
                borderBottomWidth: 1,
                borderColor: c.line,
              },
            ]}
          >
            <Photo
              uri={p.image}
              style={{
                height: 70,
                width: 70,
                borderRadius: tokens.radii.image,
              }}
            />
            <View style={{ flex: 1 }}>
              <AppText bold>{p.name}</AppText>
              <AppText muted size={13}>
                {formatUSD(p.price)} · Qty {p.quantity}
              </AppText>
              <Badge label={p.status} />
            </View>
            <Icon name="create-outline" />
          </Pressable>
        ))
      ) : (
        <EmptyState
          title="A fresh start"
          detail="Add a listing and build your next show."
          onPress={() => app.navigate(ROUTES.LISTING)}
          label="Add listing"
        />
      )}
    </Screen>
  );
}
