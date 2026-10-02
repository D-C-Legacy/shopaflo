import type { Bid, Auction } from "../types";

export const bids: Bid[] = [
  {
    id: "b1",
    productId: "jordan",
    user: "Collector_21",
    amount: 1450,
    time: "Just now",
  },
  {
    id: "b2",
    productId: "jordan",
    user: "kickzcole",
    amount: 1400,
    time: "1 min ago",
  },
  {
    id: "b3",
    productId: "jordan",
    user: "maria.sneaks",
    amount: 1350,
    time: "2 min ago",
  },
];
export const auctions: (Auction & { id: string; productId: string })[] = [
  {
    id: "auction-1",
    productId: "jordan",
    state: "live",
    current: 1450,
    minimum: 1500,
    seconds: 8,
    bids: 12,
    userBid: null,
  },
  {
    id: "auction-2",
    productId: "dunk",
    state: "upcoming",
    current: 200,
    minimum: 250,
    seconds: 30,
    bids: 0,
    userBid: null,
  },
];
