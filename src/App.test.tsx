import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders all main sections", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /Hi, I'm Matin Mammadli/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "About Me" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Projects" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Contact" }),
    ).toBeInTheDocument();
  });

  it("defaults to light mode and toggles dark mode", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    await user.click(
      screen.getByRole("button", { name: "Toggle dark mode" }),
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("restores dark mode from localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(<App />);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
