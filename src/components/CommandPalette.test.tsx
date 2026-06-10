import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommandPalette from "./CommandPalette";

const defaultProps = {
  onClose: vi.fn(),
  dark: false,
  setDark: vi.fn(),
};

describe("CommandPalette", () => {
  it("lists section commands by default", () => {
    render(<CommandPalette {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: /About/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Dark theme/ }),
    ).toBeInTheDocument();
  });

  it("filters commands by query", async () => {
    const user = userEvent.setup();
    render(<CommandPalette {...defaultProps} />);

    await user.type(screen.getByRole("textbox"), "theme");

    expect(
      screen.getByRole("button", { name: /Dark theme/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /LinkedIn/ }),
    ).not.toBeInTheDocument();
  });

  it("runs the selected command with Enter", async () => {
    const user = userEvent.setup();
    const setDark = vi.fn();
    const onClose = vi.fn();
    render(
      <CommandPalette {...defaultProps} setDark={setDark} onClose={onClose} />,
    );

    await user.type(screen.getByRole("textbox"), "theme");
    await user.keyboard("{Enter}");

    expect(setDark).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalled();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<CommandPalette {...defaultProps} onClose={onClose} />);

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalled();
  });

  it("navigates to a section command and scrolls to it", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const section = document.createElement("section");
    section.id = "projects";
    document.body.appendChild(section);

    render(<CommandPalette {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: /Projects/ }));

    expect(section.scrollIntoView).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
    section.remove();
  });
});
