import React from "react";
import { render, screen } from "@testing-library/react";

import { createStyledComponent } from "../styled-system";
import { styled } from "../styled";

describe("createStyledComponent", () => {
  const Div = createStyledComponent("div");
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
    const { container } = render(
      <styled.div id="test1">Hello world</styled.div>
    );

    const el = container.querySelector("#test1");
    expect(el).toContainHTML("Hello world");
    expect(el?.tagName).toBe("DIV");
  });

  test("can render a link by as", () => {
    const { container } = render(
      <styled.div id="test1" as="a" href="/hello">
        Hello world
      </styled.div>
    );

    const el = container.querySelector("#test1");
    expect(el).toContainHTML("Hello world");
    expect(el).toHaveAttribute("href", "/hello");
    expect(el?.tagName).toBe("A");
  });
});
