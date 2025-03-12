
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "text-sm px-4 py-2",
      md: "px-6 py-3",
      lg: "text-lg px-8 py-4",
    };
    
    const variantClasses = {
      primary: "bg-blood text-white hover:bg-blood-dark focus:ring-blood/50",
      secondary: "bg-white text-blood border border-blood/20 hover:bg-blood/5 focus:ring-blood/30",
      ghost: "bg-transparent hover:bg-secondary text-foreground hover:text-blood",
      link: "bg-transparent underline-offset-4 hover:underline text-blood p-0 h-auto",
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-lg font-medium transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "active:scale-[0.98]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          variant !== "link" && sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
