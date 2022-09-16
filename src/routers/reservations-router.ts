import { saveTicket, saveReservation } from '@/controllers/reservations-controller';
import { validateBody } from '@/middlewares';
import { createReservationSchema } from '@/schemas/reservation-schemas';
import { Router } from 'express';

const reservationsRouter = Router();

reservationsRouter.post('/', validateBody(createReservationSchema), saveTicket);
reservationsRouter.post('/:cardId/:ticketId', saveReservation);

export { reservationsRouter };
