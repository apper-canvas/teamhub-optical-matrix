import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-gray-100 text-gray-700": variant === "default",
          "bg-success text-white": variant === "success",
          "bg-warning text-white": variant === "warning",
          "bg-error text-white": variant === "error",
          "bg-info text-white": variant === "info",
          "bg-primary text-white": variant === "primary",
        },
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;