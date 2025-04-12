
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "stone";
  size?: "sm" | "md" | "lg";
}

const PixelButton = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: PixelButtonProps) => {
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:shadow-ember-glow border-primary-foreground/20",
    secondary: "bg-secondary text-secondary-foreground hover:shadow-stone border-secondary-foreground/20",
    stone: "bg-stone text-foreground hover:shadow-stone border-stone-dark",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  };

  return (
    <button
      className={cn(
        "font-pixel transition-all duration-200 transform rounded border-2 shadow-stone hover:scale-105 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:pointer-events-none pixel-border",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default PixelButton;
