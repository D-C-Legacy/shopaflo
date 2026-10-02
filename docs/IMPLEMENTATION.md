# Implementation notes

The supplied UI plan is the design source of truth. The app uses Expo SDK 55 with React Native 0.83 and React 19.2, typed fixtures, local state, and no backend services.

`App.tsx` owns the five-tab shell, route stack, saved/followed items, inventory, and toast. Android back pops nested routes, then returns to Live. `src/components.tsx` contains common screen, form, sheet, card, feedback, and typography components. `src/theme.ts` centralizes colors, spacing, shape, typography, shadows, and USD formatting.

`src/auction.ts` is a pure reducer for the local auction model. `src/Live.tsx` owns cleaned-up timers, confirmation, custom bidding, chat, and state controls. A $1,500 bid gets a competing $1,650 bid after three seconds; a $1,700 bid enters an eight-second final countdown. A competing bidder can be triggered manually from Live options to demonstrate a loss.

`src/Marketplace.tsx`, `src/Seller.tsx`, and `src/Personal.tsx` group related screens. The app starts directly in Live; onboarding/sign-in/sign-up previews remain accessible from Profile → Settings so reviewers can reach the product immediately.

## Deliberate prototype boundaries

- Photo selection chooses a sample fixture; camera and live media are simulated.
- Form controls respond locally. Inventory edits survive navigation in the current session.
- Messages, payment/address changes, show scheduling, checkout confirmations, and controls are mock UI behaviors with no durable storage or account creation.
- Maximum custom bid is shown but does not run an automatic bidding engine.
- Share links and support/report actions are simulated, and do not send messages or publish content.
- Static image delivery requires internet; the remaining prototype and auction simulation do not.

## Review checklist

- Each tab opens and remains available from nested screens.
- Seller, product, conversation, order, listing, show-builder, dashboard and settings routes have back navigation.
- Confirmed bids, minimum validation, leading, competitor bids, countdown, win/loss, and reset have reducer tests.
- Settings → Preview states exposes loading, empty, offline, error, disabled, and success examples.
- Live → ellipsis exposes rejected bids, reconnecting, stream ended, withdrawn/cancelled products, verification and upcoming states.
- Checkout → Payment method → Simulate payment failure returns to the payment screen without showing a successful purchase.
