import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GitHubActivity from "./GitHubActivity";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

const SAMPLE_REPOS = [
  {
    id: 1,
    name: "crypto-tracker",
    html_url: "https://github.com/metincontact/crypto-tracker",
    description: "Real-time crypto tracker",
    language: "TypeScript",
    stargazers_count: 4,
    pushed_at: "2026-06-01T10:00:00Z",
  },
  {
    id: 2,
    name: "chatbot",
    html_url: "https://github.com/metincontact/chatbot",
    description: null,
    language: "JavaScript",
    stargazers_count: 2,
    pushed_at: "2026-05-20T10:00:00Z",
  },
];

describe("GitHubActivity", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("renders repositories from the GitHub API", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => SAMPLE_REPOS,
    });
    render(<GitHubActivity />);

    expect(await screen.findByText("crypto-tracker")).toBeInTheDocument();
    expect(screen.getByText("chatbot")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/users/metincontact/repos?sort=pushed&per_page=6",
    );
  });

  it("shows a profile fallback link when the API fails", async () => {
    fetchMock.mockResolvedValue({ ok: false });
    render(<GitHubActivity />);

    expect(
      await screen.findByText(/Couldn't load repositories/),
    ).toBeInTheDocument();
  });

  it("shows a fallback when the request throws", async () => {
    fetchMock.mockRejectedValue(new Error("offline"));
    render(<GitHubActivity />);

    expect(
      await screen.findByText(/Couldn't load repositories/),
    ).toBeInTheDocument();
  });
});
