import { Router, Request, Response, NextFunction } from 'express';
import { PostsRepository, getSupabaseClient } from '@repo/db';

const router = Router();

function getPostsRepo(): PostsRepository {
  return new PostsRepository(getSupabaseClient());
}

// GET /api/posts
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const published =
      req.query.published !== undefined ? req.query.published === 'true' : undefined;
    const authorId = req.query.author_id as string | undefined;
    const posts = await getPostsRepo().findAll({ published, authorId });
    res.json({ data: posts, count: posts.length });
  } catch (error) {
    next(error);
  }
});

// GET /api/posts/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await getPostsRepo().findById(String(req.params.id));
    if (!post) {
      res.status(404).json({ error: { message: 'Post not found', status: 404 } });
      return;
    }
    res.json({ data: post });
  } catch (error) {
    next(error);
  }
});

// POST /api/posts
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await getPostsRepo().create(req.body);
    res.status(201).json({ data: post });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/posts/:id
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await getPostsRepo().update(String(req.params.id), req.body);
    res.json({ data: post });
  } catch (error) {
    next(error);
  }
});

// POST /api/posts/:id/publish
router.post('/:id/publish', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await getPostsRepo().publish(String(req.params.id));
    res.json({ data: post });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getPostsRepo().delete(String(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as postsRouter };
