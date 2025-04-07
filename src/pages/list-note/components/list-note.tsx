import useNoteStore from "../../../store/useNoteStore";
import { Note } from "../../../types/note";
export function NotesList({ searchTerm }: { searchTerm: string }) {
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      {filteredNotes.length === 0 ? (
        <p className="text-gray-500">No notes available.</p>
      ) : (
        <ul className="list-none p-0">
          {filteredNotes.map((note: Note, index: number) => (
            <li
              key={index}
              className="mb-2 p-2 border border-gray-300 rounded-lg"
            >
              <h3 className="text-xl font-semibold">{note.title}</h3>
              <p className="text-gray-700">{note.content}</p>
              <small className="text-gray-600">
                Created: {formatDate(note.createdAt)}
              </small>
              <br />
              <small className="text-gray-600">
                Last Updated: {formatDate(note.updatedAt || "not updated")}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
