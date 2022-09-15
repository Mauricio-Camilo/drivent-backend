import { Request, Response } from 'express';
import httpStatus from 'http-status';
import reservationsRepository from '@/repositories/reservations-repository';
import reservationsService from '@/services/reservations-service';

export async function saveReservation(req: Request, res: Response) {
  await reservationsService.saveReservation(req.body);
  res.sendStatus(httpStatus.CREATED);
}

export async function getReservationData(req: Request, res: Response) {
  const { userId } = req.params;
  const response = await reservationsRepository.getReservationDataInDb(Number(userId));
  res.status(200).send(response);
}
