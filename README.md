# ShopaFlo

Expo SDK 55 / React Native / TypeScript UI-only live-shopping prototype. 

## Run

```sh
npm install
npm start
```

Scan the QR code with compatible Expo Go, or press `a` for Android / `i` for iOS (macOS required). `npm run web` opens the browser preview. On Windows use `npm.cmd` if PowerShell blocks npm.ps1.

## Launch and authentication

Splash → three-page onboarding → Welcome → Sign Up → Verification → Live. Alternatively choose Sign In from Welcome or “I already have an account” from onboarding. Use any fictional valid email and a password of at least eight characters. Sign Up includes name, username, email, password confirmation and terms acknowledgement. Demo OTP: **123456**. Password reset simulates success without sending email. Profile → Settings → Log out returns to Welcome; Replay onboarding restarts the introduction.

## Explore

- **Live:** swipe shows, follow, like, chat, product drawer, confirmed/custom bids. Bid $1,500, wait for the competing $1,650 bid, bid $1,700, then watch the countdown. Win leads to mock checkout. Live options expose rejected bids, connection states, cancellation/withdrawal, verification and auction-state previews.
- **Discover:** categories, search/results, product details, seller shows/shop/reviews/about.
- **Sell:** inventory, create/edit listing, six-step show builder, simulated control room and dashboard. Scheduled shows appear in the hub.
- **Inbox:** messages, activity, conversations and accepted offer cards.
- **Profile:** purchases/order details, saved, following, bids, recently viewed and profile editing.
- **Settings:** payment methods, addresses, notification/privacy preferences, password change, verification, support, logout and state gallery.
- **Checkout:** address → demo card → review → confirmation. Confirmed purchases appear in Orders with the winning amount. Payment includes a failure toggle.

Local data survives navigation and resets on reload. Marketplace data resets after logout. No backend or real account is created. Photography uses centralized static image URLs with neutral fallbacks. Custom maximum bid is display-only.

## Validate

```sh
npm run typecheck
npm test
npm run format:check
npm run export
npm run smoke
```

Export validates web, Android and iOS bundles. Smoke tests exported web UI using installed Chrome, including onboarding/auth, OTP rejection, reset, logout, profiles/settings, stored orders/shows, tabs, auctions, nested routes, states and narrow phones. On non-Windows machines set `SHOPAFLO_CHROME` to Chrome’s executable. Screenshots are saved in `output/`. Native device interaction is separate from bundle validation.

[Screen and hook inventory](docs/SCREEN_INVENTORY.md) · [Architecture](docs/ARCHITECTURE.md) · [Original design preview](docs/design-preview.png)

The user-supplied plan and prompts are preserved in `docs/`.
