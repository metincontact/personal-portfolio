import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTypewriter } from "./useTypewriter";

const WORDS = ["ab", "cd"];

describe("useTypewriter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts with an empty string", () => {
    const { result } = renderHook(() => useTypewriter(WORDS, 10, 100));
    expect(result.current).toBe("");
  });

  it("types the first word character by character", () => {
    const { result } = renderHook(() => useTypewriter(WORDS, 10, 100));

    act(() => vi.advanceTimersByTime(10));
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(10));
    expect(result.current).toBe("ab");
  });

  it("moves to the next word after the pause", () => {
    const { result } = renderHook(() => useTypewriter(WORDS, 10, 100));

    act(() => vi.advanceTimersByTime(20));
    expect(result.current).toBe("ab");

    act(() => vi.advanceTimersByTime(100));
    act(() => vi.advanceTimersByTime(20));
    expect(result.current).toBe("cd");
  });

  it("wraps around to the first word after the last one", () => {
    const { result } = renderHook(() => useTypewriter(WORDS, 10, 100));

    act(() => vi.advanceTimersByTime(20)); // "ab"
    act(() => vi.advanceTimersByTime(100)); // pause
    act(() => vi.advanceTimersByTime(20)); // "cd"
    act(() => vi.advanceTimersByTime(100)); // pause
    act(() => vi.advanceTimersByTime(20)); // back to "ab"
    expect(result.current).toBe("ab");
  });

  it("returns an empty string for an empty word list", () => {
    const { result } = renderHook(() => useTypewriter([], 10, 100));

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current).toBe("");
  });

  it("clears all timers on unmount, including the pause timeout", () => {
    const { unmount } = renderHook(() => useTypewriter(WORDS, 10, 100));

    // finish typing the first word so the pause timeout is pending
    act(() => vi.advanceTimersByTime(20));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
