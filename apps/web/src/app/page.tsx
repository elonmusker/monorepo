import { Button, Card, CardHeader, CardTitle, CardContent } from "@monorepo/ui";
import { MAX_RATING, MIN_RATING } from "@monorepo/shared";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Monorepo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">
            A full-stack TypeScript monorepo with shared packages.
          </p>
          <p className="mb-4 text-sm text-gray-500">
            Review ratings: {MIN_RATING} - {MAX_RATING}
          </p>
          <Button variant="primary" size="md">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
