import { Request, Response } from 'express';
import httpStatus from 'http-status';
import reservationsService from '@/services/reservations-service';

export async function saveTicket(req: Request, res: Response) {
  const response = await reservationsService.saveTicket(req.body);
  res.status(httpStatus.CREATED).send(response);
}

export async function saveReservation(req: Request, res: Response) {
  const { ticketId, cardId } = req.params;
  await reservationsService.saveReservation({cardId: parseInt(cardId), ticketId: parseInt(ticketId)});
  res.sendStatus(httpStatus.CREATED);
}
