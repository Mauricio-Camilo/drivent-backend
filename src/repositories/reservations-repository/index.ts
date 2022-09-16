import { prisma } from './../../config';
import { CreateTicketData } from './../../services/reservations-service';

async function saveTicket(data: CreateTicketData) {
  const reservation = await prisma.ticket.create({
    data,
  });
  return reservation;
}

async function findTicketById(id: number) {
  const checkCard = await prisma.ticket.findFirst({ where: { id } });
  return checkCard;
}

async function saveReservation(data: any) {
  await prisma.reservation.create({
    data,
  })
}

const reservationsRepository = {
  saveTicket,
  findTicketById,
  saveReservation,
};

export default reservationsRepository;
