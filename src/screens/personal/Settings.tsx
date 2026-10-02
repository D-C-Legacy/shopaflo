import React from "react";
import { ROUTES } from "../../constants";
import { SettingsScreen } from "./SettingsScreen";
import { PaymentsScreen } from "./PaymentsScreen";
import { AddressesScreen } from "./AddressesScreen";
import { PrivacyScreen } from "./PrivacyScreen";
import { SecurityScreen } from "./SecurityScreen";
import { HelpScreen } from "./HelpScreen";
import { PayoutsScreen } from "./PayoutsScreen";
import { ReviewsScreen } from "./ReviewsScreen";
export function Settings({ name }: { name: string }) {
  switch (name) {
    case ROUTES.PAYMENTS:
      return <PaymentsScreen />;
    case ROUTES.ADDRESSES:
      return <AddressesScreen />;
    case ROUTES.PRIVACY:
      return <PrivacyScreen />;
    case ROUTES.SECURITY:
      return <SecurityScreen />;
    case ROUTES.HELP:
      return <HelpScreen />;
    case ROUTES.PAYOUTS:
      return <PayoutsScreen />;
    case ROUTES.REVIEWS:
      return <ReviewsScreen />;
    default:
      return <SettingsScreen />;
  }
}
