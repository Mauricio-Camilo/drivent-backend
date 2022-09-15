import { Router } from 'express';
import { getActivities, getAllEventDays, updateAllLectureVacancies } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter.get('/', getAllEventDays);
activitiesRouter.get('/:dayId', getActivities);
activitiesRouter.put('/', updateAllLectureVacancies);

export { activitiesRouter };
