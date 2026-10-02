import { ROUTES } from "../../constants/routes";
import React, { useState } from "react";
import { Chips, EmptyState, MenuRow, Screen } from "../../components";
import { products, sellers } from "../../data";
import { formatUSD } from "../../theme";
import { useApp } from "../../context";
import { ProductGrid, SellerList } from "./shared";
export function Collection({ name }: { name: string }) {
  const app = useApp();
  const [tab, setTab] = useState("Products");
  const title =
    name === ROUTES.SAVED
      ? "Saved"
      : name === ROUTES.FOLLOWING
        ? "Following"
        : name === ROUTES.BIDS
          ? "Bids & Offers"
          : "Recently viewed";
  return (
    <Screen title={title} onBack={app.back}>
      {name === ROUTES.SAVED ? (
        <>
          <Chips
            items={["Products", "Shows", "Sellers"]}
            value={tab}
            onChange={setTab}
          />
          {tab === "Products" ? (
            app.saved.length ? (
              <ProductGrid
                items={products.filter((p) => app.saved.includes(p.id))}
              />
            ) : (
              <EmptyState
                title="Save your next favorite"
                detail="Tap the heart on any product to keep it here."
                onPress={() => app.navigate(ROUTES.DISCOVER)}
              />
            )
          ) : tab === "Sellers" ? (
            <SellerList />
          ) : (
            <MenuRow
              title="Friday night finds"
              detail="Today · 7:00 PM"
              onPress={() => app.toast("Show reminder enabled")}
            />
          )}
        </>
      ) : name === ROUTES.FOLLOWING ? (
        app.following.length ? (
          app.following.map((id) => {
            const seller = sellers.find((x) => x.id === id)!;
            return (
              <MenuRow
                key={id}
                title={seller.name + " · LIVE"}
                detail={seller.bio}
                onPress={() => app.navigate(ROUTES.SELLER, id)}
              />
            );
          })
        ) : (
          <EmptyState
            title="Find your people"
            detail="Follow sellers to catch their next show."
            onPress={() => app.navigate(ROUTES.DISCOVER)}
          />
        )
      ) : name === ROUTES.BIDS ? (
        <>
          <MenuRow
            title="Air Jordan 4 Retro"
            detail={`Upcoming · Minimum bid ${formatUSD(1500)}`}
            onPress={() => app.selectStream("s1")}
          />
          <MenuRow
            title="Vintage varsity jacket"
            detail={`Offer accepted · ${formatUSD(120)}`}
            onPress={() => app.navigate(ROUTES.CHECKOUT, "jacket")}
          />
        </>
      ) : (
        <ProductGrid items={products.slice(0, 2)} />
      )}
    </Screen>
  );
}
