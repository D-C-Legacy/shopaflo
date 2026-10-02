import React from "react";
import type { Route } from "../hooks/useNavigation";
import { ROUTES } from "../constants";
import { useApp, usePreferences } from "../hooks";
import { Collection } from "../Marketplace";
import {
  Orders,
  OrderDetail,
  Entry,
  StateGallery,
  Settings,
} from "../Personal";
import { EditProfileScreen } from "../screens/personal/EditProfileScreen";
import { NotificationSettingsScreen } from "../screens/personal/NotificationSettingsScreen";
import { ChangePasswordScreen } from "../screens/personal/ChangePasswordScreen";
import { VerificationScreen } from "../screens/auth/VerificationScreen";
export function ProfileNavigator({ route }: { route: Route }) {
  const app = useApp(),
    prefs = usePreferences();
  switch (route.name) {
    case ROUTES.ORDERS:
      return <Orders />;
    case ROUTES.ORDER:
      return <OrderDetail id={route.id} />;
    case ROUTES.EDIT_PROFILE:
      return <EditProfileScreen />;
    case ROUTES.NOTIFICATIONS:
      return <NotificationSettingsScreen />;
    case ROUTES.CHANGE_PASSWORD:
      return <ChangePasswordScreen />;
    case ROUTES.VERIFICATION:
      return (
        <VerificationScreen
          onBack={app.back}
          onVerified={() => {
            prefs.setVerified(true);
            app.toast("Demo verification complete");
            app.back();
          }}
        />
      );
    case ROUTES.SAVED:
    case ROUTES.FOLLOWING:
    case ROUTES.BIDS:
    case ROUTES.RECENT:
      return <Collection name={route.name} />;
    case ROUTES.STATES:
      return <StateGallery />;
    case ROUTES.ENTRY:
      return <Entry />;
    default:
      return <Settings name={route.name} />;
  }
}
