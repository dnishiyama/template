import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmailForm } from "../../../src/app/_components/email-form";

describe("email form component", () => {
  it("should render class", async () => {
    render(<EmailForm signInEmail={async () => {}} />);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
