import reservationsRepository from '@/repositories/reservations-repository';
import cardsRepository from '@/repositories/cards-repository';
import { Reservation } from '@prisma/client';
import { notFoundError } from '@/errors';

export type CreateReservationData = Omit<Reservation, 'id' | 'createdAt'>;

async function saveReservation(reservation: CreateReservationData) {
  await validateCreditCardId(reservation.cardId);
  await reservationsRepository.saveReservation(reservation);
}

async function validateCreditCardId(cardId: number) {
  const checkCard = await cardsRepository.findCardById(cardId);
  if (!checkCard) throw notFoundError();
}

const reservationsService = {
  saveReservation,
};

export default reservationsService;
