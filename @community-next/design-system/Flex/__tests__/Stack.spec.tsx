import React from "react";
import { render, screen } from "@testing-library/react";
import { Flex } from "../Flex";
describe("Flex", () => {
  test("can render a div with flex", () => {
    render(<Flex id="test1">Hello world</Flex>);

    const el = screen.getByText("Hello world");
    expect(el).toHaveClass("flex");
  });

  test("can set direction", () => {
    render(
      <Flex id="test1" direction="column-reverse">
        Hello world
      </Flex>
    );

    const el = screen.getByText("Hello world");
    expect(el).toHaveClass("flex-col-reverse");
  });
});
