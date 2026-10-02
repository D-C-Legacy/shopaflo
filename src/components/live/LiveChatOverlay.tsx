import React from "react";
import { View } from "react-native";
import { AppText, Avatar } from "../ui";
import { sellers } from "../../data";
import { spacing } from "../../theme";
export type ChatComment = { name: string; text: string };
export function LiveChatOverlay({ comments }: { comments: ChatComment[] }) {
  return (
    <>
      {comments.slice(-2).map((comment, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            gap: spacing.sm,
            marginBottom: spacing.sm,
          }}
        >
          <Avatar uri={sellers[index % sellers.length]!.avatar} size={22} />
          <AppText white bold size={12}>
            {comment.name}
          </AppText>
          <AppText white size={12} style={{ flex: 1 }}>
            {comment.text}
          </AppText>
        </View>
      ))}
    </>
  );
}
