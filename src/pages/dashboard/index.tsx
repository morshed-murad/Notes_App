import { useState, Suspense, lazy } from "react";
import { Button } from "../../components/button";
import useNoteStore from "../../store/useNoteStore";
import { Note } from "../../types/note";
import { useNavigate } from "react-router-dom";
const NoteList = lazy(() => import("../../components/note/note-list"));

export function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const notes = useNoteStore((state: any) => state.notes);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredNotes = notes.filter(
    (note: Note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const truncateContent = (content: string, wordLimit: number) => {
    const words = content.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };

  const handleAddNote = () => {
    navigate(`/notes/create`);
  };

  const handleEditNote = (id: string) => {
    navigate(`/notes/${id}`);
  };

  const handleViewNote = (id: string) => {
    navigate(`/notes/${id}/view`);
  };

  const handleSortNotes = (newNotes: Note[]) => {
    useNoteStore.setState({ notes: newNotes });
  };

  return (
    <div className="pb-10">
      <div className="flex justify-end gap-4 items-center ">
        <input
          type="text"
          placeholder="Search notes by title or content"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-96 border border-gray-300 rounded-md px-2 py-3"
        />
        <Button
          label="Add Note"
          className="bg-blue-500 text-white px-4 py-2 rounded-md max-w-40"
          onClick={handleAddNote}
        />
      </div>

      <div className="mt-4">
        {filteredNotes.length === 0 ? (
          <p className="text-gray-500">No notes available.</p>
        ) : (
          <Suspense fallback={<div>Loading notes...</div>}>
            <NoteList
              notes={filteredNotes}
              onEditNote={handleEditNote}
              onViewNote={handleViewNote}
              onToggleFavorite={(id: string) =>
                useNoteStore.getState().toggleFavorite(id)
              }
              onSortNotes={handleSortNotes}
              formatDate={formatDate}
              truncateContent={truncateContent}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
