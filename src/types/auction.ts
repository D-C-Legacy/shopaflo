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
export type Auction = {
  state: AuctionState;
  current: number;
  minimum: number;
  seconds: number;
  bids: number;
  userBid: number | null;
};
export type AuctionAction =
  | { type: "bid"; amount: number }
  | { type: "competitor" }
  | { type: "countdown" }
  | { type: "tick" }
  | { type: "reset" }
  | { type: "state"; state: AuctionState };
