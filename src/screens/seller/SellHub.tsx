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
  Icon,
  MenuRow,
  Photo,
  Screen,
  Section,
  s,
} from "../../components";
import { analytics, buyer, products } from "../../data";
import { colors as c } from "../../theme";
import { useApp } from "../../context";
export function SellHub() {
  const app = useApp();
  return (
    <Screen title="Your studio" right={<Avatar uri={buyer.avatar} size={36} />}>
      <Section title="Ready for your next show?" />
      <AppText muted>Share what you love. Build your community.</AppText>
      <Pressable
        onPress={() => app.navigate(ROUTES.CONTROL)}
        style={{
          padding: tokens.spacing.xxl,
          backgroundColor: c.brand,
          borderRadius: tokens.radii.cardLarge,
          marginVertical: tokens.spacing.xxl,
          flexDirection: "row",
          gap: 18,
          alignItems: "center",
        }}
      >
        <Icon name="radio-outline" color={tokens.colors.canvas} size={38} />
        <View>
          <AppText white bold size={24}>
            Go live
          </AppText>
          <AppText white size={13}>
            Bring your finds to life
          </AppText>
        </View>
      </Pressable>
      <View style={[s.row, { gap: tokens.spacing.md }]}>
        <View style={{ flex: 1 }}>
          <Button
            secondary
            label="Schedule show"
            onPress={() => app.navigate(ROUTES.CREATE_SHOW)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            secondary
            label="Create listing"
            onPress={() => app.navigate(ROUTES.LISTING)}
          />
        </View>
      </View>
      <Pressable
        onPress={() => app.navigate(ROUTES.DASHBOARD)}
        style={[s.card, { marginTop: tokens.spacing.xxl }]}
      >
        <AppText muted size={12}>
          This month
        </AppText>
        <View style={[s.row, { marginTop: tokens.spacing.md }]}>
          <View>
            <PriceDisplay size={30} bold value={analytics.sales} />
            <AppText muted>Sales</AppText>
          </View>
          <View>
            <AppText size={30} bold>
              {analytics.orders}
            </AppText>
            <AppText muted>Orders</AppText>
          </View>
        </View>
      </Pressable>
      <Section
        title="Your inventory"
        action="Manage"
        onPress={() => app.navigate(ROUTES.INVENTORY)}
      />
      {app.inventory.slice(0, 2).map((p) => (
        <Pressable
          key={p.id}
          onPress={() => app.navigate(ROUTES.LISTING, p.id)}
          style={[
            s.row,
            {
              gap: 14,
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderColor: c.line,
            },
          ]}
        >
          <Photo
            uri={p.image}
            style={{ height: 64, width: 64, borderRadius: tokens.radii.image }}
          />
          <View style={{ flex: 1 }}>
            <AppText bold size={14}>
              {p.name}
            </AppText>
            <PriceDisplay bold value={p.price} />
          </View>
          <Badge
            label={p.status}
            color={p.status === "Active" ? c.success : c.textSecondary}
          />
        </Pressable>
      ))}
      <Section title="Upcoming show" />
      {app.shows.map((show) => (
        <MenuRow
          key={show.id}
          title={show.title}
          detail={`${show.date} · ${show.time} · ${show.productIds.length} products`}
          onPress={() => app.navigate(ROUTES.CREATE_SHOW)}
        />
      ))}
      <MenuRow
        title="Seller dashboard"
        detail="Sales, analytics, and the bigger picture"
        onPress={() => app.navigate(ROUTES.DASHBOARD)}
      />
    </Screen>
  );
}
