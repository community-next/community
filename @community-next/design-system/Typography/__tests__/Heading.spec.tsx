import React from "react";
import { render, screen } from "@testing-library/react";
import { Heading } from "../Heading";
describe("Heading", () => {
  test.each(["h1", "h2", "h3"])("can render heading %s", (heading) => {
    const props = { as: heading } as { as: "h1" | "h2" | "h3" };
    const classNames: Record<string, string> = {
      h1: "text-5xl",
      h2: "text-4xl",
      h3: "text-2xl",
    };
    render(
      <Heading id="test1" {...props}>
        Hello world
      </Heading>
    );

    const el = screen.getByText("Hello world");
    expect(el).toHaveClass(classNames[heading]);
  });
});
