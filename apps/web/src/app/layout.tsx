import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monorepo Web App",
  description: "Full-stack monorepo web application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
