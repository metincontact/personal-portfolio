import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "./Contact";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

async function fillAndSubmit() {
  const user = userEvent.setup();
  await user.type(screen.getByPlaceholderText("Your Name"), "Jane");
  await user.type(screen.getByPlaceholderText("Your Email"), "jane@test.com");
  await user.type(screen.getByPlaceholderText("Your Message"), "Hello!");
  await user.click(screen.getByRole("button", { name: "Send Message" }));
}

describe("Contact form", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("submits the form and shows a success message", async () => {
    fetchMock.mockResolvedValue({ ok: true });
    render(<Contact />);

    await fillAndSubmit();

    expect(await screen.findByText(/Message sent/)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://formspree.io/f/mlgzkvva",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "Jane",
          email: "jane@test.com",
          message: "Hello!",
        }),
      }),
    );
  });

  it("clears the form after a successful submit", async () => {
    fetchMock.mockResolvedValue({ ok: true });
    render(<Contact />);

    await fillAndSubmit();
    await screen.findByText(/Message sent/);

    expect(screen.getByPlaceholderText("Your Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Your Email")).toHaveValue("");
    expect(screen.getByPlaceholderText("Your Message")).toHaveValue("");
  });

  it("shows an error message when the server rejects the request", async () => {
    fetchMock.mockResolvedValue({ ok: false });
    render(<Contact />);

    await fillAndSubmit();

    expect(
      await screen.findByText(/Something went wrong/),
    ).toBeInTheDocument();
  });

  it("shows an error message when the request throws", async () => {
    fetchMock.mockRejectedValue(new Error("network down"));
    render(<Contact />);

    await fillAndSubmit();

    expect(
      await screen.findByText(/Something went wrong/),
    ).toBeInTheDocument();
  });

  it("keeps the entered values after a failed submit", async () => {
    fetchMock.mockResolvedValue({ ok: false });
    render(<Contact />);

    await fillAndSubmit();
    await screen.findByText(/Something went wrong/);

    expect(screen.getByPlaceholderText("Your Name")).toHaveValue("Jane");
    expect(screen.getByPlaceholderText("Your Message")).toHaveValue("Hello!");
  });
});
