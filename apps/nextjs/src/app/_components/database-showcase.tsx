import { Suspense } from "react";

import { api } from "~/trpc/server";
import { CreatePostForm, PostCardSkeleton, PostList } from "./posts";

export const DatabaseShowcase = () => {
  const posts = api.post.all();
  return (
    <>
      <h2 className="text-2xl font-semibold">Database Showcase</h2>
      <CreatePostForm />
      <div className="w-full max-w-2xl overflow-y-scroll">
        <Suspense
          fallback={
            <div className="flex w-full flex-col gap-4">
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </div>
          }
        >
          <PostList posts={posts} />
        </Suspense>
      </div>
    </>
  );
};
