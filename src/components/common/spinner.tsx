import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion, HTMLMotionProps } from "framer-motion";

interface SpinnerProps extends HTMLMotionProps<"div"> {
  size?: "sm" | "md" | "lg";
  text?: string;
  overlay?: boolean;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", text, overlay = false, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-6 w-6",
      md: "h-10 w-10",
      lg: "h-16 w-16",
    };

    const containerClasses = cn(
      "flex items-center justify-center gap-2",
      className
    );
    const overlayClasses = overlay
      ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      : "";

    return (
      <div className={overlayClasses}>
        <motion.div
          ref={ref}
          role="status"
          className={containerClasses}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          {...props}
        >
          <Loader2
            className={cn("animate-spin", sizeClasses[size])}
            style={{
              background: "linear-gradient(90deg, #4F46E5, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          />
          {text && (
            <motion.span
              className="text-sm font-medium text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {text}
            </motion.span>
          )}
          <span className="sr-only">Loading...</span>
        </motion.div>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";
