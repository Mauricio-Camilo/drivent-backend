import { saveReservation, getReservationData } from '@/controllers/reservations-controller';
import { validateBody } from '@/middlewares';
import { createReservationSchema } from '@/schemas/reservation-schemas';
import { Router } from 'express';

const reservationsRouter = Router();

reservationsRouter.post('/', validateBody(createReservationSchema), saveReservation);
reservationsRouter.get('/:userId', getReservationData);

export { reservationsRouter, getReservationData };
