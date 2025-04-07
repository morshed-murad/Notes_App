import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useNoteStore from "../../../store/useNoteStore";
import { Input } from "../../../components/inputs/inputs";
import { TextArea } from "../../../components/inputs/TextArea";
import { Button } from "../../../components/button";
import { Note } from "../../../types/note";

export function EditNote() {
  const { noteId } = useParams();
  const note = useNoteStore((state: any) =>
    state.notes.find((n: Note) => n.id === noteId)
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Note>();

  // Set form default values when the note is loaded
  useEffect(() => {
    if (note) {
      setValue("title", note.title);
      setValue("content", note.content);
    }
  }, [note, setValue]);


const updateNote = useNoteStore((state: any) => state.updateNote);

const onSubmit = (data: Note) => {
  updateNote(noteId as string, data);
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
      <Button type="submit" className="btn btn-primary" label="Update Note" />
    </form>
  );
}


