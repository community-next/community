import React from "react";
import { createStyledComponent } from "./styled-system";
import { StyledComponent, DOMElements, HTMLStyledProps } from "./types";

const cache = new Map<DOMElements, StyledComponent<DOMElements>>();
export const styled = new Proxy(
  {},
  {
    get(_, element: DOMElements) {
      if (!cache.has(element)) {
        cache.set(element, createStyledComponent(element));
      }
      return cache.get(element);
    },
  }
) as {
  [Tag in DOMElements]: StyledComponent<Tag, HTMLStyledProps<Tag>>;
};
