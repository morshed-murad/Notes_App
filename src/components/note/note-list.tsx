// NoteList.tsx

import { Note } from "../../types/note";
import {
  MdOutlineMenuBook,
  MdOutlineStarOutline,
  MdOutlineStarPurple500,
} from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface NoteListProps {
  notes: Note[];
  onEditNote?: (id: string) => void;
  onViewNote?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onSortNotes: (newNotes: Note[]) => void;
  formatDate: (dateString: string) => string;
  truncateContent: (content: string, wordLimit: number) => string;
}

export default function NoteList({
  notes,
  onEditNote,
  onViewNote,
  onToggleFavorite,
  onSortNotes,
  formatDate,
  truncateContent,
}: NoteListProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedNotes = Array.from(notes);
    const [movedNote] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, movedNote);

    onSortNotes(reorderedNotes);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="notes">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col p-0 gap-4 h-[660px] overflow-y-auto"
          >
            {notes.map((note, index) => (
              <Draggable key={note.id} draggableId={note.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-2 p-2 border border-gray-300 rounded-lg flex justify-between items-start"
                  >
                    <div>
                      <h3 className="text-xl font-semibold">{note.title}</h3>
                      <p className="text-gray-700 font-medium">
                        {truncateContent(note.content, 30)}
                      </p>
                      <small className="text-gray-600 block mb-1">
                        Created: {formatDate(note.createdAt)}
                      </small>
                      <small className="text-gray-600 block mb-4">
                        Last Updated:{" "}
                        {formatDate(note.updatedAt || "not updated")}
                      </small>
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <button
                        className="px-1 py-1 text-2xl rounded-md max-w-12 cursor-pointer"
                        onClick={() => onToggleFavorite?.(note.id)}
                      >
                        {note.isFavorite ? (
                          <MdOutlineStarPurple500 className="text-amber-400" />
                        ) : (
                          <MdOutlineStarOutline className="text-gray-400" />
                        )}
                      </button>
                      {onEditNote && (
                        <button
                          className="px-1 py-1 text-2xl text-blue-500 rounded-md max-w-12 cursor-pointer"
                          onClick={() => onEditNote?.(note.id)}
                        >
                          <BiEdit />
                        </button>
                      )}

                      <button
                        className="px-1 py-1 text-2xl text-emerald-500 rounded-md max-w-12 cursor-pointer"
                        onClick={() => onViewNote?.(note.id)}
                      >
                        <MdOutlineMenuBook />
                      </button>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
