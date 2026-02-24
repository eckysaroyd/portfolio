import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 text-center px-4">
      <div className="space-y-2">
        <h1 className="text-8xl font-black text-primary">404</h1>
        <p className="text-2xl font-semibold text-foreground">Page not found</p>
        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/">Back to Home</Link>
      </Button>
    </main>
  );
}
