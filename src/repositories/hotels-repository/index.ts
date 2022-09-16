/* eslint-disable no-console */
import { prisma } from './../../config';

async function getAllHotels() {
  return await prisma.hotel.findMany();
}

async function getHotelIdByName(hotel: string) {
  const response = await prisma.hotel.findFirst({
    where: { name: hotel },
  })
  return response.id;
}

async function getRoomId(hotelId: number, room: number){
  const response: any = await prisma.$queryRaw`
  SELECT * FROM rooms as r
  WHERE "number" = ${room} AND "hotelId" = ${hotelId}
  `;
  return response;
}

async function getRoomUsers(roomId: number){
  const usersQuantity : any = await prisma.$queryRaw`
  SELECT COUNT (v."roomId") FROM vacancies AS v
  WHERE "roomId" = ${roomId} and v."userId" IS NOT NULL;
  `;
  return usersQuantity[0].count;
}

async function getHotelVacancies(id: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vagas: any = await prisma.$queryRaw`SELECT COUNT(h.id)
  FROM vacancies as v
  JOIN rooms as r
  ON v."roomId" = r.id
  JOIN hotels as h
  ON r."hotelId" = h.id
  WHERE h.id=${id} and v."userId" IS NULL;
  `;
  return vagas[0].count;
}

async function getSelectedHotelRooms(name: string) {
  return await prisma.hotel.findMany({
    where: { name },
    select: {
      id: true,
      name: true,
      Rooms: {
        select: {
          id: true,
          number: true,
          isBlocked: true,
          Vacancy: { orderBy: { id: 'asc' }, select: { id: true, userId: true } },
        },
      },
    },
  });
}

async function fillRoomVacancy(userId: number, id: number) {
  const response = await prisma.vacancy.update({ where: { id }, data: { userId } });
  return response.id;
}

async function removeReservationIdAndUpdate(userId: number, id: number, removeId: number) {
  await prisma.$transaction(async (prisma) => {
    await prisma.vacancy.update({ where: { id: removeId }, data: { userId: null } });
    await prisma.vacancy.update({ where: { id }, data: { userId } });
  });
}

async function getVacanciesPerRoom(vacancyId: number) {
  const vacanciesPerRoom = await prisma.$transaction(async (prisma) => {
    const room_Id = await prisma.vacancy.findUnique({ where: { id: vacancyId } });
    const response = await prisma.vacancy.findMany({ where: { roomId: room_Id.roomId } });
    return response;
  });
  return vacanciesPerRoom;
}

type hotelReservationData = [{ type: string; number: number; name: string; id: number }];
async function getHotelReservation(userId: number) {
  const response: hotelReservationData = await prisma.$queryRaw`
    SELECT rooms.type, rooms.number, hotels.name, vacancies.id
    FROM vacancies
    JOIN rooms ON
    rooms.id = vacancies."roomId"
    JOIN hotels ON
    hotels.id = rooms."hotelId"
    WHERE vacancies."userId" = ${userId}
    LIMIT 1
  `;
  return response;
}

const hotelsRepository = {
  getAllHotels,
  getHotelIdByName,
  getRoomId,  
  getRoomUsers,
  getHotelVacancies,
  getSelectedHotelRooms,
  fillRoomVacancy,
  removeReservationIdAndUpdate,
  getVacanciesPerRoom,
  getHotelReservation,
};

export default hotelsRepository;
