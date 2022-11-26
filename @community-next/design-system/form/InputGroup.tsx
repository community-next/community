import clsx from "clsx";
import { Box, BoxProps } from "../Box";

export type InputGroupProps = BoxProps;

export function InputGroup({
  children,
  className,
  ...props
}: InputGroupProps): JSX.Element {
  return (
    <Box
      className={clsx(
        "flex relative flex-wrap items-stretch w-full",
        className
      )}
      {...props}
    >
      {children}
    </Box>
  );
}
