import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Note } from "../../types/note";

interface InputsProps {
  id: keyof Note;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<Note>;
  errors: FieldErrors<Note>;
  className?: string;
}

export function TextArea({
  id,
  label,
  disabled,
  required,
  register,
  errors,
  className,
}: InputsProps) {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`${className} peer w-full p-4 pt-6 max-h-[150px] min-h-[150px] outline-none by-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${
          errors[id]
            ? "border-rose-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-300"
            : "border-slate-300 focus:border-slate-300 focus:ring-2 focus:ring-blue-300"
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? "text-rose-500" : "text-slate-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
