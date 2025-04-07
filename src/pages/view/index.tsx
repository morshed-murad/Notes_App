import { useNavigate, useParams } from "react-router-dom";
import useNoteStore from "../../store/useNoteStore";
import { Note } from "../../types/note";
import { BiArrowBack } from "react-icons/bi";

export default function ViewNotePage() {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();
  const note = useNoteStore((state) =>
    state.notes.find((n: Note) => n.id === noteId)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <button
        className="flex items-center gap-2 text-blue-500 font-bold border border-blue-500 rounded-md px-5 py-1 cursor-pointer"
        onClick={() => navigate("/notes")}
      >
        <BiArrowBack />
        Back
      </button>
      <div className="mt-10">
        <h1 className="text-2xl font-bold">{note?.title}</h1>
        <p className="mt-5">{note?.content}</p>
        <small className="text-gray-500 block mb-1">
          Created: {formatDate(note?.createdAt || "")}
        </small>
        <small className="text-gray-500 block mb-4">
          Last Updated: {formatDate(note?.updatedAt || "")}
        </small>
      </div>
    </div>
  );
}
