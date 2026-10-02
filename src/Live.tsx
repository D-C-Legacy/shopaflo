import { liveComments } from "./data/chat";
import * as tokens from "./theme";
import { LiveProductPanel } from "./components/live/LiveProductPanel";
import { LiveActionRail } from "./components/live/LiveActionRail";
import { LiveSellerHeader } from "./components/live/LiveSellerHeader";
import { LiveChatOverlay } from "./components/live/LiveChatOverlay";
import { ROUTES } from "./constants/routes";
import { useAuction } from "./hooks/useAuction";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  ImageBackground,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { AppText, Button, Chips, Field, Photo, Sheet, s } from "./components";
import { streams, sellers, products } from "./data";
import { colors as c, formatUSD } from "./theme";

import { useApp } from "./context";
export function Live({ streamId }: { streamId: string }) {
  const app = useApp();
  const { height } = useWindowDimensions();
  const [index, setIndex] = useState(
    Math.max(
      0,
      streams.findIndex((x) => x.id === streamId),
    ),
  );
  const list = useRef<FlatList>(null);
  const { auction, dispatch } = useAuction();
  const [sheet, setSheet] = useState("");
  const [liked, setLiked] = useState(false);
  const [controls, setControls] = useState(true);
  const [chatTab, setChatTab] = useState("Chat");
  const [chat, setChat] = useState("");
  const [comments, setComments] = useState(liveComments);
  const [custom, setCustom] = useState("1750");
  const [maximum, setMaximum] = useState("");
  const [issue, setIssue] = useState("");
  const stream = streams[index] || streams[0]!;
  const seller = sellers.find((x) => x.id === stream.sellerId)!;
  const product = products.find((x) => x.id === stream.productId)!;
  useEffect(() => {
    const i = Math.max(
      0,
      streams.findIndex((x) => x.id === streamId),
    );
    setIndex(i);
    list.current?.scrollToIndex({ index: i, animated: false });
  }, [streamId]);
  useEffect(() => {
    dispatch({ type: "reset" });
    if (streams[index]?.upcoming)
      dispatch({ type: "state", state: "upcoming" });
    setIssue("");
    setLiked(false);
  }, [index]);
  function placeBid(amount: number) {
    if (
      issue === "Bid rejected" ||
      !Number.isFinite(amount) ||
      amount < auction.minimum
    ) {
      app.toast(`Bid rejected. Minimum is ${formatUSD(auction.minimum)}.`);
      return;
    }
    if (issue === "Verification required") {
      app.toast("Complete the demo verification from Settings.");
      return;
    }
    dispatch({ type: "bid", amount });
    setSheet("");
  }
  const [viewport, setViewport] = useState(Math.max(320, height - 130));
  const lastTap = useRef(0);
  return (
    <View
      style={{ flex: 1, backgroundColor: c.ink }}
      onLayout={(e) => setViewport(e.nativeEvent.layout.height)}
    >
      <FlatList
        ref={list}
        data={streams}
        keyExtractor={(x) => x.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, i) => ({
          length: viewport,
          offset: viewport * i,
          index: i,
        })}
        onMomentumScrollEnd={(e) =>
          setIndex(Math.round(e.nativeEvent.contentOffset.y / viewport))
        }
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item.image }}
            style={{ height: viewport, width: "100%" }}
          >
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => {
                const now = Date.now();
                if (now - lastTap.current < 300) {
                  setLiked(true);
                  setControls(true);
                } else setControls((v) => !v);
                lastTap.current = now;
              }}
              accessibilityLabel="Toggle stream controls"
            />
            <View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: tokens.colors.mediaShade },
              ]}
            />
            {item.id === stream.id && controls && (
              <View
                style={{
                  flex: 1,
                  padding: tokens.spacing.xl,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <LiveSellerHeader
                    seller={seller}
                    viewers={stream.viewers}
                    following={app.following.includes(seller.id)}
                    onSeller={() => app.navigate(ROUTES.SELLER, seller.id)}
                    onFollow={() => app.toggleFollow(seller.id)}
                    onOptions={() => setSheet("options")}
                  />
                  {issue && (
                    <View
                      style={{
                        backgroundColor: tokens.colors.issue,
                        padding: tokens.spacing.md,
                        borderRadius: tokens.radii.image,
                        marginTop: tokens.spacing.md,
                      }}
                    >
                      <AppText white size={13}>
                        {issue}
                      </AppText>
                    </View>
                  )}
                </View>
                <View>
                  <LiveActionRail
                    compact={viewport < 650}
                    liked={liked}
                    comments={342 + comments.length - 2}
                    onLike={() => setLiked((v) => !v)}
                    onChat={() => setSheet("chat")}
                    onShare={() => setSheet("share")}
                  />
                  <LiveChatOverlay comments={comments} />
                  <LiveProductPanel
                    product={product}
                    auction={auction}
                    issue={issue}
                    onProduct={() => setSheet("product")}
                    onBid={() => setSheet("confirm")}
                    onCustom={() => {
                      setCustom(String(auction.minimum));
                      setSheet("custom");
                    }}
                    onPurchase={() =>
                      app.navigate(ROUTES.CHECKOUT, product.id, auction.current)
                    }
                    onReset={() => dispatch({ type: "reset" })}
                  />
                  <AppText
                    white
                    size={10}
                    style={{
                      textAlign: "center",
                      marginTop: tokens.spacing.sm,
                      opacity: 0.6,
                    }}
                  >
                    Swipe up for the next show · Simulated live
                  </AppText>
                </View>
              </View>
            )}
          </ImageBackground>
        )}
      />
      <Sheet
        visible={sheet === "confirm"}
        title="Make it yours"
        onClose={() => setSheet("")}
      >
        <Photo
          uri={product.image}
          style={{
            width: "100%",
            height: 160,
            borderRadius: tokens.radii.card,
          }}
        />
        <AppText size={20} bold>
          {product.name}
        </AppText>
        <AppText muted>Your bid</AppText>
        <AppText size={40} bold>
          {formatUSD(auction.minimum)}
        </AppText>
        <AppText muted size={13}>
          Mock auction · No payment will be taken.
        </AppText>
        <Button
          label={`Confirm ${formatUSD(auction.minimum)}`}
          onPress={() => placeBid(auction.minimum)}
        />
      </Sheet>
      <Sheet
        visible={sheet === "custom"}
        title="Your custom bid"
        onClose={() => setSheet("")}
      >
        <View style={s.row}>
          <AppText muted>Current {formatUSD(auction.current)}</AppText>
          <AppText muted>Minimum {formatUSD(auction.minimum)}</AppText>
        </View>
        <Field
          label="Bid amount (USD)"
          value={custom}
          onChange={setCustom}
          keyboardType="numeric"
        />
        <View style={[s.row, { gap: 6 }]}>
          {[50, 100, 250, 500].map((v) => (
            <Pressable
              key={v}
              style={[
                s.chip,
                {
                  backgroundColor: c.softCanvas,
                  paddingHorizontal: tokens.spacing.md,
                },
              ]}
              onPress={() =>
                setCustom(String((Number(custom) || auction.minimum) + v))
              }
            >
              <AppText size={12}>+{formatUSD(v)}</AppText>
            </Pressable>
          ))}
        </View>
        <Field
          label="Maximum bid (optional, USD)"
          value={maximum}
          onChange={setMaximum}
          keyboardType="numeric"
        />
        <AppText muted size={12}>
          Maximum is recorded for this preview; automatic bidding is not
          enabled.
        </AppText>
        <Button
          label={`Place bid ${formatUSD(Number(custom) || 0)}`}
          onPress={() => placeBid(Number(custom))}
        />
      </Sheet>
      <Sheet
        visible={sheet === ROUTES.PRODUCT}
        title="The details"
        onClose={() => setSheet("")}
      >
        <Photo
          uri={product.image}
          style={{
            width: "100%",
            height: 190,
            borderRadius: tokens.radii.card,
          }}
        />
        <AppText size={24} bold>
          {product.name}
        </AppText>
        <AppText bold>
          {formatUSD(auction.current)} · {product.condition} · {product.variant}
        </AppText>
        <AppText muted>
          A standout piece, carefully curated by {seller.name}. The item
          pictured is the exact item in this mock auction.
        </AppText>
        {[
          "Authenticity checked",
          `Shipping: ${formatUSD(12)} · 3–5 business days`,
          "Returns: contact seller within 7 days",
        ].map((v) => (
          <AppText key={v} size={14}>
            ✓ {v}
          </AppText>
        ))}
        <AppText bold>Bid history</AppText>
        <AppText muted size={13}>
          Collector_21 · {formatUSD(auction.current)} · Just now
        </AppText>
        <AppText muted size={13}>
          kickzcole · {formatUSD(Math.max(0, auction.current - 50))} · 1 min ago
        </AppText>
        <Button
          label="View full product"
          onPress={() => {
            setSheet("");
            app.navigate(ROUTES.PRODUCT, product.id);
          }}
        />
        <Button
          secondary
          label={
            app.saved.includes(product.id)
              ? "Remove from saved"
              : "Save product"
          }
          onPress={() => app.toggleSave(product.id)}
        />
      </Sheet>
      <Sheet
        visible={sheet === "chat"}
        title="Join the conversation"
        onClose={() => setSheet("")}
      >
        <Chips
          items={["Chat", "Questions", "Bids"]}
          value={chatTab}
          onChange={setChatTab}
        />
        {chatTab === "Chat" ? (
          comments.map((m, i) => (
            <View key={i} style={{ paddingVertical: 6 }}>
              <AppText bold size={13}>
                {m.name}
              </AppText>
              <AppText>{m.text}</AppText>
            </View>
          ))
        ) : chatTab === "Questions" ? (
          <AppText muted>
            Is this true to size? · Seller: Yes, standard sizing.
          </AppText>
        ) : (
          <AppText muted>
            Latest bid {formatUSD(auction.current)} · {auction.bids} bids
          </AppText>
        )}
        <Field
          value={chat}
          onChange={setChat}
          placeholder={
            chatTab === "Questions" ? "Ask a question…" : "Say something…"
          }
        />
        <Button
          label="Send"
          disabled={!chat.trim()}
          onPress={() => {
            setComments((v) => [...v, { name: "You", text: chat.trim() }]);
            setChat("");
            setChatTab("Chat");
          }}
        />
      </Sheet>
      <Sheet
        visible={sheet === "share"}
        title="Share this find"
        onClose={() => setSheet("")}
      >
        <AppText>
          {stream.title} with {seller.name}
        </AppText>
        <AppText muted>shopaflo.demo/show/{stream.id}</AppText>
        <Button
          label="Copy demo link"
          onPress={() => {
            app.toast("Demo link copied (simulated)");
            setSheet("");
          }}
        />
      </Sheet>
      <Sheet
        visible={sheet === "options"}
        title="Live preview controls"
        onClose={() => setSheet("")}
      >
        <AppText muted>Try the local auction and connection states.</AppText>
        {[
          "Bid rejected",
          "Reconnecting…",
          "Stream ended",
          "Product withdrawn",
          "Auction cancelled",
          "Verification required",
        ].map((v) => (
          <Button
            key={v}
            secondary
            label={v}
            onPress={() => {
              setIssue(v);
              setSheet("");
            }}
          />
        ))}
        {(["preparing", "preview", "ended"] as const).map((state) => (
          <Button
            key={state}
            secondary
            label={`Preview ${state}`}
            onPress={() => {
              dispatch({ type: "state", state });
              setSheet("");
            }}
          />
        ))}
        <Button
          secondary
          label="Preview upcoming show"
          onPress={() => {
            dispatch({ type: "state", state: "upcoming" });
            setSheet("");
          }}
        />
        <Button
          secondary
          label="Simulate competing bid"
          onPress={() => {
            dispatch({ type: "competitor" });
            setSheet("");
          }}
        />
        <Button
          secondary
          label="Finish countdown (win / lose)"
          onPress={() => {
            dispatch({ type: "countdown" });
            setSheet("");
          }}
        />
        <Button
          label="Reset demo"
          onPress={() => {
            setIssue("");
            dispatch({ type: "reset" });
            setSheet("");
          }}
        />
      </Sheet>
    </View>
  );
}
const styles = StyleSheet.create({
  panel: {
    backgroundColor: tokens.colors.mediaPanel,
    borderWidth: 1,
    borderColor: tokens.colors.mediaBorder,
    borderRadius: tokens.radii.cardLarge,
    padding: tokens.spacing.lg,
  },
});
