import React from "react";
import { render, screen } from "@testing-library/react";
import { Center } from "../Center";
describe("Center", () => {
  test("can render a div with Center", () => {
    render(<Center id="test1">Hello world</Center>);

    const el = screen.getByText("Hello world");
    expect(el).toHaveClass("items-center");
    expect(el).toHaveClass("justify-center");
  });
});
