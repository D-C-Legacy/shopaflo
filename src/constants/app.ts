export const APP_NAME = "ShopaFlo";
export const MOCK_CONFIG = {
  initializationMs: 700,
  submissionMs: 450,
  toastMs: 3200,
  otpSeconds: 30,
  otpCode: "123456",
  competitorDelayMs: 3000,
  countdownSeconds: 8,
  bidIncrement: 50,
} as const;
export const ONBOARDING = [
  {
    title: "Shop live. Discover differently.",
    description: "Discover products through live sellers and communities.",
    icon: "radio-outline",
  },
  {
    title: "Bid in real time.",
    description:
      "Join auctions, place bids and win products while watching live.",
    icon: "flash-outline",
  },
  {
    title: "Follow the sellers you love.",
    description:
      "Build your feed around sellers, categories and products you care about.",
    icon: "heart-outline",
  },
] as const;
