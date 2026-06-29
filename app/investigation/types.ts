export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type SuspectId = string;
export type StoryId = string;
export type Language = "en" | "id";

export interface Suspect {
  id: SuspectId;
  name: string;
  role: string;
  description: string;
  initialMessage: string;
  imageSrc: string;
  gender: "male" | "female";
}

export interface Exhibit {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}