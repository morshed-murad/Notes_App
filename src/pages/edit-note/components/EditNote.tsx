import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useNoteStore from "../../../store/useNoteStore";
import { Input } from "../../../components/inputs/inputs";
import { TextArea } from "../../../components/inputs/TextArea";
import { Button } from "../../../components/button";
import { Note } from "../../../types/note";
import { toast, Toaster } from "sonner";

export function EditNote() {
  const [isLoading, setIsLoading] = useState(false);
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();
  const note = useNoteStore((state) =>
    state.notes.find((n: Note) => n.id === noteId)
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Note>();

  useEffect(() => {
    if (note) {
      setValue("title", note.title);
      setValue("content", note.content);
    }
  }, [note, setValue]);

  const updateNote = useNoteStore((state) => state.updateNote);

  const onSubmit = (data: Note) => {
    setIsLoading(true);
    updateNote(noteId as string, data);
    toast.success("Note updated successfully!");
    setTimeout(() => navigate("/notes"), 2000);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <Toaster
        closeButton
        className="text"
        position="top-right"
        toastOptions={{
          style: {
            border: "1px solid #4CAF50",
            padding: "16px",
            color: "green",
          },
        }}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white shadow-lg rounded px-12 pt-8 pb-10 mb-5 mt-20"
      >
        <h1 className="text-2xl font-bold mb-5">Edit Note</h1>
        <Input
          id="title"
          label="Title"
          type="text"
          required={true}
          register={register}
          errors={errors}
          className="input input-bordered w-full max-w-xs focus:border-green-500 focus:ring-1 focus:ring-green-500"
        />
        <TextArea
          id="content"
          label="Content"
          required={true}
          register={register}
          errors={errors}
          className="textarea textarea-bordered h-24 focus:border-green-500 focus:ring-1 focus:ring-green-500"
        />
        <Button
          type="submit"
          className="btn btn-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          label={isLoading ? "Loading..." : "Update Note"}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
