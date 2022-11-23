import React from "react";
import { AsElement, AsComponent, DOMElements, HTMLAsProps } from "./types";

// support `as` prop for a component
export function createAsComponent<T extends AsElement, P = HTMLAsProps<T>>(
  component: T
) {
  return React.forwardRef(function AsComponent(props, ref) {
    const Component = props.as ?? component;
    return React.createElement(Component, {
      ref,
      ...props,
    });
  }) as AsComponent<T, P>;
}

export const As = new Proxy(
  {},
  {
    get(_, element: DOMElements) {
      return createAsComponent(element);
    },
  }
) as {
  [Tag in DOMElements]: AsComponent<Tag, HTMLAsProps<Tag>>;
};
