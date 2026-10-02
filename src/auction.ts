import type { Auction, AuctionAction } from "./types/auction";
export type { Auction, AuctionState, AuctionAction } from "./types/auction";
export const initialAuction: Auction = {
  state: "live",
  current: 1450,
  minimum: 1500,
  seconds: 8,
  bids: 12,
  userBid: null,
};
export function auctionReducer(a: Auction, action: AuctionAction): Auction {
  switch (action.type) {
    case "reset":
      return { ...initialAuction };
    case "state":
      return { ...a, state: action.state };
    case "bid":
      return !Number.isFinite(action.amount) ||
        action.amount < a.minimum ||
        !["live", "leading", "outbid", "finalCountdown"].includes(a.state)
        ? a
        : {
            ...a,
            state: "leading",
            current: action.amount,
            minimum: action.amount + 50,
            bids: a.bids + 1,
            userBid: action.amount,
            seconds: 8,
          };
    case "competitor":
      return a.state === "leading"
        ? {
            ...a,
            state: "outbid",
            current: Math.max(1650, a.current + 150),
            minimum: Math.max(1700, a.current + 200),
            bids: a.bids + 1,
          }
        : a;
    case "countdown":
      return { ...a, state: "finalCountdown", seconds: 8 };
    case "tick":
      return a.state !== "finalCountdown"
        ? a
        : a.seconds > 1
          ? { ...a, seconds: a.seconds - 1 }
          : {
              ...a,
              seconds: 0,
              state: a.userBid === a.current ? "won" : "lost",
            };
  }
}
