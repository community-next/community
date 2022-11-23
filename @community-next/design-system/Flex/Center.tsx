import React from "react";
import clsx from "clsx";
import { Flex, FlexProps } from "../Flex";
import { forwardRef } from "../system";

export interface CenterProps extends FlexProps {}

export const Center = forwardRef<CenterProps, "div">(
  ({ className, ...rest }, ref) => (
    <Flex
      className={clsx("items-center justify-center", className)}
      ref={ref}
      {...rest}
    />
  )
);

Center.displayName = "Center";
