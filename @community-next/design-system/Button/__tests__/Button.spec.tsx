import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "../Button";
describe("Button", () => {
  test("can render a button", () => {
    const { container } = render(<Button id="test1">Hello world</Button>);

    const el = container.querySelector("#test1");
    expect(el).toContainHTML("Hello world");
    expect(el?.tagName).toBe("BUTTON");
  });

  test("can render a link by as", () => {
    const { container } = render(
      <Button id="test1" as="a" href="/hello">
        Hello world
      </Button>
    );

    const el = container.querySelector("#test1");
    expect(el).toContainHTML("Hello world");
    expect(el).toHaveAttribute("href", "/hello");
    expect(el?.tagName).toBe("A");
  });

  test("render a small size button", () => {
    const { container } = render(
      <Button id="test1" size="sm">
        Hello world
      </Button>
    );

    const el = screen.getByText("Hello world");
    expect(el).toHaveClass("py-1");
  });

  test("render a large size button", () => {
    const { container } = render(
      <Button id="test1" size="lg">
        Hello world
      </Button>
    );

    const el = screen.getByText("Hello world");
    expect(el).toHaveClass("py-3");
  });
});
