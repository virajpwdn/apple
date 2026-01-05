import { create } from "zustand";

interface MacbookStore {
  color: string;
  scale: number;
  setColor: (color: string) => void;
  setScale: (scale: number) => void;
  reset: () => void;
}

const useMacbookStore = create<MacbookStore>((set) => ({
  color: "#2e2c2e",
  setColor: (color) => set({ color }),

  scale: 0.08,
  setScale: (scale) => set({ scale }),

  reset: () => set({ color: "#2e2c3e", scale: 0.08 }),
}));

export default useMacbookStore