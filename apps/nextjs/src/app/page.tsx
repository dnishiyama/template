import { AuthShowcase } from "~/app/_components/auth-showcase";
import { DatabaseShowcase } from "~/app/_components/database-showcase";
import { GroovyWalker } from "~/app/_components/groovy-walker";
import { StoreShowcase } from "~/app/_components/store-showcase";

export default async function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below

  return (
    <main className="container min-h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create Mountain <span className="text-primary">Dev</span>
        </h1>
        <GroovyWalker />
        <AuthShowcase />
        <StoreShowcase />
        <DatabaseShowcase />
      </div>
    </main>
  );
}
