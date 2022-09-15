import activitiesRepository from '@/repositories/activities-repository';

async function getEventDays() {
  const eventDays = await activitiesRepository.getEventDays();
  return eventDays;
}

async function getActivities(dayId: number) {
  const activities = await activitiesRepository.getActivitiesByDay(dayId);
  activitiesServices.getLecturePeriodInMinutes(activities[0].auditoriums);
  return activities;
}

function getLecturePeriodInMinutes(allLectures: any) {
  allLectures.forEach((lecture: any) => {
    const { activity } = lecture;
    activity.forEach((singleActivity: any) => {
      const { startTime, finishTime } = singleActivity;
      const startTimeinMinutes = activitiesServices.convertTimeinMinutes(startTime);
      const finishTimeinMinutes = activitiesServices.convertTimeinMinutes(finishTime);
      const divSize = calculateDivSize(startTimeinMinutes, finishTimeinMinutes);
      singleActivity.divSize = `${divSize.toString()}px`;
    });
  });
}

function convertTimeinMinutes(startTime: string) {
  const splitTime = startTime.split(':');
  const arrayTime = splitTime.map((numero) => {
    return parseInt(numero);
  });
  const timeInMinutes = arrayTime[0] * 60 + arrayTime[1];
  return timeInMinutes;
}

function calculateDivSize(startTime: number, finishTime: number) {
  const divHeight = 80;
  const divGap = 10;
  const periodInMinutes = finishTime - startTime;
  const factor = periodInMinutes / 60;
  if (periodInMinutes > 60) return factor * divHeight + (Math.trunc(factor) - 1) * divGap;
  else return factor * divHeight;
}

async function updateVacancy(id: number, state: boolean) {
  const vacancy = await activitiesRepository.getActivityById(id);
  if (vacancy === 0) return false;
  if (state) await activitiesRepository.updateActivityUp(id);
  else await activitiesRepository.updateActivityDown(id);
  return true;
}

const activitiesServices = {
  getActivities,
  getEventDays,
  getLecturePeriodInMinutes,
  convertTimeinMinutes,
  updateVacancy,
};

export default activitiesServices;
