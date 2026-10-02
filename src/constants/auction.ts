export const AUCTION_STATES = [
  "upcoming",
  "preparing",
  "preview",
  "live",
  "leading",
  "outbid",
  "finalCountdown",
  "won",
  "lost",
  "ended",
] as const;
export const LIVE_ISSUES = [
  "Bid rejected",
  "Reconnecting…",
  "Stream ended",
  "Product withdrawn",
  "Auction cancelled",
  "Verification required",
] as const;
export const BID_INCREMENTS = [50, 100, 250, 500] as const;
