import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-none border border-transparent text-xs font-bold uppercase transition-[background-color,color,border-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0",
  { variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground hover:bg-background hover:text-foreground",
        outline: "border-foreground bg-background text-foreground hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
        ghost: "text-foreground hover:bg-accent",
        inverse: "border-contrast-foreground bg-contrast-foreground text-contrast hover:bg-transparent hover:text-contrast-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: { default: "h-11 px-6", sm: "h-9 px-4 text-[0.65rem]", lg: "h-12 px-8", icon: "h-10 w-10 p-0" },
    }, defaultVariants: { variant: "default", size: "default" } },
);
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean; }
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild=false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
export { Button, buttonVariants };
