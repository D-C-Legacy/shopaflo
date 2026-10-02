import type { AUCTION_STATES } from "../constants/auction";
export type AuctionState = (typeof AUCTION_STATES)[number];
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
