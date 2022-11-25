import { createStyledComponent } from "./styled-system";
import { StyledComponent, DOMElements, HTMLStyledProps } from "./types";

export const styled = new Proxy(
  {},
  {
    get(_, element: DOMElements) {
      return createStyledComponent(element);
    },
  }
) as {
  [Tag in DOMElements]: StyledComponent<Tag, HTMLStyledProps<Tag>>;
};
