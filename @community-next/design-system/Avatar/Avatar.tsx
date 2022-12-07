/* eslint-disable @next/next/no-img-element */

import clsx from "clsx";

export interface AvatarProps extends React.ComponentProps<"img"> {
  size: "sm" | "md" | "lg" | "xl" | "2xl";
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { src, alt, className, size, ...rest } = props;

  return (
    <span
      className={clsx(
        "rounded-full bg-light-gray-background-secondary dark:bg-dark-gray-background-secondary",
        {
          "w-8 h-8": size === "sm",
          "w-12 h-12": size === "md",
          "w-16 h-16": size === "lg",
          "w-24 h-24": size === "xl",
          "w-32 h-32": size === "2xl",
        },
        className
      )}
    >
      <img
        src={src}
        className={clsx("w-full h-full object-cover rounded-full")}
        alt={alt}
        loading="lazy"
        {...rest}
      />
    </span>
  );
};
