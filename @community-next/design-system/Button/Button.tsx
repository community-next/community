import clsx from "clsx";
import React from "react";
import { styled, forwardRef, HTMLStyledProps } from "../system";

export type ButtonProps = HTMLStyledProps<"button"> & {
  variant?: "primary" | "secondary";
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
      <styled.button
        as={as}
        ref={ref}
        disabled={disabled}
        className={clsx(
          {
            border: true,
            shadow: variant === "primary",
            "shadow-sm": variant === "secondary",
            "cursor-pointer select-none outline-0": true,
            "font-medium text-center": true,
            "inline-flex items-center justify-center": true,
            "transition-all duration-300 ease-in-out": true,
            "text-white": variant === "primary",
            "text-light-gray-content1 dark:text-dark-gray-content1":
              variant === "secondary",
            "border-transparent": variant === "primary",
            "border-light-gray-border dark:border-drak-gray-border":
              variant === "secondary",
            "bg-light-blue-base dark:bg-dark-blue-base": variant === "primary",
            "bg-light-gray-background-primary dark:bg-dark-gray-background-primary":
              variant === "secondary",
            "hover:bg-light-blue-hover dark:hover:bg-dark-blue-hover":
              variant === "primary",
            "hover:bg-light-gray-background-secondary dark:hover:bg-dark-gray-background-secondary":
              variant === "secondary",
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
      </styled.button>
    );
  }
);

Button.displayName = "Button";
Button.defaultProps = {
  size: "md",
  variant: "primary",
};
