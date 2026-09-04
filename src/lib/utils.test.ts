import { describe, expect, it, vi } from "vitest";
import { cn, prefersReducedMotion } from "./utils";

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm", false && "hidden", "font-bold")).toBe("text-sm font-bold");
  });
});

describe("prefersReducedMotion", () => {
  it("returns false when the media query does not match", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({ media: query, matches: false }));
    expect(prefersReducedMotion()).toBe(false);
  });

  it("returns true when the user prefers reduced motion", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({ media: query, matches: true }));
    expect(prefersReducedMotion()).toBe(true);
  });
});
