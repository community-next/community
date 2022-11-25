import { styled, HTMLStyledProps } from "../system";

export interface BoxProps extends HTMLStyledProps<"div"> {}

export const Box = styled.div;

Box.displayName = "Box";
