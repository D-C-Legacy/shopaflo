import React from "react";
import { View, Pressable, type ViewStyle, type StyleProp } from "react-native";
import { colors, spacing, radii } from "../../theme";
export function Card({
  children,
  style,
  onPress,
  label,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  label?: string;
}) {
  const cardStyle = [
    {
      backgroundColor: colors.softCanvas,
      padding: spacing.xl,
      borderRadius: radii.card,
    },
    style,
  ];
  return onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={cardStyle}
    >
      {children}
    </Pressable>
  ) : (
    <View style={cardStyle}>{children}</View>
  );
}
