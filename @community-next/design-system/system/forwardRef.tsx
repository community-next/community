import React from "react";
import { AsElement, StyledComponent, PropsOf, RightJoinProps } from "./types";

export function forwardRef<Props extends object, Component extends AsElement>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: AsElement;
    }
  >
) {
  return React.forwardRef(component) as unknown as StyledComponent<
    Component,
    Props
  >;
}
