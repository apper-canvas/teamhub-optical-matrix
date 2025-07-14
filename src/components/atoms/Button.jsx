import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ className, variant = "primary", size = "default", children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-gradient-to-r from-primary to-secondary text-white hover:brightness-110 hover:scale-105": variant === "primary",
          "bg-accent text-white hover:brightness-110 hover:scale-105": variant === "accent",
          "bg-surface text-primary border border-primary hover:bg-primary hover:text-white": variant === "outline",
          "bg-transparent text-primary hover:bg-primary hover:text-white": variant === "ghost",
          "bg-error text-white hover:brightness-110 hover:scale-105": variant === "danger",
          "bg-success text-white hover:brightness-110 hover:scale-105": variant === "success",
        },
        {
          "h-10 px-4 py-2 text-sm": size === "default",
          "h-9 px-3 py-1 text-sm": size === "sm",
          "h-11 px-8 py-3 text-base": size === "lg",
          "h-8 w-8 p-0": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;