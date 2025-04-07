import { useState } from "react";
import { Button } from "../../components/button";
import useNoteStore from "../../store/useNoteStore";
import { Note } from "../../types/note";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";

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

  const handleEditNote = (id: string) => {
    navigate(`/notes/${id}`);
  };

  return (
    <>
      <div className="flex justify-end gap-4 items-center ">
        <input
          type="text"
          placeholder="Search notes by title or content"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-96  border border-gray-300 rounded-md  px-2 py-3"
        />
        <Button
          label=" Add Note"
          className="bg-blue-500 text-white px-4 py-2 rounded-md max-w-40"
        />
      </div>

      <div className="mt-4">
        {filteredNotes.length === 0 ? (
          <p className="text-gray-500">No notes available.</p>
        ) : (
          <ul className="list-none p-0">
            {filteredNotes.map((note: Note, index: number) => (
              <li
                key={index}
                className="mb-2 p-2 border border-gray-300 rounded-lg flex justify-between items-center"
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
                    Last Updated: {formatDate(note.updatedAt)}
                  </small>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-blue-500  px-1 py-1 text-2xl text-white rounded-md max-w-12"
                    onClick={() => handleEditNote(note.id)}
                  >
                    <FaRegStar />
                  </button>
                  <button
                    className="bg-blue-500  px-1 py-1 text-2xl text-white rounded-md max-w-12"
                    onClick={() => handleEditNote(note.id)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="bg-blue-500  px-1 py-1 text-2xl text-white rounded-md max-w-12"
                    onClick={() => handleEditNote(note.id)}
                  >
                    <MdOutlineMenuBook />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
