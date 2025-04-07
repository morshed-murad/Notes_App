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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
      <h1 className="text-xl font-bold">Edit Note</h1>
      <Input
        id="title"
        label="Title"
        type="text"
        register={register}
        errors={errors}
        className="input input-bordered w-full max-w-xs"
      />
      <TextArea
        id="content"
        label="Content"
        register={register}
        errors={errors}
        className="textarea textarea-bordered"
      />
      <Button
        type="submit"
        className="btn btn-primary"
        label={isLoading ? "Updating..." : "Update Note"}
      />
    </form>
  );
}
