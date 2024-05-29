import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";

import type { RouterOutputs } from "@acme/api";

import { PostList } from "../../../src/app/_components/posts";

vi.mock("@formkit/auto-animate/react", () => ({
  useAutoAnimate: () => [vi.fn()],
}));

vi.mock("react", () => ({
  use: vi.fn(),
  forwardRef: vi.fn(),
}));

vi.mock("@acme/ui/button", () => ({
  Button: vi.fn(),
}));

vi.mock("@acme/ui/input", () => ({
  Input: vi.fn(),
}));

vi.mock("@acme/ui/toast", () => ({
  toast: vi.fn(),
}));

vi.mock("@acme/ui/form", () => ({
  Form: vi.fn(),
  FormControl: vi.fn(),
  FormField: vi.fn(),
  FormItem: vi.fn(),
  FormMessage: vi.fn(),
  useForm: vi.fn(),
}));

vi.mock("@acme/ui/toast", () => ({
  toast: vi.fn(),
}));

vi.mock("~/trpc/react", () => ({
  api: {
    post: {
      all: {
        useQuery: vi.fn().mockReturnValue({
          data: [],
        }),
      },
    },
  },
}));

describe("posts component", () => {
  it("should render list", async () => {
    const getPosts = new Promise(function (resolve) {
      return resolve([
        {
          title: "title",
          id: 1,
          content: "content",
          createdAt: new Date(),
          updatedAt: null,
        },
      ]);
    });
    const posts = await getPosts;
    render(<PostList posts={posts as Promise<RouterOutputs["post"]["all"]>} />);
  });
});
