import React from "react";
import clsx from "clsx";
import { Flex, FlexProps } from "../Flex";
import { forwardRef } from "../system";

export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 24;

export interface StackProps extends FlexProps {
  space?: Spacing;
}

export const Stack = forwardRef<StackProps, "div">(
  ({ className, space, ...rest }, ref) => (
    <Flex
      className={clsx(
        {
          "gap-0": space === 0,
          "gap-1": space === 1,
          "gap-2": space === 2,
          "gap-3": space === 3,
          "gap-4": space === 4,
          "gap-5": space === 5,
          "gap-6": space === 6,
          "gap-8": space === 8,
          "gap-10": space === 10,
          "gap-12": space === 12,
          "gap-16": space === 16,
          "gap-24": space === 24,
        },
        className
      )}
      ref={ref}
      {...rest}
    />
  )
);

Stack.displayName = "Stack";

Stack.defaultProps = {
  space: 2,
  direction: "column",
};

export type HStackProps = Omit<StackProps, "direction">;
export const HStack = forwardRef<HStackProps, "div">((props, ref) => (
  <Stack {...props} direction="row" ref={ref} />
));
HStack.displayName = "HStack";

export type VStackProps = Omit<StackProps, "direction">;
export const VStack = forwardRef<VStackProps, "div">((props, ref) => (
  <Stack {...props} direction="column" ref={ref} />
));
VStack.displayName = "VStack";
