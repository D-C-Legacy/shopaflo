import * as tokens from "../../theme";
import React from "react";
import { View } from "react-native";
import { AppText, IconButton } from "../ui";
import { colors, spacing } from "../../theme";
export function LiveActionRail({
  compact,
  liked,
  comments,
  onLike,
  onChat,
  onShare,
}: {
  compact: boolean;
  liked: boolean;
  comments: number;
  onLike: () => void;
  onChat: () => void;
  onShare: () => void;
}) {
  return (
    <View
      style={
        compact
          ? {
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: spacing.xs,
              marginBottom: spacing.sm,
            }
          : {
              position: "absolute",
              right: 0,
              bottom: 330,
              alignItems: "flex-end",
              gap: spacing.xs,
            }
      }
    >
      <IconButton
        name={liked ? "heart" : "heart-outline"}
        label="Like stream"
        color={liked ? colors.live : tokens.colors.canvas}
        onPress={onLike}
      />
      {!compact && (
        <AppText white size={11}>
          {liked ? "1.3K" : "1.2K"}
        </AppText>
      )}
      <IconButton
        name="chatbubble-outline"
        label="Open chat"
        color={tokens.colors.canvas}
        onPress={onChat}
      />
      {!compact && (
        <AppText white size={11}>
          {comments}
        </AppText>
      )}
      <IconButton
        name="share-outline"
        label="Share stream"
        color={tokens.colors.canvas}
        onPress={onShare}
      />
    </View>
  );
}
