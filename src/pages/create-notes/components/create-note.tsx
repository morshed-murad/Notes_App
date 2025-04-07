import { useForm } from "react-hook-form";
import { Note } from "../../../types/note";
import { Input } from "../../../components/inputs/inputs";
import { TextArea } from "../../../components/inputs/TextArea";
import { Button } from "../../../components/button";
import useNoteStore from "../../../store/useNoteStore";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import useDarkModeStore from "../../../store/useDarkModeStore";
import { BiArrowBack } from "react-icons/bi";

export function CreateNote() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkModeStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Note>();
  const addNote = useNoteStore((state: any) => state.addNote);

  const onSubmit = (data: Omit<Note, "id">) => {
    setIsLoading(true);
    setTimeout(() => {
      addNote(data);
      toast.success("Note added successfully!");
      setIsLoading(false);
      reset();
      navigate("/notes");
    }, 2000);
  };

  useEffect(() => {
    handleDarkMode();
  }, [isDarkMode]);

  const handleDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <div className=" p-5 dark:text-slate-900">
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
      <button
        className="flex items-center gap-2 text-blue-500 font-bold border border-blue-500 rounded-md px-5 py-1 cursor-pointer"
        onClick={() => navigate("/notes")}
      >
        <BiArrowBack />
        Back
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white shadow-lg rounded px-12 pt-8 pb-10 mb-5 mt-20 max-w-4xl mx-auto"
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
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
