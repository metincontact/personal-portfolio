import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Projects from "./Projects";

describe("Projects", () => {
  it("renders all projects by default", () => {
    render(<Projects />);

    expect(screen.getByText("E-Commerce Website")).toBeInTheDocument();
    expect(screen.getByText("Chatbot")).toBeInTheDocument();
    expect(screen.getByText("Job Tracker")).toBeInTheDocument();
    expect(screen.getByText("GitHub Explorer")).toBeInTheDocument();
    expect(screen.getByText("Weather Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Crypto Tracker")).toBeInTheDocument();
  });

  it("filters projects by tag", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByRole("button", { name: "Supabase" }));

    expect(screen.getByText("Job Tracker")).toBeInTheDocument();
    expect(screen.queryByText("Chatbot")).not.toBeInTheDocument();
    expect(screen.queryByText("E-Commerce Website")).not.toBeInTheDocument();
  });

  it("shows all projects again when All is selected", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByRole("button", { name: "TypeScript" }));
    expect(screen.queryByText("E-Commerce Website")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText("E-Commerce Website")).toBeInTheDocument();
    expect(screen.getByText("Chatbot")).toBeInTheDocument();
  });

  it("shows a fallback when a project image fails to load", () => {
    render(<Projects />);

    const image = screen.getByAltText("E-Commerce Website");
    fireEvent.error(image);

    expect(screen.getByText("No Preview")).toBeInTheDocument();
    expect(screen.queryByAltText("E-Commerce Website")).not.toBeInTheDocument();
  });

  it("opens the case study modal and closes it with Escape", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(
      screen.getByRole("button", { name: "Case Study: E-Commerce Website" }),
    );

    const dialog = screen.getByRole("dialog", { name: "E-Commerce Website" });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Why I built it")).toBeInTheDocument();
    expect(screen.getByText("What I learned")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "E-Commerce Website" }),
      ).not.toBeInTheDocument(),
    );
  });
});
