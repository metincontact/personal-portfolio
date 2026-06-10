import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

const defaultProps = {
  scrolled: false,
  progress: 0,
  activeSection: "",
  dark: false,
  setDark: vi.fn(),
  onOpenPalette: vi.fn(),
};

describe("Navbar", () => {
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

  it("calls setDark when the theme button is clicked", async () => {
    const user = userEvent.setup();
    const setDark = vi.fn();
    render(<Navbar {...defaultProps} setDark={setDark} />);

    await user.click(
      screen.getByRole("button", { name: "Toggle dark mode" }),
    );

    expect(setDark).toHaveBeenCalledTimes(1);
  });

  it("opens the command palette from the nav button", async () => {
    const user = userEvent.setup();
    const onOpenPalette = vi.fn();
    render(<Navbar {...defaultProps} onOpenPalette={onOpenPalette} />);

    await user.click(
      screen.getByRole("button", { name: "Open command palette" }),
    );

    expect(onOpenPalette).toHaveBeenCalledTimes(1);
  });
});
