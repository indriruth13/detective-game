export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type SuspectId = "ningsih" | "jono" | "oleh";
export type Language = "en" | "id";

export interface Suspect {
  id: SuspectId;
  name: string;
  role: string;
  description: string;
  initialMessage: string;
}