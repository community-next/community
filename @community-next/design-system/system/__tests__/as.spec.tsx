import React from "react";
import { render, screen } from "@testing-library/react";

import { createAsComponent, As } from "../as";

describe("createAsComponent", () => {
  const Div = createAsComponent("div");
  test("can render a div", () => {
    const { container } = render(<Div id="test1">Hello world</Div>);

    const el = container.querySelector("#test1");
    expect(el).toContainHTML("Hello world");
    expect(el?.tagName).toBe("DIV");
  });

  test("can render a span by as", () => {
    const { container } = render(
      <Div id="test1" as="span">
        Hello world
      </Div>
    );

    const el = container.querySelector("#test1");
    expect(el).toContainHTML("Hello world");
    expect(el?.tagName).toBe("SPAN");
  });

  test("can render a link by as", () => {
    const { container } = render(
      <Div id="test1" as="a" href="/hello">
        Hello world
      </Div>
    );

    const el = container.querySelector("#test1");
    expect(el).toContainHTML("Hello world");
    expect(el).toHaveAttribute("href", "/hello");
    expect(el?.tagName).toBe("A");
  });
});

describe("as", () => {
  test("can render a div", () => {
    const { container } = render(<As.div id="test1">Hello world</As.div>);

    const el = container.querySelector("#test1");
    expect(el).toContainHTML("Hello world");
    expect(el?.tagName).toBe("DIV");
  });

  test("can render a link by as", () => {
    const { container } = render(
      <As.div id="test1" as="a" href="/hello">
        Hello world
      </As.div>
    );

    const el = container.querySelector("#test1");
    expect(el).toContainHTML("Hello world");
    expect(el).toHaveAttribute("href", "/hello");
    expect(el?.tagName).toBe("A");
  });
});
