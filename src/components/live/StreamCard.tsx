import * as tokens from "../../theme";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { colors as c } from "../../theme";
import type { Seller, Stream } from "../../data";
import { AppText, Avatar, Photo, LiveBadge, Badge, s } from "../ui";
export function StreamCard({
  stream,
  seller,
  onPress,
}: {
  stream: Stream;
  seller: Seller;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={{ width: "48%" }}
      onPress={onPress}
      accessibilityLabel={`Watch ${stream.title}`}
    >
      <View>
        <Photo
          uri={stream.image}
          style={{
            width: "100%",
            aspectRatio: 0.85,
            borderRadius: tokens.radii.button,
          }}
        />
        <View
          style={[s.row, { position: "absolute", top: 10, left: 10, gap: 6 }]}
        >
          {stream.upcoming ? <Badge label="SOON" /> : <LiveBadge />}
          <AppText white size={11} bold>
            {stream.viewers}
          </AppText>
        </View>
        <View style={{ position: "absolute", bottom: 10, left: 10 }}>
          <Avatar uri={seller.avatar} size={32} />
        </View>
      </View>
      <AppText size={13} bold style={{ marginTop: tokens.spacing.sm }}>
        {seller.name} <Text style={{ color: c.brand }}>✓</Text>
      </AppText>
      <AppText size={14} bold>
        {stream.title}
      </AppText>
      <AppText muted size={11}>
        Curated finds · Good company
      </AppText>
    </Pressable>
  );
}
