/* eslint-disable no-console */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import hotelsService from '@/services/hotels-service';
import hotelsRepository from '@/repositories/hotels-repository';

export async function getHotels(_req: Request, res: Response) {
  const response = await hotelsService.getAllHotels();
  res.status(httpStatus.OK).send(response);
}

export async function getSelectedHotelRooms(req: Request, res: Response) {
  const { hotelName } = req.params;
  const response = await hotelsService.getSelectedHotelRooms(hotelName);
  res.status(httpStatus.OK).send(response[0].Rooms);
}

export async function updateRoomVacancy(req: Request, res: Response) {
  const { userId, vacancyId } = req.params;
  const { updateRoom, removeId } = req.body;
  await hotelsService.updateRoomVacancy(parseInt(userId), parseInt(vacancyId), updateRoom, removeId);
  res.sendStatus(httpStatus.OK);
}

export async function getVacanciesPerRoom(req: Request, res: Response) {
  const { vacancyId } = req.params;
  const response = await hotelsService.getVacanciesPerRoom(parseInt(vacancyId));
  res.status(200).send(response);
}

export async function getHotelReservation(req: Request, res: Response) {
  const { userId } = req.params;
  const response = await hotelsRepository.getHotelReservation(parseInt(userId));
  if (response[0].id) {
    const vacancyId = Number(response[0].id);
    const vacancies = await hotelsService.getVacanciesPerRoom(vacancyId);
    const data = {
      response: response[0],
      vacancies: vacancies,
    };
    return res.status(200).send(data);
  }
}
