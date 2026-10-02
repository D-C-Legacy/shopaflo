import * as tokens from "../../theme";
import React from "react";
import { View, Pressable } from "react-native";
import { AppText, Avatar, LiveBadge, IconButton, s } from "../ui";
import type { Seller } from "../../types";
import { colors, spacing, radii } from "../../theme";
export function LiveSellerHeader({
  seller,
  viewers,
  following,
  onSeller,
  onFollow,
  onOptions,
}: {
  seller: Seller;
  viewers: string;
  following: boolean;
  onSeller: () => void;
  onFollow: () => void;
  onOptions: () => void;
}) {
  return (
    <View>
      <View style={[s.row, { gap: spacing.sm }]}>
        <LiveBadge />
        <AppText white size={12}>
          ◉ {viewers} watching
        </AppText>
        <View style={{ flex: 1 }} />
        <IconButton
          name="ellipsis-horizontal"
          label="Live options"
          color={tokens.colors.canvas}
          onPress={onOptions}
        />
      </View>
      <View style={[s.row, { marginTop: 14, gap: spacing.sm }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Visit ${seller.name}`}
          onPress={onSeller}
          style={[s.row, { gap: spacing.sm }]}
        >
          <Avatar uri={seller.avatar} size={38} />
          <AppText white bold size={13}>
            {seller.handle} ✓
          </AppText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={following ? "Unfollow seller" : "Follow seller"}
          onPress={onFollow}
          style={{
            backgroundColor: following
              ? tokens.colors.whiteMuted
              : colors.brand,
            padding: 10,
            borderRadius: radii.button,
          }}
        >
          <AppText white size={12} bold>
            {following ? "Following" : "Follow"}
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}
