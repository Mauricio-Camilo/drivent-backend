import { prisma } from '@/config';

async function getEventDays() {
  const response = await prisma.eventday.findMany();
  return response;
}

async function getActivitiesByDay(id: number) {
  const response = await prisma.eventday.findMany({
    where: { id },
    select: {
      auditoriums: {
        select: {
          id: true,
          title: true,
          activity: {
            orderBy: {
              id: 'asc',
            },
            select: {
              id: true,
              title: true,
              startTime: true,
              finishTime: true,
              vacancies: true,
            },
          },
        },
      },
    },
  });
  return response;
}

async function getActivityById(id: number) {
  const response = await prisma.activity.findFirst({ where: { id } });
  return response.vacancies;
}

async function updateActivityUp(id: number) {
  await prisma.activity.update({ where: { id }, data: { vacancies: { increment: 1 } } });
}

async function updateActivityDown(id: number) {
  await prisma.activity.update({ where: { id }, data: { vacancies: { decrement: 1 } } });
}

const activitiesRepository = {
  getActivitiesByDay,
  getEventDays,
  getActivityById,
  updateActivityUp,
  updateActivityDown,
};

export default activitiesRepository;
