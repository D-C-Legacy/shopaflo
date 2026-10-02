import React, { createContext, useState } from "react";
import type {
  Address,
  PaymentMethod,
  NotificationPreferences,
  PrivacyPreferences,
} from "../types/preferences";
type Preferences = {
  payments: PaymentMethod[];
  addresses: Address[];
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
  verified: boolean;
  setVerified: (v: boolean) => void;
  setPayments: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  setNotifications: React.Dispatch<
    React.SetStateAction<NotificationPreferences>
  >;
  setPrivacy: React.Dispatch<React.SetStateAction<PrivacyPreferences>>;
};
export const PreferencesContext = createContext<Preferences | null>(null);
export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [payments, setPayments] = useState<PaymentMethod[]>([
    {
      id: "card-default",
      label: "Everyday card",
      brand: "Visa",
      last4: "4242",
    },
  ]);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "address-default",
      name: "Alex Morgan",
      street: "123 Market Street",
      city: "San Francisco",
      region: "CA",
      postal: "94103",
      country: "United States",
    },
  ]);
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    live: true,
    bids: true,
    orders: true,
    messages: true,
  });
  const [privacy, setPrivacy] = useState<PrivacyPreferences>({
    publicProfile: true,
    showActivity: false,
    onlineStatus: true,
  });
  const [verified, setVerified] = useState(false);
  return (
    <PreferencesContext.Provider
      value={{
        payments,
        addresses,
        notifications,
        privacy,
        verified,
        setVerified,
        setPayments,
        setAddresses,
        setNotifications,
        setPrivacy,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
