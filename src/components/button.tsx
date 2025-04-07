"use client";

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: boolean;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function Button({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full  flex items-center justify-center gap-2 ${
        outline ? "bg-white" : "bg-blue-600"
      } ${outline ? "text-slate-700" : "text-white"} ${
        small ? "text-sm font-light" : "text-md font-semibold"
      } ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-[2px]"} ${
        custom ? custom : ""
      }`}
    >
      {Icon && <Icon size={24} />} {label}
    </button>
  );
}
