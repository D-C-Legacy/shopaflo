# ShopaFlo UI/UX Plan

## Scope
ShopaFlo is a mobile-first live-shopping and auction app. This project is **UI only**. Use mock data/local state; no backend, database, WebSockets, real payments, real bidding, authentication server, push infrastructure, or real streaming.

**Currency: USD ($) everywhere.**

## Navigation
Five persistent tabs: **Live · Discover · Sell · Inbox · Profile**. Default to **Live**.

```text
ShopaFlo
├─ Entry: Splash / Onboarding / Sign In / Sign Up
└─ Main
   ├─ Live: Feed / Product Drawer / Custom Bid / Chat / Auction States / Seller Profile
   ├─ Discover: Home / Search / Results / Product / Seller
   ├─ Sell: Hub / Listing / Show Builder / Inventory / Live Control / Dashboard
   ├─ Inbox: Messages / Conversation / Activity
   └─ Profile: Purchases / Selling / Saved / Following / Bids / Settings
```

## Live Feed
Full-screen simulated video/image. Header: LIVE badge, viewer count, seller avatar/name/verification, Follow. Right rail: Like, Chat, Share, More. Bottom: product thumbnail/name/variant, current bid, bid count, countdown, Bid CTA, Custom Bid, Product Details.

Example:
```text
LIVE · 1.8K watching
@SneakerVault ✓                         Follow

Nike Air Jordan 4 Retro · US 10 · New
Current bid  $1,450             12 bids · 00:08

[ BID $1,500 ]
Custom Bid                     Product Details
```

Gestures: swipe up/down for streams; tap video toggles controls; double-tap likes; seller opens profile; product opens drawer; Bid confirms; Custom Bid opens sheet; Chat expands.

## Auction States
Support: **Upcoming, Preparing, Preview, Live, Leading, Outbid, Final Countdown, Won, Lost, Ended**.

Outbid:
```text
You've been outbid
Current bid $1,650
[ BID $1,700 ]
```

Won:
```text
YOU WON
Nike Air Jordan 4 Retro
Winning bid $1,850
[ Complete Purchase ]
```

Bid sequence:
```text
BID $1,500 → Confirm $1,500 → ✓ You're winning
→ ↑ Outbid — $1,650 → BID $1,700 → countdown → Won/Lost
```
Never show a rejected bid as successful.

## Custom Bid
Bottom sheet with current bid, minimum bid, large currency input, **+$50 / +$100 / +$250 / +$500**, optional maximum bid, and Place Bid CTA.

## Product Drawer
Expandable sheet while stream remains visible. Include imagery, price, condition, variant, description, authenticity, shipping, delivery, returns and bid history.

## Live Chat
Collapsed comments overlay the stream. Expanded sheet (~60–70% height) has **Chat · Questions · Bids** tabs and composer.

## Discover
Search: **Search live shows, sellers or products**.
Categories: **For You · Fashion · Sneakers · Tech · Beauty · Collectibles · Home**.
Sections: **Live Now** two-column grid, Trending Sellers, Starting Soon, Popular Auctions, Recommended for You.

## Search
Initial: recent/trending searches and categories.
Results tabs: **Top · Live · Products · Sellers**.
Filters: **Live Now · Price · Category · Condition · Shipping**.

## Seller Profile
Avatar, verification, bio, followers, rating, sold count, Follow and Message.
Tabs: **Shows · Shop · Reviews · About**. Highlight **LIVE NOW**.

## Storefront
Grid states: **Buy Now · Auction · Live · Upcoming · Sold**. Cards show image, name, price/starting bid, condition, auction info and save.

## Inbox
Segment: **Messages · Activity**.
Activity includes outbid, upcoming auction, seller live, auction won, shipped, offer accepted and payment success.

## Conversation
Header, product context, messages, images, offer cards, timestamps and composer.

## Checkout UI
Simulate **Win → Shipping Address → Payment Method → Order Review → Confirmation**. No payment processing.

## Orders
Tabs: **Buying · Selling**.
States: **Awaiting Payment · Processing · Shipped · Delivered · Cancelled**.
Detail: product, seller, winning bid, shipping, tracking UI, payment summary, receipt, message seller, report issue.

## Profile
Avatar/name/bio/followers/following/reviews. Sections: Purchases, Saved, Following, Bids & Offers, Recently Viewed. Settings: payments, addresses, notifications, privacy, security, help, settings.

## Saved / Following
Saved categories: **Products · Shows · Sellers**. Simulate reminders. Prioritize followed sellers marked LIVE.

## Sell Hub
**Go Live · Schedule Show · Create Listing · Manage Inventory · Seller Dashboard**

## Create Show
1. Details
2. Inventory
3. Auction Rules
4. Shipping
5. Schedule
6. Preview / Schedule Show

## Create Listing
Photos, title, category, description, condition, price, auction starting price, quantity, shipping; **Buy Now / Auction** type.

## Inventory
Filters: **All · Active · Draft · Sold · Archived**. Each item has image, quantity, price, status, edit.

## Seller Live Control
Simulated camera surface, LIVE/viewers, current product, price, bids, timer.
Controls: **Start Auction · End Auction · Next Product · Pin Product**.
Queue: NOW / NEXT / LATER.
Tools: Chat, Orders, Viewers, Moderation.

## Seller Dashboard
Mock KPIs: **$18,450 Sales · 32 Orders · 1,482 Viewers · 8.4% Conversion**.
Sections: Sales, Orders, Inventory, Shows, Analytics, Payouts, Reviews. Use simple mock charts.

## State Handling
Components support **Default · Pressed · Selected · Disabled · Loading · Success · Warning · Error · Empty · Offline**.
Include bid rejected, reconnecting, stream ended, withdrawn product, cancelled auction, verification required and payment failed states.
Create skeletons and polished empty states.

## Design Language
**Live entertainment × premium marketplace × modern social app.**
Premium 2026, youthful, fast, immersive, minimal, high-contrast, social and commerce-focused. Avoid generic ecommerce, corporate dashboards, excessive glassmorphism/gradients, casino aesthetics, clutter, or direct clones.

### Colors
- Ink `#0B0B0D`
- Canvas `#FFFFFF`
- Soft Canvas `#F6F6F4`
- Brand `#6C4DFF`
- Live `#FF4057`
- Success `#16A66A`
- Warning `#F5A524`
- Text `#111113`
- Secondary `#77777D`

Live surfaces: dark translucent media overlays. Other screens: airy light surfaces.

### Typography
Inter/SF-like/system. Display 48/52 Bold; screen 32/36 Bold; section 22/28 Semibold; product 17/22 Semibold; body 15/21; metadata 13/17. Use tabular numerals for prices/timers.

### Shape / Spacing
Cards 16–20px; buttons 14–18px; pill chips; sheets 24–28px top radius. Spacing scale: `4 8 12 16 20 24 32 40 48 64`.

## Components
Navigation: BottomNavigation, TopNavigation, BackButton, TabBar.
Live: LiveBadge, ViewerCounter, LiveActionRail, LiveSellerHeader, LiveProductPanel, AuctionTimer, BidButton, BidStatus, LiveChatOverlay.
Marketplace: ProductCard, LiveStreamCard, SellerCard, CategoryCard, SearchBar, FilterChip.
Social: Avatar, VerifiedBadge, FollowButton, MessageRow, NotificationRow.
Commerce: PriceDisplay, BidHistoryRow, OrderCard, CheckoutSummary, TrackingStatus.
Forms: TextInput, CurrencyInput, Select, Toggle, Radio, Stepper, ImagePickerPlaceholder.
Feedback: Toast, Modal, BottomSheet, Skeleton, EmptyState, ErrorState, OfflineBanner, SuccessState.

## Final Principle
Keep global navigation simple: **Live · Discover · Sell · Inbox · Profile**. Put complexity contextually inside those areas.
