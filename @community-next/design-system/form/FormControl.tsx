import clsx from "clsx";
import { styled, HTMLStyledProps } from "../system";

export type FormControlProps = Omit<HTMLStyledProps<"input">, "size"> & {
  size?: "lg" | "md" | "sm";
  validStatus?: "valid" | "invalid";
};

export function FormControl({
  children,
  className,
  as,
  size = "md",
  validStatus,
  ...props
}: FormControlProps): JSX.Element {
  return (
    <styled.input
      as={as ?? "input"}
      className={clsx(
        {
          "outline-none": true,
          "block w-full": true,
          "text-light-gray-content2 dark:text-dark-gray-content2": true,
          "transition ease-in-out appearance-none": true,
          border: true,
          "text-base font-normal leading-normal": true,
          "rounded px-4 py-2": size === "md",
          "rounded py-3 px-6": size === "lg",
          "pr-9 bg-no-repeat bg-right-2": validStatus,
          "bg-5": validStatus && size === "lg",
          "bg-4": validStatus && size === "md",
          "bg-light-gray-background-primary border-light-gray-border dark:bg-dark-gray-background-primary dark:border-dark-gray-border":
            !validStatus,
          "border-light-red-base dark:border-dark-red-base":
            validStatus === "invalid",
          "border-light-green-base dark:border-dark-green-base":
            validStatus === "valid",
          "bg-invalid-icon": validStatus === "invalid",
          "bg-valid-icon": validStatus === "valid",
          "focus:border-light-blue-base dark:focus:border-dark-blue-base focus:shadow-focused-light-blue dark:focus:shadow-focused-dark-blue":
            !validStatus,
          "focus:shadow-focused-light-green dark:focus:shadow-focused-dark-green":
            validStatus === "valid",
          "focus:shadow-focused-light-red dark:focus:shadow-focused-dark-red":
            validStatus === "invalid",
        },
        className
      )}
      {...props}
    >
      {children}
    </styled.input>
  );
}
