import clsx from "clsx";
import React from "react";
import { As, forwardRef, HTMLAsProps } from "../system";

export type ButtonProps = HTMLAsProps<"button"> & {
  variant?: "primary";
  size?: "lg" | "md" | "sm";
};

export const Button = forwardRef<ButtonProps, "button">(
  (
    {
      children,
      className,
      disabled,
      as = "button",
      variant,
      size = "md",
      ...props
    },
    ref
  ) => {
    return (
      <As.button
        as={as}
        ref={ref}
        disabled={disabled}
        className={clsx(
          {
            "cursor-pointer select-none outline-0": true,
            "font-medium text-center": true,
            "inline-flex items-center justify-center": true,
            "transition-all duration-300 ease-in-out": true,
            "bg-transparent border-transparent text-gray-600": !variant,
            " text-white": variant === "primary",
            "border-light-blue-border dark:border-drak-blue-border":
              variant === "primary",
            "bg-light-blue-base dark:bg-dark-blue-base": variant === "primary",
            "hover:bg-light-blue-hover dark:hover:bg-dark-blue-hover":
              variant === "primary",
            "rounded px-4 py-3 gap-2 text-xl": size === "lg",
            "rounded px-3 py-2 gap-2 text-base": size === "md",
            "rounded px-2 py-1 gap-1 text-sm": size === "sm",
            "opacity-40": disabled,
          },
          className
        )}
        {...props}
      >
        {children}
      </As.button>
    );
  }
);

Button.displayName = "Button";
Button.defaultProps = {
  size: "md",
  variant: "primary",
};
