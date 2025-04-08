import React from "react";
import useNoteStore from "../../../store/useNoteStore";
import { Note } from "../../../types/note";

const exportNotes = (notes: Note[]) => {
  const dataStr = JSON.stringify(notes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "notes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const importNotes = (
  event: React.ChangeEvent<HTMLInputElement>,
  setNotes: (notes: Note[]) => void,
  existingNotes: Note[]
) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedNotes: Note[] = JSON.parse(e.target?.result as string);

        const mergedNotes = [...existingNotes, ...importedNotes];
        setNotes(mergedNotes);
      } catch (error) {
        console.error("Failed to parse JSON", error);
      }
    };
    reader.readAsText(file);
  }
};

export function NotesManager() {
  const notes = useNoteStore((state) => state.notes);
  const setNotes = useNoteStore((state) => state.setNotes);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    importNotes(event, setNotes, notes);
  };

  return (
    <div className="flex flex-col gap-4 mt-12 w-full px-5 md:px-0 md:max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold my-10">Export Notes</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => exportNotes(notes)}
      >
        Export Notes
      </button>
      <h1 className="text-2xl font-bold my-10">Import Notes</h1>
      <input
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        type="file"
        accept=".json"
        onChange={handleImport}
      />
    </div>
  );
}
