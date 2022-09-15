import { Request, Response } from 'express';
import httpStatus from 'http-status';
import activitiesService from '@/services/activities-service';

export async function getAllEventDays(req: Request, res: Response) {
  const response = await activitiesService.getEventDays();
  res.send(response);
}

export async function getActivities(req: Request, res: Response) {
  const { dayId } = req.params;
  const response = await activitiesService.getActivities(parseInt(dayId));
  res.send(response);
}

export async function updateAllLectureVacancies(req: Request, res: Response) {
  const { id, state } = req.body;
  const querySucess = await activitiesService.updateVacancy(id, state);
  res.status(200).send(querySucess);
}
