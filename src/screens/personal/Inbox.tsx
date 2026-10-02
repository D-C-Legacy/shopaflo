import * as tokens from "../../theme";
import { ROUTES } from "../../constants/routes";
import React, { useState } from "react";
import { View, Pressable } from "react-native";
import {
  AppText,
  Avatar,
  Badge,
  Chips,
  MenuRow,
  Screen,
  s,
} from "../../components";
import { activity, messages, sellers } from "../../data";
import { colors as c } from "../../theme";
import { useApp } from "../../context";
export function Inbox({ activityOnly = false }: { activityOnly?: boolean }) {
  const app = useApp();
  const [tab, setTab] = useState(activityOnly ? "Activity" : "Messages");
  return (
    <Screen
      title={activityOnly ? "Activity" : ROUTES.INBOX}
      onBack={activityOnly ? app.back : undefined}
    >
      <Chips items={["Messages", "Activity"]} value={tab} onChange={setTab} />
      {tab === "Messages"
        ? messages.map((m) => {
            const seller = sellers.find((x) => x.id === m.sellerId)!;
            return (
              <Pressable
                key={m.id}
                accessibilityRole="button"
                accessibilityLabel={`Message ${seller.name}`}
                onPress={() => app.navigate(ROUTES.CONVERSATION, seller.id)}
                style={[
                  s.row,
                  {
                    gap: tokens.spacing.md,
                    paddingVertical: tokens.spacing.xl,
                    borderBottomWidth: 1,
                    borderColor: c.line,
                  },
                ]}
              >
                <Avatar uri={seller.avatar} size={52} />
                <View style={{ flex: 1, gap: 5 }}>
                  <AppText bold>{seller.name} ✓</AppText>
                  <AppText muted size={13}>
                    {m.text}
                  </AppText>
                </View>
                <View style={{ alignItems: "flex-end", gap: 6 }}>
                  <AppText muted size={11}>
                    {m.time}
                  </AppText>
                  {m.unread > 0 && <Badge label={String(m.unread)} />}
                </View>
              </Pressable>
            );
          })
        : activity.map((a) => (
            <MenuRow
              key={a.id}
              title={a.title}
              detail={a.detail}
              onPress={() =>
                a.kind === "live" || a.kind === "bid"
                  ? app.selectStream("s1")
                  : a.kind === "win"
                    ? app.navigate(ROUTES.CHECKOUT, "headphones")
                    : app.navigate(ROUTES.ORDERS)
              }
            />
          ))}
    </Screen>
  );
}
