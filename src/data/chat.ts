export const liveComments = [
  { name: "kickzcole", text: "That’s clean! 🔥" },
  { name: "maria.sneaks", text: "Need this in my collection!" },
];
export type ConversationMessage = { mine: boolean; text: string };
export const conversationMessages: ConversationMessage[] = [
  { mine: false, text: "Hey! Thanks for stopping by the show 👋" },
  { mine: true, text: "Loved the collection! Is this still available?" },
  { mine: false, text: "It is! Happy to answer any questions." },
];
