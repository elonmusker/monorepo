import { Router, type Router as RouterType } from "express";
import {
  getSupabaseServiceClient,
  getReviewsByTarget,
  getAverageRating,
  createReview,
} from "@monorepo/database";
import { isValidRating, MAX_COMMENT_LENGTH } from "@monorepo/shared";

export const reviewsRouter: RouterType = Router();

reviewsRouter.get("/target/:targetId", async (req, res) => {
  try {
    const client = getSupabaseServiceClient();
    const reviews = await getReviewsByTarget(client, req.params.targetId);
    const avgRating = await getAverageRating(client, req.params.targetId);
    res.json({ success: true, data: { reviews, averageRating: avgRating } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ success: false, error: message });
  }
});

reviewsRouter.post("/", async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const userId = typeof body.userId === "string" ? body.userId : undefined;
    const targetId = typeof body.targetId === "string" ? body.targetId : undefined;
    const rating = typeof body.rating === "number" ? body.rating : undefined;
    const comment = typeof body.comment === "string" ? body.comment : undefined;

    if (!userId || !targetId || rating === undefined) {
      res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
      return;
    }

    if (!isValidRating(rating)) {
      res
        .status(400)
        .json({ success: false, error: "Rating must be an integer between 1 and 5" });
      return;
    }

    if (comment && comment.length > MAX_COMMENT_LENGTH) {
      res.status(400).json({
        success: false,
        error: `Comment must be at most ${MAX_COMMENT_LENGTH} characters`,
      });
      return;
    }

    const client = getSupabaseServiceClient();
    const review = await createReview(client, {
      user_id: userId,
      target_id: targetId,
      rating,
      comment: comment ?? null,
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ success: false, error: message });
  }
});
