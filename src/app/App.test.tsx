import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("verifica se o login esta sendo renderizado", () => {
  render(<App />);
  const linkElement = screen.getByText(/SIGN IN/i);
  expect(linkElement).toBeInTheDocument();
});
