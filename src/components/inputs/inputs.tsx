import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputsProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function Input({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  onChange,
  className,
}: InputsProps) {
  return (
    <div className="relative w-full">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        onChange={onChange}
        className={`${className} peer w-full p-4 pt-6 outline-none border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${
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
