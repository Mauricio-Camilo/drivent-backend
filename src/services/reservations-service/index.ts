import reservationsRepository from '@/repositories/reservations-repository';
import cardsRepository from '@/repositories/cards-repository';
import { Ticket, Reservation } from '@prisma/client';
import { notFoundError } from '@/errors';

export type CreateTicketData = Omit<Ticket, 'id' | 'createdAt'>;
export type CreateReservationData = Omit<Reservation, 'id' | 'createdAt'>;

async function saveTicket(ticket: CreateTicketData) {
  const response = await reservationsRepository.saveTicket(ticket);
  return response
}

async function saveReservation(reservation: CreateReservationData){
  await validateTicketId(reservation.ticketId);
  await validateCreditCardId(reservation.cardId);
  await reservationsRepository.saveReservation(reservation);
}

async function validateTicketId(ticketId: number) {
  const checkTicket = await reservationsRepository.findTicketById(ticketId);
  if (!checkTicket) throw notFoundError();
}

async function validateCreditCardId(cardId: number) {
  const checkCard = await cardsRepository.findCardById(cardId);
  if (!checkCard) throw notFoundError();
}

const reservationsService = {
  saveTicket,
  saveReservation,
};

export default reservationsService;
