import { useEffect, useReducer } from "react";
import { auctionReducer, initialAuction } from "../auction";
import { MOCK_CONFIG } from "../constants";
export function useAuction() {
  const [auction, dispatch] = useReducer(auctionReducer, initialAuction);
  useEffect(() => {
    if (auction.state !== "leading") return;
    const timer = setTimeout(
      () =>
        dispatch({ type: auction.current < 1700 ? "competitor" : "countdown" }),
      MOCK_CONFIG.competitorDelayMs,
    );
    return () => clearTimeout(timer);
  }, [auction.state, auction.current]);
  useEffect(() => {
    if (auction.state !== "finalCountdown") return;
    const timer = setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => clearInterval(timer);
  }, [auction.state]);
  return { auction, dispatch };
}
