import React from "react";
import clsx from "clsx";
import { Box, BoxProps } from "../Box";
import { forwardRef } from "../system";

export interface ContainerProps extends BoxProps {
  /**
   * 	None	width: 100%;
   *
sm (640px)	max-width: 640px;
md (768px)	max-width: 768px;
lg (1024px)	max-width: 1024px;
xl (1280px)	max-width: 1280px;
2xl (1536px)	max-width: 1536px;
   */
  maxWidth?:
    | "xs" // 360px
    | "sm" // 552px
    | "md" // 774px
    | "lg" // 840px
    | "xl" // 936px
    | "2xl"; // 1128px
}

export const Container = forwardRef<ContainerProps, "div">(
  ({ className, maxWidth, ...rest }, ref) => (
    <Box
      className={clsx(
        "container mx-auto",
        {
          "max-w-[360px]": maxWidth === "xs",
          "max-w-[552px]": maxWidth === "sm",
          "max-w-[774px]": maxWidth === "md",
          "max-w-[840px]": maxWidth === "lg",
          "max-w-[936px]": maxWidth === "xl",
          "max-w-[1128px]": maxWidth === "2xl",
        },
        className
      )}
      ref={ref}
      {...rest}
    />
  )
);

Container.displayName = "Container";
