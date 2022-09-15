import {
  getHotels,
  getSelectedHotelRooms,
  updateRoomVacancy,
  getVacanciesPerRoom,
  getHotelReservation,
} from '@/controllers/hotels-controllers';
import { Router } from 'express';

const hotelsRouter = Router();

hotelsRouter.get('/', getHotels);
hotelsRouter.get('/:hotelName', getSelectedHotelRooms);
hotelsRouter.put('/:userId/:vacancyId', updateRoomVacancy);
hotelsRouter.get('/vacancies/:vacancyId', getVacanciesPerRoom);
hotelsRouter.get('/user/:userId', getHotelReservation);

export { hotelsRouter };
