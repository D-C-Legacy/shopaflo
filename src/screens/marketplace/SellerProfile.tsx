import * as tokens from "../../theme";
import { Card } from "../../components/ui/Card";
import { ROUTES } from "../../constants/routes";
import React, { useState } from "react";
import { View } from "react-native";
import {
  AppText,
  Avatar,
  Button,
  Chips,
  Screen,
  Section,
  StreamCard,
  s,
} from "../../components";
import { products, reviews, sellers, streams } from "../../data";
import { useApp } from "../../context";
import { ProductGrid } from "./shared";
export function SellerProfile({ id }: { id?: string }) {
  const app = useApp();
  const seller = sellers.find((x) => x.id === id) || sellers[0]!;
  const [tab, setTab] = useState("Shows");
  return (
    <Screen title="Seller" onBack={app.back}>
      <View style={{ alignItems: "center", gap: 10 }}>
        <Avatar uri={seller.avatar} size={88} />
        <AppText size={28} bold>
          {seller.name} ✓
        </AppText>
        <AppText muted>{seller.handle}</AppText>
        <AppText style={{ textAlign: "center" }}>{seller.bio}</AppText>
        <View
          style={[
            s.row,
            { gap: tokens.spacing.xxl, marginVertical: tokens.spacing.md },
          ]}
        >
          {[
            `${seller.followers} followers`,
            `★ ${seller.rating}`,
            `${seller.sold} sold`,
          ].map((v) => (
            <AppText key={v} size={13} bold>
              {v}
            </AppText>
          ))}
        </View>
      </View>
      <View style={[s.row, { gap: tokens.spacing.md }]}>
        <View style={{ flex: 1 }}>
          <Button
            label={app.following.includes(seller.id) ? "Following" : "Follow"}
            onPress={() => app.toggleFollow(seller.id)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            secondary
            label="Message"
            onPress={() => app.navigate(ROUTES.CONVERSATION, seller.id)}
          />
        </View>
      </View>
      <Chips
        items={["Shows", "Shop", "Reviews", "About"]}
        value={tab}
        onChange={setTab}
      />
      {tab === "Shows" ? (
        <>
          <Section title="LIVE NOW" />
          <View style={s.grid}>
            {streams
              .filter((x) => x.sellerId === seller.id)
              .map((x) => (
                <StreamCard
                  key={x.id}
                  stream={x}
                  seller={seller}
                  onPress={() =>
                    x.upcoming
                      ? app.toast("Reminder set for this mock show")
                      : app.selectStream(x.id)
                  }
                />
              ))}
          </View>
        </>
      ) : tab === "Shop" ? (
        <ProductGrid items={products.filter((x) => x.sellerId === seller.id)} />
      ) : tab === "Reviews" ? (
        reviews.map((r) => (
          <Card
            key={r.id}
            style={[
              s.card,
              { marginVertical: tokens.spacing.sm, gap: tokens.spacing.sm },
            ]}
          >
            <AppText bold>{r.name} · ★★★★★</AppText>
            <AppText>{r.text}</AppText>
          </Card>
        ))
      ) : (
        <Card style={[{ gap: tokens.spacing.md }]}>
          <AppText>{seller.bio}</AppText>
          <AppText muted>Joined 2024 · Ships from the United States</AppText>
          <AppText>Verified community seller · Authenticity checked</AppText>
        </Card>
      )}
    </Screen>
  );
}
