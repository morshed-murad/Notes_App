import { useForm } from "react-hook-form";
import { Note } from "../../../types/note";
import { Input } from "../../../components/inputs/inputs";
import { TextArea } from "../../../components/inputs/TextArea";
import { Button } from "../../../components/button";
import useNoteStore from "../../../store/useNoteStore";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export function CreateNote() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Note>();
  const addNote = useNoteStore((state: any) => state.addNote);

  const onSubmit = (data: Note) => {
    setIsLoading(true);
    addNote(data);
    toast.success("Note added successfully!");
    setIsLoading(false);
    reset();
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
        <h1 className="text-2xl font-bold mb-5">Create new Notes</h1>
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
          label={isLoading ? "Loading..." : "Create Note"}
        />
      </form>
    </div>
  );
}
