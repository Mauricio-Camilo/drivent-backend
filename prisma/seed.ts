import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  // legacy code snippet
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  console.log({ event });

  // clean database
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE vacancies RESTART IDENTITY`,
    prisma.$executeRaw`TRUNCATE rooms RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE hotels RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE activities RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE auditoriums RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE eventdays RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE "User" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE "Session" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE "Enrollment" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE "Address" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE cards RESTART IDENTITY CASCADE`,
  ])

  // business rules variables
  const hotelsList = [
    {name: 'Driven Resort', type: 'Single, Double, Triple'},
    {name: 'Driven Palace', type: 'Single, Double'},
    {name: 'Driven World', type: 'Single'}
  ];

  const hotelsProps = [
    {name: 'Driven Resort', hotelId: 1, floors: 3, roomsPerFloor: 4, roomsTypesPerFloor: ['Double', 'Double', 'Single', 'Triple']},
    {name: 'Driven Palace', hotelId: 2, floors: 5, roomsPerFloor: 4, roomsTypesPerFloor: ['Single', 'Double', 'Single', 'Double']},
    {name: 'Driven World', hotelId: 3, floors: 8, roomsPerFloor: 2, roomsTypesPerFloor: ['Single', 'Single']}
  ];

  const eventDaysList = [
    {weekDay: 'Sexta', date: '21/10'},
    {weekDay: 'Sábado', date: '22/10'},
    {weekDay: 'Domingo', date: '23/10'},
  ];

  const auditoriumList = [
    {title: 'Auditório Principal', eventdayId: 1},
    {title: 'Auditório Lateral', eventdayId: 1},
    {title: 'Sala de Workshop', eventdayId: 1},
    {title: 'Auditório Principal', eventdayId: 2},
    {title: 'Auditório Lateral', eventdayId: 2},
    {title: 'Sala de Workshop', eventdayId: 2},
    {title: 'Auditório Principal', eventdayId: 3},
    {title: 'Auditório Lateral', eventdayId: 3},
    {title: 'Sala de Workshop', eventdayId: 3},
  ];

  const activitiesList = [
    {title: 'Abertura: eventos da sexta', startTime: '09:00', finishTime: '10:00', vacancies: 27, auditoriumId: 1},
    {title: 'Drivent: O evento', startTime: '10:00', finishTime: '12:00', vacancies: 4, auditoriumId: 1},
    {title: 'Palestra X Sexta', startTime: '09:00', finishTime: '12:00', vacancies: 15, auditoriumId: 2},
    {title: 'Palestra Y Sexta', startTime: '09:00', finishTime: '10:00', vacancies: 30, auditoriumId: 3},
    {title: 'Palestra Z Sexta', startTime: '09:00', finishTime: '11:00', vacancies: 30, auditoriumId: 3},
    {title: 'Abertura: eventos do sábado', startTime: '09:00', finishTime: '10:00', vacancies: 27, auditoriumId: 4},
    {title: 'Drivent: O evento', startTime: '10:00', finishTime: '12:00', vacancies: 4, auditoriumId: 4},
    {title: 'Palestra X Sabado', startTime: '09:00', finishTime: '12:00', vacancies: 15, auditoriumId: 5},
    {title: 'Palestra Y Sabado', startTime: '09:00', finishTime: '10:00', vacancies: 30, auditoriumId: 6},
    {title: 'Palestra Z Sabado', startTime: '10:00', finishTime: '11:00', vacancies: 30, auditoriumId: 6},
    {title: 'Abertura: eventos do domingo', startTime: '09:00', finishTime: '10:00', vacancies: 27, auditoriumId: 7},
    {title: 'Drivent: O evento Parte 1', startTime: '10:00', finishTime: '11:00', vacancies: 1, auditoriumId: 7},
    {title: 'Drivent: O evento Parte 2', startTime: '11:00', finishTime: '12:00', vacancies: 1, auditoriumId: 7},
    {title: 'Palestra X Domingo', startTime: '09:00', finishTime: '12:00', vacancies: 15, auditoriumId: 8},
    {title: 'Palestra Y Domingo', startTime: '09:00', finishTime: '10:00', vacancies: 30, auditoriumId: 9},
    {title: 'Palestra Z Domingo', startTime: '10:00', finishTime: '11:00', vacancies: 30, auditoriumId: 9},
  ];

  await prisma.hotel.createMany({
    data: hotelsList
  });

  for(let i = 0; i <= hotelsProps.length-1; i++) {
    for (let j = 1; j <= hotelsProps[i].floors; j++) {
      let roomNumber = 100 * j;
      for (let k = 1; k <= hotelsProps[i].roomsPerFloor; k++) {
        roomNumber = roomNumber + 1; 
        await prisma.room.create({
          data: {
            number: roomNumber,
            type: hotelsProps[i].roomsTypesPerFloor[k-1],
            hotelId: hotelsProps[i].hotelId
          }
        })
      }
    }
  }

  let rooms = await prisma.room.findMany();

  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].type === 'Single') {
      await prisma.vacancy.create({
        data: {
          roomId: rooms[i].id
        }
      });
    }
    else if (rooms[i].type === 'Double') {
      await prisma.vacancy.createMany({
        data: [
          {roomId: rooms[i].id},
          {roomId: rooms[i].id}
        ]
      });
    }
    else if (rooms[i].type === 'Triple') {
      await prisma.vacancy.createMany({
        data: [
          {roomId: rooms[i].id},
          {roomId: rooms[i].id},
          {roomId: rooms[i].id}
        ]
      });
    }
  }

  await prisma.eventday.createMany({
    data: eventDaysList
  })
  await prisma.auditorium.createMany({
    data: auditoriumList
  })
  await prisma.activity.createMany({
    data: activitiesList
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
