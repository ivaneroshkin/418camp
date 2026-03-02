import { Router, Request, Response } from 'express';
import * as controller from './controller.js';
import { validateRequest } from './middleware/validateRequest.js';
import { asyncHandler } from './middleware/errorHandler.js';
import { moveSchema } from './validation.js';

const router = Router();

router.get('/getField', (_req: Request, res: Response): void => {
  res.status(200).json(controller.getField());
});

router.post(
  '/move',
  validateRequest(moveSchema),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { y, x } = req.body;
    const fieldBefore = controller.getField();

    if (fieldBefore[y][x] !== 0) {
      res.status(400).json({ error: 'Cell blocked' });
      return;
    }

    controller.makeMove(y, x);
    const fieldAfter = controller.getField();
    const result = controller.checkMoveResult(fieldAfter);

    if (result !== true) {
      controller.switchPlayer();
    }

    res.status(200).json({ message: 'OK', field: fieldAfter });
  })
);

router.get('/winner', (_req: Request, res: Response): void => {
  const result = controller.checkMoveResult(controller.getField());

  if (result === 'deadHeat') {
    res.status(200).json({ result: 'deadHeat' });
    return;
  }

  if (result) {
    res.status(200).json({ winner: controller.getPlayer() });
  } else {
    res.status(200).json({ winner: null });
  }
});

router.post('/reset', (_req: Request, res: Response): void => {
  controller.reset();
  res.status(200).json({ message: 'OK' });
});

export default router;
