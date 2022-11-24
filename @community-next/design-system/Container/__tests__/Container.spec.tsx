import React from "react";
import { render, screen } from "@testing-library/react";
import { Container } from "../Container";

describe("Container", () => {
  test("can render a div with container class", () => {
    render(<Container id="test1">Hello world</Container>);

    const el = screen.getByText("Hello world");
    expect(el).toHaveClass("container");
    expect(el).toHaveClass("mx-auto");
  });
});
