export type User = {
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
};
export type AuthState =
  "loading" | "onboarding" | "unauthenticated" | "authenticated";
export type AuthPage =
  "welcome" | "sign-in" | "sign-up" | "forgot-password" | "verification";
