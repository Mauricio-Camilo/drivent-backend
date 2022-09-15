import { Request, Response } from 'express';
import httpStatus from 'http-status';
import cardsService from '@/services/cards-service';

export async function createCards(req: Request, res: Response) {
  const cardId = await cardsService.createCard(req.body);
  res.status(httpStatus.CREATED).send(cardId.toString());
}
