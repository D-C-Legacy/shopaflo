# Screen and hook inventory

38 full-screen UI templates: 37 in `src/screens/` plus `src/Live.tsx`. The Settings dispatcher and marketplace card helpers are excluded. Shared templates serve multiple routes; sheet contents and wizard steps are not counted as additional screens.

Launch: Splash → three-page Onboarding → Welcome → Sign Up → OTP Verification → Live. Returning-session demo: Welcome → Sign In → Live. Settings → Log out returns to Welcome; Replay onboarding restarts the introduction. Demo OTP: `123456`.

| Screen | File |
|---|---|
| Live | [src/Live.tsx](../src/Live.tsx) |
| ForgotPasswordScreen | [src\screens\auth\ForgotPasswordScreen.tsx](../src/screens/auth/ForgotPasswordScreen.tsx) |
| OnboardingScreen | [src\screens\auth\OnboardingScreen.tsx](../src/screens/auth/OnboardingScreen.tsx) |
| SignInScreen | [src\screens\auth\SignInScreen.tsx](../src/screens/auth/SignInScreen.tsx) |
| SignUpScreen | [src\screens\auth\SignUpScreen.tsx](../src/screens/auth/SignUpScreen.tsx) |
| SplashScreen | [src\screens\auth\SplashScreen.tsx](../src/screens/auth/SplashScreen.tsx) |
| VerificationScreen | [src\screens\auth\VerificationScreen.tsx](../src/screens/auth/VerificationScreen.tsx) |
| WelcomeScreen | [src\screens\auth\WelcomeScreen.tsx](../src/screens/auth/WelcomeScreen.tsx) |
| Collection | [src\screens\marketplace\Collection.tsx](../src/screens/marketplace/Collection.tsx) |
| Discover | [src\screens\marketplace\Discover.tsx](../src/screens/marketplace/Discover.tsx) |
| ProductDetail | [src\screens\marketplace\ProductDetail.tsx](../src/screens/marketplace/ProductDetail.tsx) |
| Profile | [src\screens\marketplace\Profile.tsx](../src/screens/marketplace/Profile.tsx) |
| Search | [src\screens\marketplace\Search.tsx](../src/screens/marketplace/Search.tsx) |
| SellerProfile | [src\screens\marketplace\SellerProfile.tsx](../src/screens/marketplace/SellerProfile.tsx) |
| AddressesScreen | [src\screens\personal\AddressesScreen.tsx](../src/screens/personal/AddressesScreen.tsx) |
| ChangePasswordScreen | [src\screens\personal\ChangePasswordScreen.tsx](../src/screens/personal/ChangePasswordScreen.tsx) |
| Checkout | [src\screens\personal\Checkout.tsx](../src/screens/personal/Checkout.tsx) |
| Conversation | [src\screens\personal\Conversation.tsx](../src/screens/personal/Conversation.tsx) |
| EditProfileScreen | [src\screens\personal\EditProfileScreen.tsx](../src/screens/personal/EditProfileScreen.tsx) |
| Entry | [src\screens\personal\Entry.tsx](../src/screens/personal/Entry.tsx) |
| HelpScreen | [src\screens\personal\HelpScreen.tsx](../src/screens/personal/HelpScreen.tsx) |
| Inbox | [src\screens\personal\Inbox.tsx](../src/screens/personal/Inbox.tsx) |
| NotificationSettingsScreen | [src\screens\personal\NotificationSettingsScreen.tsx](../src/screens/personal/NotificationSettingsScreen.tsx) |
| OrderDetail | [src\screens\personal\OrderDetail.tsx](../src/screens/personal/OrderDetail.tsx) |
| Orders | [src\screens\personal\Orders.tsx](../src/screens/personal/Orders.tsx) |
| PaymentsScreen | [src\screens\personal\PaymentsScreen.tsx](../src/screens/personal/PaymentsScreen.tsx) |
| PayoutsScreen | [src\screens\personal\PayoutsScreen.tsx](../src/screens/personal/PayoutsScreen.tsx) |
| PrivacyScreen | [src\screens\personal\PrivacyScreen.tsx](../src/screens/personal/PrivacyScreen.tsx) |
| ReviewsScreen | [src\screens\personal\ReviewsScreen.tsx](../src/screens/personal/ReviewsScreen.tsx) |
| SecurityScreen | [src\screens\personal\SecurityScreen.tsx](../src/screens/personal/SecurityScreen.tsx) |
| SettingsScreen | [src\screens\personal\SettingsScreen.tsx](../src/screens/personal/SettingsScreen.tsx) |
| StateGallery | [src\screens\personal\StateGallery.tsx](../src/screens/personal/StateGallery.tsx) |
| ControlRoom | [src\screens\seller\ControlRoom.tsx](../src/screens/seller/ControlRoom.tsx) |
| CreateShow | [src\screens\seller\CreateShow.tsx](../src/screens/seller/CreateShow.tsx) |
| Dashboard | [src\screens\seller\Dashboard.tsx](../src/screens/seller/Dashboard.tsx) |
| Inventory | [src\screens\seller\Inventory.tsx](../src/screens/seller/Inventory.tsx) |
| Listing | [src\screens\seller\Listing.tsx](../src/screens/seller/Listing.tsx) |
| SellHub | [src\screens\seller\SellHub.tsx](../src/screens/seller/SellHub.tsx) |

## Custom hooks

9 custom hooks in `src/hooks/`:

- [useApp](../src/hooks/useApp.ts)
- [useAuction](../src/hooks/useAuction.ts)
- [useAuth](../src/hooks/useAuth.ts)
- [useCountdown](../src/hooks/useCountdown.ts)
- [useForm](../src/hooks/useForm.ts)
- [useMarketplaceState](../src/hooks/useMarketplaceState.ts)
- [useMockSubmit](../src/hooks/useMockSubmit.ts)
- [useNavigation](../src/hooks/useNavigation.ts)
- [usePreferences](../src/hooks/usePreferences.ts)

## Wizards and contextual flows

- Onboarding: Shop live → Bid in real time → Follow sellers.
- Sign up: five fields → terms acknowledgement → six-digit OTP verification.
- Password reset: email → simulated reset success.
- Create show: Details → Inventory → Auction rules → Shipping → Schedule → Preview; saved into session show list.
- Checkout: Shipping address → Payment method → Review → Confirmation; saved into session orders.
- Create/edit listing: sample photos, title, type, category, condition, description, pricing, quantity, shipping, draft/publish.
- Live sheets: bid confirmation, custom bid, product details, expanded Chat/Questions/Bids, sharing, and state controls.
- Settings: profile editor, payment/address forms, notification/privacy preferences, security/password change/verification, help/support, logout.

All behavior is local and simulated. No backend, real auth, payments, email, push, or streaming.
