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
          "inline-flex items-center justify-center font-medium text-center cursor-pointer select-none transition-all duration-300 ease-in-out outline-0",
          {
            "bg-transparent border-transparent text-gray-600": !variant,
            "bg-light-blue-600 border-light-blue-200 text-white hover:bg-light-blue-500 dark:bg-drak-blue-600 dark:border-drak-blue-200 dark:hover:bg-dark-blue-500":
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
