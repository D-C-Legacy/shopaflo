# ShopaFlo foundation

The app remains Expo + React Native + TypeScript, with local simulation only. No backend, database, auth service, payment service, APIs, WebSockets or streaming services.

## Entry flow

`App.tsx` installs SafeAreaProvider, AuthProvider and PreferencesProvider. RootNavigator chooses Splash, Onboarding, AuthNavigator or MainTabNavigator from local auth state.

Splash → three-page Onboarding → Welcome → Sign Up → Verification → Live. The returning-user demo is Welcome → Sign In → Live. Use any valid fictional email and a password of at least eight characters. Mock OTP: `123456`; wrong codes show an error. Forgot Password shows local success without sending email. Settings exposes Log out and Replay onboarding. Main tabs are hidden during auth; Android back works in both flows.

The splash is a dark React UI screen with a simulated initialization delay. This pass does not create a custom native launch-screen binary or install native splash plugins.

## Organization

| Layer | Responsibility |
|---|---|
| `src/constants/` | App configuration, routes, categories, auction options, USD formatter |
| `src/theme/` | Color, spacing, typography, radius and shadow tokens |
| `src/types/` | Shared user, seller, product, stream, auction, bid, message, notification, order, show and preference models |
| `src/data/` | Mock fixtures |
| `src/assets/` | Centralized static photography |
| `src/components/ui/` | Text, buttons, inputs, avatars, badges, chips, screens, sheets, cards and feedback |
| `src/components/auth/` | Shared authentication layout |
| `src/components/live/` | Seller header, action rail, chat overlay, product panel, stream cards |
| `src/components/commerce/` | Product cards, price display, order tracking |
| `src/hooks/` | Nine custom hooks for app context, auth, navigation, auctions, countdown, forms, mock submission, preferences and marketplace state |
| `src/providers/` | Local auth and preferences |
| `src/navigation/` | Root/auth/main and nested marketplace, inbox, profile and seller navigation |
| `src/screens/` | Individual screen implementations |
| `src/utils/` | Pure auth and show validation |

Original component/theme/data paths remain compatibility barrels. Existing working screens are preserved; complex live UI is decomposed into meaningful components. Navigation uses a typed local route stack without adding a runtime dependency. URL deep links are outside this prototype.

## State and boundaries

Saved products, follows, inventory, scheduled shows and confirmed orders survive navigation in the marketplace session. Profile edits appear in Profile. Addresses/payment defaults and notification/privacy preferences remain in memory and inform checkout. Logout unmounts marketplace state; reload resets all state and shows onboarding again.

Passwords are temporary form values; no credentials are stored. Camera/photo picking uses sample imagery. Share links, reports, support and password reset are simulated. Maximum custom bid is display-only. Existing static image URLs have neutral fallbacks; no external data API is called.

## Validation

Run `npm run typecheck`, `npm test`, `npm run format:check`, `npm run export`, and `npm run smoke`. Smoke tests exported web UI with installed Chrome. Android/iOS exports verify bundling; native device interaction requires Expo Go or a development build.

See [SCREEN_INVENTORY.md](SCREEN_INVENTORY.md) for screens and hooks.
