import useNoteStore from "../../../store/useNoteStore";
import { Note } from "../../../types/note";
import { useNavigate } from "react-router-dom";
import NoteList from "../../../components/note/note-list";
import { Suspense, useEffect } from "react";
import { toast, Toaster } from "sonner";

export function NotesList({ searchTerm }: { searchTerm: string }) {
  const navigate = useNavigate();
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

  const handleViewNote = (id: string) => {
    navigate(`/${id}/view`);
  };

  const handleSortNotes = (newNotes: Note[]) => {
    useNoteStore.setState({ notes: newNotes });
  };

  useEffect(() => {
    handleNavigate();
  }, [filteredNotes]);

  const handleNavigate = () => {
    if (filteredNotes.length === 0) {
      toast.error("No notes available.");
      setTimeout(() => {
        navigate("/notes/create");
      }, 2000);
    }
  };
  return (
    <div className="pb-10">
      <Toaster
        closeButton
        className="text"
        position="top-right"
        toastOptions={{
          style: {
            border: "1px solid red",
            padding: "16px",
            color: "red",
          },
        }}
      />
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      <div className="mt-4">
        {filteredNotes.length === 0 ? (
          <p className="text-gray-500">No notes available.</p>
        ) : (
          <Suspense fallback={<div>Loading notes...</div>}>
            <NoteList
              notes={filteredNotes}
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
