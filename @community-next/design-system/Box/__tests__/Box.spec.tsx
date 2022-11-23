import React from "react";
import { render, screen } from "@testing-library/react";
import { Box } from "../Box";
describe("Box", () => {
  test("can render a div", () => {
    const { container } = render(<Box id="test1">Hello world</Box>);

    const el = container.querySelector("#test1");
    expect(el).toContainHTML("Hello world");
    expect(el?.tagName).toBe("DIV");
  });

  test("can render a link by as", () => {
    const { container } = render(
      <Box id="test1" as="a" href="/hello">
        Hello world
      </Box>
    );

    const el = container.querySelector("#test1");
    expect(el).toContainHTML("Hello world");
    expect(el).toHaveAttribute("href", "/hello");
    expect(el?.tagName).toBe("A");
  });
});
