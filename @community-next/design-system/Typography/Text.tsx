import clsx from "clsx";
import React from "react";
import { As, HTMLAsProps, forwardRef } from "../system";
export interface TextProps extends HTMLAsProps<"div"> {
  variant?: "primary" | "secondary" | "tertiary";
  numberOfLines?: 1 | 2 | 3 | 4 | 5;
}

export const Text = forwardRef<TextProps, "div">(function Text(
  { className, variant = "primary", numberOfLines, ...rest },
  ref
) {
  return (
    <As.div
      ref={ref}
      className={clsx(
        {
          "text-light-gray-content1 dark:text-dark-gray-content1":
            variant === "primary",
          "text-light-gray-content2 dark:text-dark-gray-content2":
            variant === "secondary",
          "text-light-gray-content3 dark:text-dark-gray-content3":
            variant === "tertiary",
          "text-ellipsis": numberOfLines,
          "line-clamp-1 whitespace-nowrap": numberOfLines === 1,
          "line-clamp-2": numberOfLines === 2,
          "line-clamp-3": numberOfLines === 3,
          "line-clamp-4": numberOfLines === 4,
          "line-clamp-5": numberOfLines === 5,
        },
        className
      )}
      {...rest}
    />
  );
});

Text.displayName = "Text";
