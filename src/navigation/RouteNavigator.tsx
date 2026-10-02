import React from "react";
import type { Route } from "../hooks/useNavigation";
import { ROUTES } from "../constants";
import { DiscoverNavigator } from "./DiscoverNavigator";
import { InboxNavigator } from "./InboxNavigator";
import { SellerNavigator } from "./SellerNavigator";
import { ProfileNavigator } from "./ProfileNavigator";
import { Checkout } from "../Personal";
export function RouteNavigator({ route }: { route: Route }) {
  switch (route.name) {
    case ROUTES.SEARCH:
    case ROUTES.PRODUCT:
    case ROUTES.SELLER:
      return <DiscoverNavigator route={route} />;
    case ROUTES.ACTIVITY:
    case ROUTES.CONVERSATION:
      return <InboxNavigator route={route} />;
    case ROUTES.INVENTORY:
    case ROUTES.LISTING:
    case ROUTES.CREATE_SHOW:
    case ROUTES.CONTROL:
    case ROUTES.DASHBOARD:
      return <SellerNavigator route={route} />;
    case ROUTES.CHECKOUT:
      return <Checkout id={route.id} amount={route.amount} />;
    default:
      return <ProfileNavigator route={route} />;
  }
}
