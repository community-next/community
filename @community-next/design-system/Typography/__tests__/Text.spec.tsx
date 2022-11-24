import React from "react";
import { render, screen } from "@testing-library/react";
import { Text } from "../Text";
import { TextSize } from "../../system";

describe("Text", () => {
  test.each(["xs", "sm", "lg", "xl"])("can set size with %s", (sizeProp) => {
    const props = { textSize: sizeProp } as { textSize: TextSize };
    render(
      <Text id="test1" {...props}>
        Hello world
      </Text>
    );

    const el = screen.getByText("Hello world");
    expect(el).toHaveClass("text-" + sizeProp);
  });
});
