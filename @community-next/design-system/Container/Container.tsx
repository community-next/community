import React from "react";
import clsx from "clsx";
import { Box, BoxProps } from "../Box";
import { forwardRef } from "../system";

export interface ContainerProps extends BoxProps {}

export const Container = forwardRef<ContainerProps, "div">(
  ({ className, ...rest }, ref) => (
    <Box className={clsx("container mx-auto", className)} ref={ref} {...rest} />
  )
);

Container.displayName = "Container";
