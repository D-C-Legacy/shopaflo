# ShopaFlo — Architecture & Foundation Pass

Review the existing ShopaFlo React Native project and improve its architecture before continuing with additional UI screens.

This is still a **UI-only application**. Do not add a backend, database, real authentication, APIs, WebSockets, payments, or real streaming.

The goal of this pass is to ensure the application has a strong reusable foundation and that screens are not being built as isolated one-off implementations.

## 1. Reusable Component Architecture

Audit the existing code and refactor duplicated UI into reusable components.

Do NOT create the same button, card, header, input, avatar, badge, price display, bottom sheet, or typography styles separately on multiple screens.

Create shared primitives such as:

```text
components/
├── ui/
│   ├── AppText
│   ├── AppButton
│   ├── IconButton
│   ├── AppInput
│   ├── SearchBar
│   ├── Avatar
│   ├── Badge
│   ├── Chip
│   ├── Divider
│   ├── Card
│   ├── Screen
│   ├── ScreenHeader
│   ├── EmptyState
│   ├── ErrorState
│   ├── Skeleton
│   ├── LoadingIndicator
│   └── BottomSheet
│
├── live/
│   ├── LiveBadge
│   ├── ViewerCounter
│   ├── LiveSellerHeader
│   ├── LiveActionRail
│   ├── LiveProductPanel
│   ├── AuctionTimer
│   ├── BidButton
│   ├── BidStatus
│   └── LiveChatOverlay
│
├── commerce/
│   ├── ProductCard
│   ├── PriceDisplay
│   ├── OrderCard
│   ├── BidHistoryRow
│   └── TrackingStatus
│
└── social/
    ├── SellerCard
    ├── MessageRow
    ├── ActivityRow
    ├── FollowButton
    └── VerifiedBadge
```

Use these components throughout the application.

Do not over-componentize trivial one-line wrappers, but anything visually or behaviorally repeated should generally be reusable.

---

# 2. Constants

Create a proper constants layer.

Do not scatter strings, route names, categories, auction states, currencies, mock configuration, or repeated values throughout screens.

Suggested structure:

```text
src/
├── constants/
│   ├── app.ts
│   ├── routes.ts
│   ├── categories.ts
│   ├── auction.ts
│   ├── currency.ts
│   └── index.ts
```

Example:

```ts
export const APP_NAME = "ShopaFlo";

export const CURRENCY = {
  code: "USD",
  locale: "en-US",
  symbol: "$",
} as const;
```

Create a reusable formatter:

```ts
export const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
```

Prices should be stored as numbers:

```ts
currentBid: 1450
```

not:

```ts
currentBid: "$1,450"
```

Then render using `formatUSD()`.

---

# 3. Centralized Theme

Create:

```text
src/theme/
├── colors.ts
├── spacing.ts
├── typography.ts
├── radii.ts
├── shadows.ts
└── index.ts
```

Use the ShopaFlo design tokens.

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

Spacing:

```ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};
```

Radii:

```ts
export const radii = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
};
```

Avoid repeating raw hex values and arbitrary spacing numbers throughout screen files.

---

# 4. Types

Create shared TypeScript models.

Suggested:

```text
src/types/
├── user.ts
├── seller.ts
├── product.ts
├── auction.ts
├── stream.ts
├── order.ts
├── message.ts
├── notification.ts
└── index.ts
```

Example auction state:

```ts
export type AuctionState =
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

Avoid `any`.

---

# 5. Mock Data

Centralize mock data.

Create:

```text
src/data/
├── users.ts
├── sellers.ts
├── products.ts
├── streams.ts
├── auctions.ts
├── messages.ts
├── notifications.ts
├── orders.ts
├── categories.ts
└── analytics.ts
```

Screens should consume this data rather than declaring large mock objects directly inside screen components.

Use realistic ShopaFlo data.

All monetary values must be USD.

---

# 6. Splash Screen

Make sure ShopaFlo has a polished splash experience.

Design:

- Dark ShopaFlo background
- ShopaFlo logo/wordmark centered
- Minimal presentation
- Premium startup aesthetic
- Optional subtle brand animation
- No unnecessary text

Flow:

```text
App Launch
    ↓
Splash
    ↓
Onboarding / Authentication
    ↓
Main App
```

Because this is UI only, simulate the initialization delay locally if needed.

Do not add backend initialization.

---

# 7. Onboarding

Create a polished onboarding flow introducing the core product.

Use approximately 3 screens.

### Screen 1

**Shop live. Discover differently.**

Discover products through live sellers and communities.

### Screen 2

**Bid in real time.**

Join auctions, place bids and win products while watching live.

### Screen 3

**Follow the sellers you love.**

Build your feed around sellers, categories and products you care about.

Final CTA:

**Get Started**

Secondary:

**I already have an account**

Include progress/page indicators.

Keep onboarding visually premium and concise.

---

# 8. Authentication

Create complete UI for:

```text
Auth
├── Welcome
├── Sign In
├── Sign Up
├── Forgot Password
└── Verification / OTP
```

This is simulated authentication only.

No Firebase, Supabase, Auth0, custom server, or real OAuth implementation.

---

# 9. Welcome Screen

Create a visually strong entry screen.

Include:

ShopaFlo branding.

Headline:

**Where shopping goes live.**

Supporting text:

**Watch. Bid. Buy. Discover something worth staying for.**

Actions:

**Create Account**

**Sign In**

Optional visual social buttons:

**Continue with Google**

**Continue with Apple**

These buttons are visual/local only.

---

# 10. Sign In

Fields:

- Email
- Password

Include:

- Password visibility toggle
- Forgot Password
- Remember me if appropriate

Primary CTA:

**Sign In**

Secondary:

**Don't have an account? Sign Up**

Social options may also be displayed.

Use shared `AppInput` and `AppButton` components.

Do not create authentication-specific duplicate button/input implementations.

---

# 11. Sign Up

Fields:

- Full name
- Username
- Email
- Password
- Confirm password

Include:

- Password visibility
- Terms acknowledgement
- Basic local validation UI

CTA:

**Create Account**

Footer:

**Already have an account? Sign In**

On successful mock submission:

```text
Sign Up
↓
Verification
↓
Main App
```

---

# 12. Forgot Password

Email input.

CTA:

**Send Reset Link**

Then show a local success state:

**Check your email**

No actual email needs to be sent.

---

# 13. Verification

Create a premium OTP verification UI.

Six-digit input.

Include:

**Resend code**

Mock countdown.

CTA:

**Verify**

Successful local verification enters the application.

---

# 14. Authentication State

Create a lightweight local auth state.

For example:

```ts
type AuthState =
  | "loading"
  | "onboarding"
  | "unauthenticated"
  | "authenticated";
```

No server.

The app should be able to demonstrate:

```text
Splash
→ Onboarding
→ Welcome
→ Sign Up
→ Verification
→ Main App
```

and:

```text
Splash
→ Welcome
→ Sign In
→ Main App
```

Provide a local way to log out from Settings/Profile and return to the authentication flow.

---

# 15. Navigation Structure

Ensure navigation is cleanly separated.

Suggested:

```text
navigation/
├── RootNavigator
├── AuthNavigator
├── MainTabNavigator
├── LiveNavigator
├── DiscoverNavigator
├── InboxNavigator
├── ProfileNavigator
└── SellerNavigator
```

Adapt this if using Expo Router.

The conceptual hierarchy should remain the same.

Main tabs:

```text
Live
Discover
Sell
Inbox
Profile
```

---

# 16. Routes

Centralize route identifiers if using React Navigation.

Do not scatter literal route strings throughout the project.

For example:

```ts
export const ROUTES = {
  SPLASH: "Splash",
  ONBOARDING: "Onboarding",
  WELCOME: "Welcome",
  SIGN_IN: "SignIn",
  SIGN_UP: "SignUp",

  LIVE: "Live",
  DISCOVER: "Discover",
  SELL: "Sell",
  INBOX: "Inbox",
  PROFILE: "Profile",

  PRODUCT: "Product",
  SELLER: "Seller",
  CONVERSATION: "Conversation",
  ORDER: "Order",
} as const;
```

If Expo Router makes explicit route constants unnecessary, follow its conventions instead of creating redundant abstractions.

---

# 17. Shared Screen Layout

Create a reusable `Screen` component that handles:

- Safe areas
- Background
- Horizontal padding
- Optional scrolling
- Keyboard avoidance
- Status bar treatment

Auth screens should share a common `AuthLayout` where useful.

Example:

```text
AuthLayout
├── Brand
├── Heading
├── Supporting text
├── Form content
└── Footer
```

Do not duplicate this structure across every auth screen.

---

# 18. Assets

Centralize asset references where appropriate.

Suggested:

```text
assets/
├── branding/
├── onboarding/
├── products/
├── sellers/
└── streams/
```

Do not use random unrelated placeholder images if suitable assets already exist in the repository.

Keep imagery consistent with ShopaFlo's premium live-commerce identity.

---

# 19. Icons

Use one consistent icon family where practical.

Create reusable icon-button treatment.

Do not mix several unrelated icon styles unless required.

Icons should have consistent:

- size
- stroke weight
- active state
- inactive state
- touch target

---

# 20. Component States

Reusable components should support relevant states rather than requiring separate components.

Example:

```tsx
<AppButton
  variant="primary"
  loading={isSubmitting}
  disabled={!isValid}
>
  Sign In
</AppButton>
```

Buttons should support variants such as:

```text
primary
secondary
ghost
danger
bid
```

Inputs should support:

```text
default
focused
filled
error
disabled
```

---

# 21. No Duplicated Styling

Audit the code for repeated values.

Avoid repeated:

```ts
paddingHorizontal: 20
borderRadius: 18
color: "#77777D"
```

when these already exist in theme tokens.

Some screen-specific styling is fine, but global design values must come from the theme.

---

# 22. File Quality

Keep components reasonably small.

Avoid screens containing 800+ lines because every element was implemented inline.

Break complex screens into meaningful components.

For example:

```text
LiveScreen
├── LiveMedia
├── LiveSellerHeader
├── LiveActionRail
├── LiveChatOverlay
└── LiveProductPanel
```

---

# 23. Preserve Existing Work

Do not rewrite working screens unnecessarily.

First inspect the existing repository.

Reuse and refactor good existing code.

Do not replace working components simply to satisfy a new folder structure.

Do not introduce regressions.

---

# 24. Validation

After the architecture pass:

1. Run TypeScript checking.
2. Run linting if configured.
3. Fix errors introduced by the changes.
4. Start/build the application if the environment permits.
5. Confirm Splash works.
6. Confirm Onboarding works.
7. Confirm Sign In works locally.
8. Confirm Sign Up works locally.
9. Confirm Verification works locally.
10. Confirm Logout returns to auth.
11. Confirm all five main tabs still work.
12. Confirm existing ShopaFlo screens remain reachable.
13. Confirm USD formatting is used everywhere.
14. Confirm shared components are actually reused.
15. Confirm there are no obvious duplicated constants or mock-data objects.

Do not stop after merely creating files. Wire the architecture into the actual application.

The final result should feel like one cohesive ShopaFlo product rather than a collection of independently designed screens.