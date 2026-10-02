import { conversationMessages } from "../../data/chat";
import * as tokens from "../../theme";
import { PriceDisplay } from "../../components/commerce/PriceDisplay";
import { Card } from "../../components/ui/Card";
import { ROUTES } from "../../constants/routes";
import React, { useState } from "react";
import { View, Pressable } from "react-native";
import {
  AppText,
  Badge,
  Button,
  Field,
  Photo,
  Screen,
  s,
} from "../../components";
import { products, sellers } from "../../data";
import { colors as c, formatUSD } from "../../theme";
import { useApp } from "../../context";
export function Conversation({ id }: { id?: string }) {
  const app = useApp();
  const seller = sellers.find((x) => x.id === id) || sellers[0]!;
  const [text, setText] = useState("");
  const [chat, setChat] = useState(conversationMessages);
  return (
    <Screen title={seller.name} onBack={app.back}>
      <Pressable
        onPress={() => app.navigate(ROUTES.PRODUCT, "jordan")}
        style={[
          s.card,
          s.row,
          { gap: tokens.spacing.md, marginBottom: tokens.spacing.xxl },
        ]}
      >
        <Photo
          uri={products[0]!.image}
          style={{ width: 52, height: 52, borderRadius: tokens.radii.sm }}
        />
        <View style={{ flex: 1 }}>
          <AppText bold size={13}>
            Air Jordan 4 Retro
          </AppText>
          <AppText muted size={12}>
            {formatUSD(1450)} · View product
          </AppText>
        </View>
      </Pressable>
      <AppText
        muted
        size={11}
        style={{ textAlign: "center", marginBottom: tokens.spacing.lg }}
      >
        Today · 10:42 AM
      </AppText>
      {chat.map((m, i) => (
        <View
          key={i}
          style={{
            alignSelf: m.mine ? "flex-end" : "flex-start",
            backgroundColor: m.mine ? c.brand : c.softCanvas,
            padding: 14,
            borderRadius: tokens.radii.card,
            maxWidth: "85%",
            marginBottom: tokens.spacing.md,
          }}
        >
          <AppText white={m.mine}>{m.text}</AppText>
        </View>
      ))}
      <Card style={[{ gap: 10, marginVertical: tokens.spacing.lg }]}>
        <AppText bold>Offer · Vintage varsity jacket</AppText>
        <PriceDisplay size={22} bold value={120} />
        <Badge label="ACCEPTED" color={c.success} />
        <Button
          secondary
          label="Review offer"
          onPress={() => app.navigate(ROUTES.CHECKOUT, "jacket")}
        />
      </Card>
      <Field placeholder="Write a message…" value={text} onChange={setText} />
      <Button
        label="Send message"
        disabled={!text.trim()}
        onPress={() => {
          setChat((v) => [...v, { mine: true, text: text.trim() }]);
          setText("");
        }}
      />
    </Screen>
  );
}
