import * as tokens from "../theme";
import { RouteNavigator } from "./RouteNavigator";
import { useMarketplaceState } from "../hooks/useMarketplaceState";

import { ROUTES } from "../constants/routes";
import { TABS } from "../constants/routes";
import React, { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppContext } from "../context";

import { colors as c } from "../theme";
import { AppText, Icon } from "../components";
import { Live } from "../Live";
import { Discover, Profile } from "../Marketplace";
import { SellHub } from "../Seller";
import { Inbox } from "../Personal";
import { useNavigation } from "../hooks/useNavigation";
const tabs = TABS;
export function MainTabNavigator() {
  const insets = useSafeAreaInsets();

  const {
    tab,
    setTab,
    routes,
    setRoutes,
    back,
    navigate,
    selectStream,
    stream,
  } = useNavigation();
  const market = useMarketplaceState();
  const [notice, setNotice] = useState("");
  const route = routes[routes.length - 1];
  const dark = tab === ROUTES.LIVE && !route;

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 3200);
    return () => clearTimeout(t);
  }, [notice]);
  const context = { navigate, back, toast: setNotice, selectStream, ...market };
  function renderRoute() {
    if (!route) {
      switch (tab) {
        case ROUTES.LIVE:
          return <Live streamId={stream} />;
        case ROUTES.DISCOVER:
          return <Discover />;
        case ROUTES.SELL:
          return <SellHub />;
        case ROUTES.INBOX:
          return <Inbox />;
        case ROUTES.PROFILE:
          return <Profile />;
      }
    }
    return <RouteNavigator route={route} />;
  }
  return (
    <AppContext.Provider value={context}>
      <View style={styles.desktop}>
        <View
          style={[
            styles.app,
            {
              paddingTop: insets.top,
              backgroundColor: dark ? c.ink : c.canvas,
            },
          ]}
        >
          <StatusBar style={dark ? "light" : "dark"} />
          <View
            style={{ flex: 1 }}
            key={route ? route.name + routes.length : tab}
          >
            {renderRoute()}
          </View>
          <View
            style={[
              styles.nav,
              {
                paddingBottom: Math.max(insets.bottom, 10),
                backgroundColor: dark ? c.ink : c.canvas,
                borderTopColor: dark ? tokens.colors.darkLine : c.line,
              },
            ]}
          >
            {tabs.map((t) => (
              <Pressable
                key={t.name}
                accessibilityRole="tab"
                accessibilityLabel={t.name}
                accessibilityState={{ selected: tab === t.name }}
                onPress={() => {
                  setTab(t.name);
                  setRoutes([]);
                }}
                style={({ pressed }) => [
                  styles.tab,
                  { opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <Icon
                  name={tab === t.name ? t.selected : t.icon}
                  color={
                    tab === t.name
                      ? c.brand
                      : dark
                        ? tokens.colors.mutedLine
                        : c.textSecondary
                  }
                  size={23}
                />
                <AppText
                  size={10}
                  style={{
                    color:
                      tab === t.name
                        ? c.brand
                        : dark
                          ? tokens.colors.mutedLine
                          : c.textSecondary,
                  }}
                >
                  {t.name}
                </AppText>
                {t.name === ROUTES.INBOX && <View style={styles.dot} />}
              </Pressable>
            ))}
          </View>
          {notice !== "" && (
            <Pressable
              accessibilityRole="alert"
              onPress={() => setNotice("")}
              style={[styles.toast, { bottom: 85 + insets.bottom }]}
            >
              <AppText white size={13}>
                {notice}
              </AppText>
            </Pressable>
          )}
        </View>
        {Platform.OS === "web" && (
          <View style={styles.caption}>
            <AppText size={13} muted>
              SHOPAFLO · LIVE SHOPPING, IN THE MOMENT
            </AppText>
            <AppText size={11} muted>
              Expo prototype · All interactions are simulated
            </AppText>
          </View>
        )}
      </View>
    </AppContext.Provider>
  );
}
const styles = StyleSheet.create({
  desktop: {
    flex: 1,
    backgroundColor: tokens.colors.desktop,
    alignItems: "center",
    justifyContent: "center",
  },
  app: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
    ...Platform.select({
      web: {
        maxHeight: 960,
        overflow: "hidden" as const,
        boxShadow: "0 10px 70px #00000012",
      },
      default: {},
    }),
  },
  nav: { flexDirection: "row", paddingTop: 10, borderTopWidth: 1 },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    gap: tokens.spacing.xs,
  },
  dot: {
    position: "absolute",
    top: 0,
    right: "30%",
    width: 5,
    height: 5,
    backgroundColor: c.live,
    borderRadius: 5,
  },
  toast: {
    position: "absolute",
    left: 20,
    right: 20,
    backgroundColor: tokens.colors.toast,
    borderRadius: tokens.radii.button,
    padding: 18,
    elevation: 8,
  },
  caption: { alignItems: "center", gap: 5, padding: 14 },
});
