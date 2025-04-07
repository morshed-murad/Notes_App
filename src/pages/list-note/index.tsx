import { useState } from "react";
import { NotesList } from "./components/list-note";

export function NoteListPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-end gap-4 items-center ">
        <input
          type="text"
          placeholder="Search notes by title or content"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-96  p-2 border border-gray-300 rounded-md mb-4"
        />
      </div>

      <NotesList searchTerm={searchTerm} />
    </div>
  );
}
