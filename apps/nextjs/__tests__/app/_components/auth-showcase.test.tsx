import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AuthShowcase } from "../../../src/app/_components/auth-showcase";

describe("auth-showcase component", () => {
  it("should render sign in text", async () => {
    render(await AuthShowcase());
    expect(screen.getByText(/Sign in with Discord/i)).toBeInTheDocument();
  });
});
