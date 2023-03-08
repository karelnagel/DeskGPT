import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MessageType = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};
export type Screen = "home" | "settings";
export type Personality = {
  id: string;
  name: string;
  image?: string;
  prompt: string;
};
const defaultPersonalities: Personality[] = [
  {
    id: "default",
    name: "Default",
    prompt: "You are an AI assistant and have to answer the user's questions. You can use markdown to format your answers.",
  },
  {
    id: "elon",
    name: "Elon Musk",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
    prompt: "You are Elon Musk and have to answer the user's questions. You can use markdown to format your answers.",
  },
  {
    id: "davinci",
    name: "Leonardo Da Vinci",
    image:
      "data:image/jpeg;base64,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",
    prompt: "Pretend that you are Leonardo Da Vinci.",
  },
  {
    id: "dan",
    name: "DAN mode",
    prompt: "Pretend that you are Dan.",
  },
];

export type StoreType = {
  apiKey: string;
  shortcut: string;
  currentPersonality: string;
  setCurrentPersonality: (id: string) => void;
  personalities: Personality[];
  nextPerson: () => void;
  prevPerson: () => void;
  addPersonality: (personality: Personality) => void;
  removePersonality: (id: string) => void;
  editPersonality: (personality: Personality) => void;
  setShortcut: (k: string) => void;
  screen: Screen;
  setScreen: (screen: Screen) => void;
  setApiKey: (apiKey: string) => void;
  messages: MessageType[];
  addMessage: (message: MessageType) => void;
  editMessage: (message: MessageType) => void;
  clearChat: () => void;
};

export const useStore = create(
  persist<StoreType>(
    (set, get) => ({
      personalities: defaultPersonalities,
      currentPersonality: "default",
      setCurrentPersonality: (id) => set({ currentPersonality: id }),
      addPersonality: (personality) => {
        set((state) => ({
          personalities: [...state.personalities, personality],
          currentPersonality: personality.id,
        }));
      },
      removePersonality: (id) => {
        set((state) => ({
          personalities: state.personalities.filter((p) => p.id !== id),
          currentPersonality: state.personalities[0].id,
        }));
      },
      editPersonality: (personality) => {
        set((state) => ({
          personalities: state.personalities.map((p) => (p.id === personality.id ? personality : p)),
        }));
      },
      nextPerson: () => {
        const { personalities, currentPersonality } = get();
        const currentIndex = personalities.findIndex((p) => p.id === currentPersonality);
        const nextIndex = (currentIndex + 1) % personalities.length;
        set({ currentPersonality: personalities[nextIndex].id });
      },
      prevPerson: () => {
        const { personalities, currentPersonality } = get();
        const currentIndex = personalities.findIndex((p) => p.id === currentPersonality);
        const nextIndex = (currentIndex - 1 + personalities.length) % personalities.length;
        set({ currentPersonality: personalities[nextIndex].id });
      },
      shortcut: "CmdOrControl+Shift+G",
      setShortcut: (key) => set({ shortcut: key }),
      apiKey: "",
      screen: "home",
      setScreen: (screen) => set({ screen }),
      setApiKey: (apiKey) => set({ apiKey }),
      messages: [],
      addMessage: (message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      },
      editMessage: (message) => {
        set((state) => ({
          messages: state.messages.map((m) => (m.id === message.id ? message : m)),
        }));
      },
      clearChat: () => {
        set((state) => ({
          messages: [],
        }));
      },
    }),
    {
      name: "deskgpt",
    }
  )
);
