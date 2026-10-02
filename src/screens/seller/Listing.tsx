import * as tokens from "../../theme";

import React, { useState } from "react";
import { View, Pressable } from "react-native";
import {
  AppText,
  Button,
  Chips,
  Field,
  Icon,
  Photo,
  Screen,
  s,
} from "../../components";
import { products, type Product } from "../../data";
import { colors as c } from "../../theme";
import { useApp } from "../../context";
export function Listing({ id }: { id?: string }) {
  const app = useApp();
  const existing = app.inventory.find((p) => p.id === id);
  const [title, setTitle] = useState(existing?.name || "");
  const [category, setCategory] = useState(existing?.category || "Sneakers");
  const [condition, setCondition] = useState(existing?.condition || "New");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [price, setPrice] = useState(existing ? String(existing.price) : "");
  const [starting, setStarting] = useState(
    String(existing?.startingPrice ?? 50),
  );
  const [quantity, setQuantity] = useState(String(existing?.quantity || 1));
  const [shipping, setShipping] = useState(String(existing?.shipping ?? 12));
  const [type, setType] = useState<"Buy Now" | "Auction">(
    existing?.listingType || "Auction",
  );
  const [photo, setPhoto] = useState(existing?.image || "");
  function save(status: "Active" | "Draft") {
    if (
      !title.trim() ||
      !Number.isFinite(Number(price)) ||
      Number(price) <= 0 ||
      Number(quantity) < 1 ||
      !Number.isInteger(Number(quantity))
    ) {
      app.toast("Add a title, positive price, and whole-number quantity.");
      return;
    }
    if (
      !Number.isFinite(Number(shipping)) ||
      Number(shipping) < 0 ||
      !Number.isFinite(Number(starting)) ||
      Number(starting) < 0
    ) {
      app.toast(
        "Shipping and starting price must be valid nonnegative amounts.",
      );
      return;
    }
    const product: Product = {
      listingType: type,
      description,
      shipping: Number(shipping),
      startingPrice: Number(starting),
      id: existing?.id || "listing-" + Date.now(),
      name: title.trim(),
      price: Number(price),
      category,
      condition,
      variant: "Standard",
      image: photo || products[0]!.image,
      sellerId: "vault",
      status,
      quantity: Number(quantity),
    };
    app.setInventory((items) =>
      existing
        ? items.map((p) => (p.id === existing.id ? product : p))
        : [product, ...items],
    );
    app.toast(
      status === "Draft" ? "Draft saved" : "Listing added to inventory",
    );
    app.back();
  }
  return (
    <Screen
      title={existing ? "Edit listing" : "Create listing"}
      onBack={app.back}
    >
      <Pressable
        onPress={() => setPhoto(products[3]!.image)}
        style={[
          s.card,
          {
            alignItems: "center",
            marginBottom: tokens.spacing.xl,
            gap: tokens.spacing.sm,
          },
        ]}
      >
        {photo ? (
          <Photo
            uri={photo}
            style={{
              width: "100%",
              height: 160,
              borderRadius: tokens.radii.md,
            }}
          />
        ) : (
          <Icon name="camera-outline" size={36} color={c.brand} />
        )}
        <AppText bold>Add sample photo</AppText>
        <AppText muted size={12}>
          Tap to choose a mock product photo
        </AppText>
      </Pressable>
      <Field
        label="Title"
        value={title}
        onChange={setTitle}
        placeholder="What’s the find?"
      />
      <AppText bold size={13}>
        Listing type
      </AppText>
      <Chips
        items={["Buy Now", "Auction"]}
        value={type}
        onChange={(v) => setType(v === "Buy Now" ? "Buy Now" : "Auction")}
      />
      <AppText bold size={13}>
        Category
      </AppText>
      <Chips
        items={[
          "Sneakers",
          "Fashion",
          "Tech",
          "Beauty",
          "Collectibles",
          "Home",
        ]}
        value={category}
        onChange={setCategory}
      />
      <Field
        label="Description"
        value={description}
        onChange={setDescription}
        placeholder="Tell the story. Include the details."
        multiline
      />
      <AppText bold size={13}>
        Condition
      </AppText>
      <Chips
        items={["New", "Excellent", "Good"]}
        value={condition}
        onChange={setCondition}
      />
      <Field
        label="Price (USD)"
        value={price}
        onChange={setPrice}
        keyboardType="numeric"
      />
      {type === "Auction" && (
        <Field
          label="Starting price (USD)"
          value={starting}
          onChange={setStarting}
          keyboardType="numeric"
        />
      )}
      <Field
        label="Quantity"
        value={quantity}
        onChange={setQuantity}
        keyboardType="numeric"
      />
      <Field
        label="Shipping (USD)"
        value={shipping}
        onChange={setShipping}
        keyboardType="numeric"
      />
      <View style={{ gap: tokens.spacing.md }}>
        <Button label="Publish listing" onPress={() => save("Active")} />
        <Button secondary label="Save draft" onPress={() => save("Draft")} />
      </View>
    </Screen>
  );
}
