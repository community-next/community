import clsx from "clsx";
import React from "react";
import { As, HTMLAsProps, forwardRef } from "../system";

export interface HeadingProps extends HTMLAsProps<"h2"> {}

export const Heading = forwardRef<HeadingProps, "h2">(function Heading(
  { className, as, ...rest },
  ref
) {
  return (
    <As.h2
      as={as}
      ref={ref}
      className={clsx(
        "font-medium text-light-gray-content1 dark:text-dark-gray-content1",
        {
          "text-5xl leading-tight": as === "h1",
          "text-4xl leading-[1.333]": as === "h2",
          "text-2xl": as === "h3",
          "text-xl": as === "h4",
          "text-base": as === "h5",
          "text-sm": as === "h6",
        },
        className
      )}
      {...rest}
    />
  );
});

Heading.displayName = "Heading";
