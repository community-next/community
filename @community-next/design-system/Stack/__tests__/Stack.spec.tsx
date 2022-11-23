import React from "react";
import { render, screen } from "@testing-library/react";
import { Stack } from "../Stack";
describe("Stack", () => {
  test("can render a div with flex", () => {
    render(<Stack id="test1">Hello world</Stack>);

    const el = screen.getByText("Hello world");
    expect(el).toHaveClass("gap-2");
    expect(el).toHaveClass("flex");
    expect(el).toHaveClass("flex-col");
  });

  test("can set direction", () => {
    const { container } = render(
      <Stack id="test1" direction="column-reverse">
        Hello world
      </Stack>
    );

    const el = screen.getByText("Hello world");
    expect(el).toHaveClass("flex-col-reverse");
  });

  test("can set space", () => {
    const { container } = render(
      <Stack id="test1" space={4}>
        Hello world
      </Stack>
    );

    const el = screen.getByText("Hello world");
    expect(el).toHaveClass("gap-4");
  });
});
