import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

const defaultProps = {
  scrolled: false,
  progress: 0,
  activeSection: "",
};

describe("Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders all navigation links", () => {
    render(<Navbar {...defaultProps} />);

    for (const label of ["About", "Skills", "Projects", "Contact"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("highlights the active section link", () => {
    render(<Navbar {...defaultProps} activeSection="skills" />);

    expect(screen.getByRole("link", { name: "Skills" })).toHaveClass(
      "text-lime-600",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveClass(
      "text-zinc-500",
    );
  });

  it("toggles dark mode and persists it", async () => {
    const user = userEvent.setup();
    render(<Navbar {...defaultProps} />);

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    await user.click(
      screen.getByRole("button", { name: "Toggle dark mode" }),
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
