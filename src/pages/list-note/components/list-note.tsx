import {
  MdOutlineMenuBook,
  MdOutlineStarOutline,
  MdOutlineStarPurple500,
} from "react-icons/md";
import useNoteStore from "../../../store/useNoteStore";
import { Note } from "../../../types/note";
import { useNavigate } from "react-router-dom";

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
    navigate(`/notes/${id}/view`);
  };
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
              className="mb-2 p-2 border border-gray-300 rounded-lg flex justify-between items-start"
            >
              <div className="">
                <h3 className="text-xl font-semibold">{note.title}</h3>
                <p className="text-gray-700 font-medium">
                  {truncateContent(note.content, 100)}
                </p>
                <small className="text-gray-600 block mb-1">
                  Created: {formatDate(note.createdAt)}
                </small>
                <small className="text-gray-600 block mb-4">
                  Last Updated: {formatDate(note.updatedAt || "not updated")}
                </small>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className={` px-1 py-1 text-2xl rounded-md max-w-12 cursor-pointer`}
                  onClick={() =>
                    useNoteStore.getState().toggleFavorite(note.id)
                  }
                >
                  {note.isFavorite ? (
                    <MdOutlineStarPurple500 className="text-amber-400" />
                  ) : (
                    <MdOutlineStarOutline className="text-gray-400" />
                  )}
                </button>
                <button
                  className="  px-1 py-1 text-2xl text-emerald-500 rounded-md max-w-12 cursor-pointer"
                  onClick={() => handleViewNote(note.id)}
                >
                  <MdOutlineMenuBook />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
