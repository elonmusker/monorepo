import type { Metadata } from 'next';
import React from 'react';
import { Card, Badge } from '@repo/ui';

export const metadata: Metadata = {
  title: 'Blog',
};

async function getPosts() {
  const apiUrl = process.env.API_URL || 'http://localhost:3001';
  try {
    const res = await fetch(`${apiUrl}/api/posts?published=true`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts published yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map(
            (post: { id: string; title: string; content: string | null; created_at: string }) => (
              <Card key={post.id} title={post.title}>
                <Badge variant="success" className="mb-3">
                  Published
                </Badge>
                {post.content && (
                  <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
                )}
                <p className="text-xs text-gray-400 mt-4">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}
