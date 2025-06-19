"use client"

import { X } from "lucide-react"
import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface GlossyCloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary"
}

export const GlossyCloseButton = forwardRef<HTMLButtonElement, GlossyCloseButtonProps>(
  ({ className, size = "md", variant = "secondary", children, ...props }, ref) => {
    // Map size to appropriate dimensions
    const sizeClasses = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-5 text-base",
    }

    return (
      <Button
        ref={ref}
        variant={variant === "primary" ? "default" : "outline"}
        className={cn(
          "relative group transition-all duration-300",
          sizeClasses[size],
          "flex items-center justify-center gap-2",
          "bg-gradient-to-b",
          variant === "primary"
            ? "from-[#8a7f72] to-[#5d4037] text-white border-[#8a7f72]/30"
            : "from-[#f5f5f5] to-[#e0e0e0] text-[#5d4037] border-[#d0d0d0]",
          "hover:shadow-lg active:shadow-inner active:translate-y-[1px]",
          className,
        )}
        {...props}
      >
        <span className="flex items-center gap-2">
          <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
          {children || "Close"}
        </span>
        <span
          className={cn(
            "absolute inset-0 rounded-xl opacity-20",
            "bg-gradient-to-b from-white to-transparent",
            "pointer-events-none",
          )}
        />
      </Button>
    )
  },
)

GlossyCloseButton.displayName = "GlossyCloseButton"
