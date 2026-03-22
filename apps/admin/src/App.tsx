import { Button, Card, CardHeader, CardTitle, CardContent } from "@monorepo/ui";
import { DEFAULT_PAGE_SIZE } from "@monorepo/shared";

export function App() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Admin Dashboard
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Reviews Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ marginBottom: "1rem", color: "#666" }}>
            Manage user reviews and ratings. Default page size: {DEFAULT_PAGE_SIZE}
          </p>
          <Button variant="primary" size="md">
            View All Reviews
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
