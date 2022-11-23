import clsx from "clsx";
import React from "react";
import { As, HTMLAsProps, forwardRef } from "../system";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

export interface TextProps extends HTMLAsProps<"div"> {
  variant?: "primary" | "secondary" | "tertiary";
  numberOfLines?: 1 | 2 | 3 | 4 | 5;
  size?: TextSize;
}

export const Text = forwardRef<TextProps, "div">(function Text(
  { className, variant = "primary", size, numberOfLines, ...rest },
  ref
) {
  return (
    <As.div
      ref={ref}
      className={clsx(
        {
          "text-light-gray-900 dark:text-dark-gray-900": variant === "primary",
          "text-light-gray-600 dark:text-dark-gray-600":
            variant === "secondary",
          "text-light-gray-400 dark:text-dark-gray-400": variant === "tertiary",
          "text-ellipsis": numberOfLines,
          "line-clamp-1 whitespace-nowrap": numberOfLines === 1,
          "line-clamp-2": numberOfLines === 2,
          "line-clamp-3": numberOfLines === 3,
          "line-clamp-4": numberOfLines === 4,
          "line-clamp-5": numberOfLines === 5,
          "text-xs": size === "xs",
          "text-sm": size === "sm",
          "text-lg": size === "lg",
          "text-xl": size === "xl",
          "text-2xl": size === "2xl",
          "text-3xl": size === "3xl",
          "text-4xl": size === "4xl",
        },
        className
      )}
      {...rest}
    />
  );
});

Text.displayName = "Text";
