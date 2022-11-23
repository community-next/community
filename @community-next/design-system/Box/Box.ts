import { As, HTMLAsProps } from "../system";

export interface BoxProps extends HTMLAsProps<"div"> {}

export const Box = As.div;

Box.displayName = "Box";
