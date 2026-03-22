export { getSupabaseClient, getSupabaseServiceClient } from "./client";
export type { Database, Tables, InsertDto, UpdateDto } from "./types";
export { findMany, findById, create, update, remove } from "./crud";
export {
  getReviewsByTarget,
  getReviewsByUser,
  createReview,
  getAverageRating,
} from "./reviews";
