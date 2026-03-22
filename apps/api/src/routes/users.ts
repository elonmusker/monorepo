import { Router, Request, Response, NextFunction } from 'express';
import { UsersRepository, getSupabaseClient } from '@repo/db';

const router = Router();

function getUsersRepo(): UsersRepository {
  return new UsersRepository(getSupabaseClient());
}

// GET /api/users
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsersRepo().findAll();
    res.json({ data: users, count: users.length });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUsersRepo().findById(String(req.params.id));
    if (!user) {
      res.status(404).json({ error: { message: 'User not found', status: 404 } });
      return;
    }
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

// POST /api/users
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUsersRepo().create(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/users/:id
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUsersRepo().update(String(req.params.id), req.body);
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getUsersRepo().delete(String(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as usersRouter };
