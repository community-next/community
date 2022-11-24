import clsx from "clsx";
import React from "react";
import {
  AsElement,
  AsComponent,
  DOMElements,
  HTMLAsProps,
  BaseProps,
} from "./types";

// support `as` prop for a component
export function createAsComponent<T extends AsElement, P = HTMLAsProps<T>>(
  component: T
) {
  return React.forwardRef(function AsComponent(
    {
      as,
      className,
      borderColor,
      borderTopColor,
      borderRightColor,
      borderBottomColor,
      borderLeftColor,
      backgroundColor,
      border,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
      color,
      rounded,
      hoverColor,
      fontWeight,
      textSize,
      ...props
    },
    ref
  ) {
    const Component = as ?? component;
    return (
      <Component
        ref={ref}
        className={clsx(
          {
            "border-light-gray-border dark:border-dark-gray-border": [
              true,
              "gray",
            ].includes(borderColor),
            "border-light-blue-border dark:border-dark-blue-border":
              borderColor === "blue",
            "border-light-green-border dark:border-dark-green-border":
              borderColor === "green",
            "border-light-orange-border dark:border-dark-orange-border":
              borderColor === "orange",
            "border-light-red-border dark:border-dark-red-border":
              borderColor === "red",
            "border-light-yellow-border dark:border-dark-yellow-border":
              borderColor === "yellow",

            "bg-light-gray-background-primary dark:bg-dark-gray-background-primary":
              [true, "gray"].includes(backgroundColor),
            "bg-light-gray-background-secondary dark:bg-dark-gray-background-secondary":
              backgroundColor === "gray-secondary",
            "bg-light-blue-background dark:bg-dark-blue-background":
              backgroundColor === "blue",
            "bg-light-green-background dark:bg-dark-green-background":
              backgroundColor === "green",
            "bg-light-orange-background dark:bg-dark-orange-background":
              backgroundColor === "orange",
            "bg-light-red-background dark:bg-dark-red-background":
              backgroundColor === "red",
            "bg-light-yellow-background dark:bg-dark-yellow-background":
              backgroundColor === "yellow",

            "text-light-gray-content1 dark:text-dark-gray-content1":
              color === "content1",
            "text-light-gray-content2 dark:text-dark-gray-content2":
              color === "content2",
            "text-light-gray-content3 dark:text-dark-gray-content3":
              color === "content3",
            "text-light-blue-base dark:text-dark-blue-base": color === "blue",
            "text-light-green-base dark:text-dark-green-base":
              color === "green",
            "text-light-orange-base dark:text-dark-orange-base":
              color === "orange",
            "text-light-red-base dark:text-dark-red-base": color === "red",
            "text-light-yellow-base dark:text-dark-yellow-base":
              color === "yellow",

            "hover:text-light-gray-content1 dark:hover:text-dark-gray-content1":
              hoverColor === "content1",
            "hover:text-light-gray-content2 dark:hover:text-dark-gray-content2":
              hoverColor === "content2",
            "hover:text-light-gray-content3 dark:hover:text-dark-gray-content3":
              hoverColor === "content3",
            "hover:text-light-blue-base dark:hover:text-dark-blue-base":
              hoverColor === "blue",
            "hover:text-light-green-base dark:hover:text-dark-green-base":
              hoverColor === "green",
            "hover:text-light-orange-base dark:hover:text-dark-orange-base":
              hoverColor === "orange",
            "hover:text-light-red-base dark:hover:text-dark-red-base":
              hoverColor === "red",
            "hover:text-light-yellow-base dark:hover:text-dark-yellow-base":
              hoverColor === "yellow",

            rounded: rounded === "base",
            "rounded-none": rounded === "none",
            "rounded-sm": rounded === "sm",
            "rounded-md": rounded === "md",
            "rounded-lg": rounded === "lg" || rounded === true,
            "rounded-full": rounded === "full",

            border: border === true,
            "border-0": border === "none",
            "border-2": border === "2",

            "border-t": borderTop === true,
            "border-t-0": borderTop === "none",
            "border-t-2": borderTop === "2",

            "border-r": borderRight === true,
            "border-r-0": borderRight === "none",
            "border-r-2": borderRight === "2",

            "border-b": borderBottom === true,
            "border-b-0": borderBottom === "none",
            "border-b-2": borderBottom === "2",

            "border-l": borderLeft === true,
            "border-l-0": borderLeft === "none",
            "border-l-2": borderLeft === "2",

            "font-normal": fontWeight === "normal",
            "font-medium": fontWeight === "medium",
            "font-semibold": fontWeight === "semibold",
            "font-bold": fontWeight === "bold",

            "text-xs": textSize === "xs",
            "text-sm": textSize === "sm",
            "text-lg": textSize === "lg",
            "text-xl": textSize === "xl",
            "text-2xl": textSize === "2xl",
            "text-3xl": textSize === "3xl",
            "text-4xl": textSize === "4xl",
          },
          className
        )}
        {...props}
      />
    );
  }) as AsComponent<T, P>;
}

export const As = new Proxy(
  {},
  {
    get(_, element: DOMElements) {
      return createAsComponent(element);
    },
  }
) as {
  [Tag in DOMElements]: AsComponent<Tag, HTMLAsProps<Tag>>;
};
