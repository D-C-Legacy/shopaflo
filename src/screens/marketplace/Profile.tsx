import * as tokens from "../../theme";
import { Card } from "../../components/ui/Card";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/routes";
import React from "react";
import { View } from "react-native";
import {
  AppText,
  Avatar,
  Button,
  IconButton,
  MenuRow,
  Screen,
  Section,
  s,
} from "../../components";
import { buyer } from "../../data";
import { useApp } from "../../context";

export function Profile() {
  const app = useApp();
  const buyer = useAuth().user;
  return (
    <Screen
      title="Your corner"
      right={
        <IconButton
          name="settings-outline"
          label="Settings"
          onPress={() => app.navigate(ROUTES.SETTINGS)}
        />
      }
    >
      <View
        style={[
          s.row,
          {
            justifyContent: "flex-start",
            gap: tokens.spacing.lg,
            marginVertical: tokens.spacing.lg,
          },
        ]}
      >
        <Avatar uri={buyer.avatar} size={78} />
        <View>
          <AppText size={24} bold>
            {buyer.name}
          </AppText>
          <AppText muted>{buyer.handle}</AppText>
          <AppText size={12} muted style={{ marginTop: 6 }}>
            {buyer.followers} followers · {buyer.following} following
          </AppText>
        </View>
      </View>
      <AppText muted>{buyer.bio}</AppText>
      <Button
        secondary
        label="Edit profile"
        onPress={() => app.navigate(ROUTES.EDIT_PROFILE)}
      />
      <Card style={[{ marginTop: tokens.spacing.xxl, gap: tokens.spacing.sm }]}>
        <AppText bold size={18}>
          Your next favorite is out there.
        </AppText>
        <AppText muted size={13}>
          Catch a show, meet a seller, find your thing.
        </AppText>
        <Button
          label="Explore live shows"
          onPress={() => app.selectStream("s1")}
        />
      </Card>
      <Section title="Your collection" />
      {(
        [
          ["Purchases", ROUTES.ORDERS],
          ["Saved", ROUTES.SAVED],
          ["Following", ROUTES.FOLLOWING],
          ["Bids & Offers", ROUTES.BIDS],
          ["Recently viewed", ROUTES.RECENT],
        ] as const
      ).map(([title, route]) => (
        <MenuRow
          key={route}
          title={title!}
          onPress={() => app.navigate(route!)}
        />
      ))}
      <Section title="Make it yours" />
      {(
        [
          ["Payment methods", ROUTES.PAYMENTS],
          ["Addresses", ROUTES.ADDRESSES],
          ["Settings", ROUTES.SETTINGS],
        ] as const
      ).map(([title, route]) => (
        <MenuRow
          key={route}
          title={title!}
          onPress={() => app.navigate(route!)}
        />
      ))}
    </Screen>
  );
}
