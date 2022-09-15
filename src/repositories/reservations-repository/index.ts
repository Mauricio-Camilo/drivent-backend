import { prisma } from './../../config';
import { CreateReservationData } from './../../services/reservations-service';

async function saveReservation(data: CreateReservationData) {
  await prisma.reservation.create({
    data,
  });
}

async function getReservationDataInDb(userId: number) {
  return await prisma.$queryRaw`
    SELECT "Session"."userId", reservations.ticket, reservations.accommodation, reservations."cardId"
    FROM "Session"
    JOIN reservations ON
    "Session"."userId" = reservations."userId"
    WHERE "Session"."userId" = ${userId}
    LIMIT 1
  `;
}

const reservationsRepository = {
  saveReservation,
  getReservationDataInDb,
};

export default reservationsRepository;
