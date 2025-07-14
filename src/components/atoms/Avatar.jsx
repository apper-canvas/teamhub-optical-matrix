import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Avatar = forwardRef(({ className, src, alt, fallback, size = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        {
          "h-8 w-8": size === "sm",
          "h-10 w-10": size === "default",
          "h-12 w-12": size === "lg",
          "h-16 w-16": size === "xl",
        },
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-secondary text-white font-medium">
          {fallback}
        </div>
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;