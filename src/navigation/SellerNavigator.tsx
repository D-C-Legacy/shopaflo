import React from "react";
import type { Route } from "../hooks/useNavigation";
import { ROUTES } from "../constants";
import {
  Inventory,
  Listing,
  CreateShow,
  ControlRoom,
  Dashboard,
} from "../Seller";
export function SellerNavigator({ route }: { route: Route }) {
  switch (route.name) {
    case ROUTES.INVENTORY:
      return <Inventory />;
    case ROUTES.LISTING:
      return <Listing id={route.id} />;
    case ROUTES.CREATE_SHOW:
      return <CreateShow />;
    case ROUTES.CONTROL:
      return <ControlRoom />;
    default:
      return <Dashboard />;
  }
}
