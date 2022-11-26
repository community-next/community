import clsx from "clsx";
import { Box, BoxProps } from "../Box";

export type ValidationFeedbackProps = BoxProps & {
  status: "valid" | "invalid";
};

export function ValidationFeedback({
  status,
  className,
  ...props
}: ValidationFeedbackProps): JSX.Element {
  return (
    <Box
      className={clsx(
        "w-full mt-1 text-sm",
        {
          "text-light-red-base dark:text-dark-red-base": status === "invalid",
          "text-light-green-base dark:text-dark-green-base": status === "valid",
        },
        className
      )}
      {...props}
    />
  );
}
