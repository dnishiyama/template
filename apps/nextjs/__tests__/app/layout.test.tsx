import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import RootLayout from "../../src/app/layout";

vi.mock("geist/font/mono", () => ({
  GeistMono: {
    variable: vi.fn(),
  },
}));

vi.mock("geist/font/sans", () => ({
  GeistSans: {
    variable: vi.fn(),
  },
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
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

describe("layout app router", () => {
  it("should render layout", async () => {
    const { container } = render(
      <RootLayout>
        <div />
      </RootLayout>,
    );
    expect(container.querySelector("body")).toHaveClass(
      "min-h-screen bg-background font-sans text-foreground antialiased",
    );
  });
});
