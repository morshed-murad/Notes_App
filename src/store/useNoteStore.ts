// src/store/useNoteStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Note } from "../types/note";

interface NoteState {
  notes: Note[];
  addNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  toggleFavorite: (id: string) => void;
  updateNote: (
    id: string,
    updatedData: Partial<Omit<Note, "id" | "createdAt" | "updatedAt">>
  ) => void;
  setNotes: (notes: Note[]) => void;
}

const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              id: crypto.randomUUID(),
              ...note,
              createdAt: new Date().toISOString(),
              isFavorite: false,
            },
          ],
        })),
      toggleFavorite: (id) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
          ),
        })),
      updateNote: (id, updatedData) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updatedData, updatedAt: new Date().toISOString() }
              : note
          ),
        })),
      setNotes: (notes) => set({ notes }),
    }),
    {
      name: "note-storage",
    }
  )
);

export default useNoteStore;
