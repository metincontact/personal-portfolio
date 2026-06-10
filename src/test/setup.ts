import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

// default network stub so components never hit the real network in tests;
// individual test files override this with their own mocks
vi.stubGlobal(
  "fetch",
  vi.fn(() => Promise.resolve({ ok: false, json: async () => ({}) })),
);

// jsdom does not implement matchMedia (used for the prefers-color-scheme fallback)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// jsdom does not implement scrollIntoView (used by the command palette)
Element.prototype.scrollIntoView = vi.fn();

// jsdom does not implement IntersectionObserver (used by framer-motion whileInView)
class IntersectionObserverMock {
  root = null;
  rootMargin = "";
  thresholds: number[] = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = (): IntersectionObserverEntry[] => [];
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverMock,
});
globalThis.IntersectionObserver =
  IntersectionObserverMock as unknown as typeof IntersectionObserver;
