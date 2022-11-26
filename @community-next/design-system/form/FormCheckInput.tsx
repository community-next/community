import clsx from "clsx";
import { styled, HTMLStyledProps } from "../system";

export type FormCheckInputProps = HTMLStyledProps<"input"> & {
  validStatus?: "valid" | "invalid";
};

export function FormCheckInput({
  children,
  className,
  as,
  type,
  validStatus,
  ...props
}: FormCheckInputProps): JSX.Element {
  return (
    <styled.input
      as={as ?? "input"}
      type={type}
      className={clsx(
        "align-top bg-contain border appearance-none outline-none",
        {
          "w-4 h-4 mt-1": true,
          rounded: type === "checkbox",
          "bg-check-icon": type === "checkbox" && props.checked,
          "bg-light-gray-background-primary border-light-gray-border dark:bg-dark-gray-background-primary dark:border-dark-gray-border":
            !validStatus && !props.checked,
          "border-light-blue-border bg-light-blue-base dark:border-dark-blue-border dark:bg-dark-blue-base":
            !validStatus && props.checked,
          "border-light-red-base dark:border-dark-red-base":
            validStatus === "invalid",
          "border-light-green-base dark:border-dark-green-base":
            validStatus === "valid",
          "bg-light-red-base dark:bg-dark-red-base":
            validStatus === "invalid" && props.checked,
          "bg-light-green-base dark:bg-dark-green-base":
            validStatus === "valid" && props.checked,
          "focus:border-light-blue-base dark:focus:border-dark-blue-base":
            !validStatus,
          "focus:shadow-focused-light-blue dark:focus:shadow-focused-dark-blue":
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
