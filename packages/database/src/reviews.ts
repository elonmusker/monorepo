import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, InsertDto } from "./types";

/**
 * Get all reviews for a specific target.
 * RLS policy: reviews are publicly readable.
 */
export async function getReviewsByTarget(
  client: SupabaseClient<Database>,
  targetId: string
) {
  const { data, error } = await client
    .from("reviews")
    .select("*")
    .eq("target_id", targetId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

/**
 * Get all reviews authored by a specific user.
 * RLS policy: users can read their own reviews.
 */
export async function getReviewsByUser(
  client: SupabaseClient<Database>,
  userId: string
) {
  const { data, error } = await client
    .from("reviews")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

/**
 * Create a new review.
 * RLS policy: authenticated users can insert reviews where user_id = auth.uid().
 */
export async function createReview(
  client: SupabaseClient<Database>,
  review: InsertDto<"reviews">
) {
  const { data, error } = await client
    .from("reviews")
    .insert(review as never)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Get the average rating for a target.
 */
export async function getAverageRating(
  client: SupabaseClient<Database>,
  targetId: string
): Promise<number | null> {
  const { data, error } = await client
    .from("reviews")
    .select("rating")
    .eq("target_id", targetId);
  if (error) throw error;
  if (!data || data.length === 0) return null;
  const sum = data.reduce(
    (acc: number, r: { rating: number }) => acc + r.rating,
    0
  );
  return sum / data.length;
}
