import React from "react";
import clsx from "clsx";
import { Box, BoxProps } from "../Box";
import { forwardRef } from "../system";

export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

export interface FlexProps extends BoxProps {
  direction?: FlexDirection;
}

export const Flex = forwardRef<FlexProps, "div">(
  ({ className, direction = "row", ...rest }, ref) => (
    <Box
      className={clsx(
        "flex",
        {
          "flex-col": direction == "column",
          "flex-row-reverse": direction == "row-reverse",
          "flex-col-reverse": direction == "column-reverse",
        },
        className
      )}
      ref={ref}
      {...rest}
    />
  )
);
