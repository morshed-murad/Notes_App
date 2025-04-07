import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Note } from "../types/note";

const useNoteStore = create(
  persist(
    (set) => ({
      notes: [] as Note[],
      addNote: (note: Omit<Note, "id">) =>
        set((state: any) => ({
          notes: [
            ...state.notes,
            {
              id: crypto.randomUUID(),
              ...note,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateNote: (id: string, updatedData: Partial<Note>) =>
        set((state: any) => ({
          notes: state.notes.map((note: Note) =>
            note.id === id
              ? { ...note, ...updatedData, updatedAt: new Date().toISOString() }
              : note
          ),
        })),
    }),
    {
      name: "note-storage",
    }
  )
);

export default useNoteStore;
