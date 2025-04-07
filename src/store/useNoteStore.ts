import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Note } from "../types/note";

const useNoteStore = create(
  persist(
    (set) => ({
      notes: [] as Note[],
      addNote: (note: Note) =>
        set((state: any) => ({ notes: [...state.notes, note] })),
    }),
    {
      name: "note-storage",
    }
  )
);

export default useNoteStore;
