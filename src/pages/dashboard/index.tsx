import { useState } from "react";
import { Button } from "../../components/button";
import useNoteStore from "../../store/useNoteStore";
import { Note } from "../../types/note";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

import {
  MdOutlineMenuBook,
  MdOutlineStarOutline,
  MdOutlineStarPurple500,
} from "react-icons/md";

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
          onClick={handleAddNote}
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
                    className="  px-1 py-1 text-2xl text-blue-500 rounded-md max-w-12 cursor-pointer"
                    onClick={() => handleEditNote(note.id)}
                  >
                    <BiEdit />
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
    </>
  );
}
