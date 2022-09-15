import { Router } from 'express';

import { createCardSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { createCards } from '@/controllers';

const cardsRouter = Router();

cardsRouter.post('/', validateBody(createCardSchema), createCards);

export { cardsRouter };
