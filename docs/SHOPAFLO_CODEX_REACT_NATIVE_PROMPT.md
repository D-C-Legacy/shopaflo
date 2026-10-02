# Codex Prompt — Build ShopaFlo React Native UI

Build a polished **React Native + TypeScript UI-only prototype** for **ShopaFlo**. Read `SHOPAFLO_UI_PLAN.md` first and use it as the source of truth.

## Hard Requirements
- UI ONLY: no backend, database, WebSockets, real auth, payments, bidding, streaming, push, cloud functions or external APIs.
- Use typed mock data and local state.
- All money is **USD ($)**.
- Build a navigable app, not disconnected screenshots.
- Prefer Expo if starting from scratch; otherwise respect the existing React Native stack.
- Use safe areas, reusable components, centralized design tokens and performant lists.
- Avoid unnecessary dependencies.

## Main Navigation
Five tabs: **Live · Discover · Sell · Inbox · Profile**. Default to Live.

## Screens
Build:
- Splash, Onboarding, Sign In, Sign Up
- Vertical Live Feed
- Product Drawer
- Custom Bid sheet
- Expanded Live Chat
- Auction Won/Lost and other auction states
- Discover Home
- Search / Results
- Product Detail
- Seller Profile / Storefront
- Messages / Activity / Conversation
- Buyer Profile
- Purchases / Orders
- Saved / Following / Bids & Offers
- Payment Methods / Addresses / Settings UI
- Sell Hub
- Create Listing
- Create Show multi-step flow
- Inventory
- Seller Live Control Room
- Seller Dashboard

## Auction Simulation
Use a local state model:
```ts
type AuctionState =
  | "upcoming"
  | "preparing"
  | "preview"
  | "live"
  | "leading"
  | "outbid"
  | "finalCountdown"
  | "won"
  | "lost"
  | "ended";
```

Make this flow demonstrable:
```text
Live → BID $1,500 → Confirm $1,500 → You're winning
→ simulated competitor bid → Outbid $1,650
→ BID $1,700 → countdown → Won or Lost
```
Use local timers and clean them up correctly.

## Currency
Store prices as numbers and centralize USD formatting:
```ts
export const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
```
Mock examples: $1,450 current bid; $1,500 minimum; $1,750 custom; $1,850 winning; +$50/+100/+250/+500; $18,450 seller sales. Do not use any other currency.

## Mock Data
Create typed fixtures for users, sellers, streams, products, auctions, bids, messages, activity, orders, reviews, analytics and categories. Use enough records to make lists/carousels realistic.

## Components
Create reusable components rather than repeating UI:
`AppText`, `Screen`, `Avatar`, `VerifiedBadge`, `AppButton`, `IconButton`, `SearchBar`, `FilterChip`, `TabBar`, `BottomNavigation`, `LiveBadge`, `ViewerCounter`, `LiveSellerHeader`, `LiveActionRail`, `LiveProductPanel`, `AuctionTimer`, `BidButton`, `BidStatus`, `ProductCard`, `LiveStreamCard`, `SellerCard`, `MessageRow`, `ActivityRow`, `OrderCard`, `PriceDisplay`, `BottomSheet`, `Toast`, `Skeleton`, `EmptyState`, `ErrorState`, `OfflineBanner`.

## Theme
Centralize tokens:
```ts
export const colors = {
  ink: "#0B0B0D",
  canvas: "#FFFFFF",
  softCanvas: "#F6F6F4",
  brand: "#6C4DFF",
  live: "#FF4057",
  success: "#16A66A",
  warning: "#F5A524",
  text: "#111113",
  textSecondary: "#77777D",
};
```
Also centralize spacing, radii, typography and shadows.

Live screens use dark/translucent overlays over media. Discover, Inbox, Profile and seller-management screens are mostly light and airy.

## Interactions
Implement visual/local behavior for:
- vertical stream navigation
- follow/unfollow
- like/unlike
- save/unsave
- filter chips/tabs
- bid confirmation
- custom bid increments
- auction state changes
- mock chat sending
- notifications
- mock checkout steps
- create-show stepper
- seller auction controls
- loading/error/empty/offline states

Core controls should respond; do not add backend complexity just to make everything functional.

## Navigation Quality
Avoid dead ends. Seller avatars open profiles, products open details, messages open conversations, orders open details, Sell opens the Sell Hub, and back navigation works.

## Visual Target
Create a premium **2026 consumer startup** aesthetic: cinematic live surfaces, editorial/light non-live screens, strong hierarchy, restrained shadows, 16–20px rounded cards, pill chips, premium sheets, crisp icons, high contrast and tabular bid/timer numerals.

Avoid generic ecommerce, corporate dashboard styling, excessive gradients/glassmorphism, clutter, casino language, or pixel-for-pixel copying of Whatnot/TikTok.

## Responsive / Accessibility
Design primarily for modern iPhone proportions but support typical Android sizes. Respect safe areas, notches, home indicators, keyboard avoidance and variable screen heights. Use reasonable touch targets, contrast, accessibility labels for icon-only controls, and do not rely on color alone for auction status.

## State Coverage
Include examples for Default, Pressed, Selected, Disabled, Loading, Success, Warning, Error, Empty and Offline.

Explicitly include:
- bid rejected
- reconnecting
- stream ended
- product withdrawn
- auction cancelled
- verification required
- payment failed
- empty saved/orders/messages/inventory/search
- skeleton loading

## Code Quality
- TypeScript with useful types; avoid `any`
- small reusable components
- sensible naming
- no giant monolithic screen when decomposition is obvious
- no duplicated mock objects scattered across screens
- no hardcoded currency strings where formatter should be used
- no backend placeholders that generate runtime errors
- keep console clean
- ensure app boots successfully

## Completion Criteria
Before finishing:
1. Run available typecheck/lint commands.
2. Fix errors introduced by the implementation.
3. Verify all five tabs navigate.
4. Verify major nested routes work.
5. Verify live bid simulation works locally.
6. Verify USD appears throughout.
7. Verify mock loading/error/empty states are accessible.
8. Verify layouts do not obviously overflow common phone widths.
9. Leave the repository in a runnable state.

Prioritize **visual polish and cohesive UI** over backend-like functionality.
