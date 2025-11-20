import { cn } from "@/app/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

export function Button({
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-emerald-600 hover:bg-emerald-700 text-white",
    outline: "border border-zinc-700 hover:bg-zinc-800 text-zinc-300",
    ghost: "hover:bg-zinc-800 text-zinc-300",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}
