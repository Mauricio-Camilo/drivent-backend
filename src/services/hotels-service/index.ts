/* eslint-disable no-console */
import hotelsRepository from '@/repositories/hotels-repository';

async function getAllHotels() {
  const hotels = await hotelsRepository.getAllHotels();
  for (let i = 0; i < hotels.length; i++) {
    const freeVacancies = await hotelsRepository.getHotelVacancies(hotels[i].id);
    hotels[i].vacancies = freeVacancies;
  }
  return hotels;
}

async function getSelectedHotelRooms(hotelRecebido: string) {
  const selectedhotel = await hotelsRepository.getSelectedHotelRooms(hotelRecebido);
  selectedhotel[0].Rooms.forEach((room) => {
    let userCounter = 0;
    room.Vacancy.forEach((vacancy) => {
      if (vacancy.userId !== null) {
        userCounter++;
      }
    });
    userCounter === room.Vacancy.length ? (room.isBlocked = true) : (room.isBlocked = false);
  });
  return selectedhotel;
}

async function updateRoomVacancy(userId: number, vacancyId: number, updateStatus: boolean, removeId: number) {
  if (updateStatus) {
    await hotelsRepository.removeReservationIdAndUpdate(userId, vacancyId, removeId);
  } else {
    await hotelsRepository.fillRoomVacancy(userId, vacancyId);
  }
}

async function getVacanciesPerRoom(vacancyId: number) {
  const vacanciesPerRoom = await hotelsRepository.getVacanciesPerRoom(vacancyId);
  let vacancies = 0;
  const roomLength = vacanciesPerRoom.length;
  for (let i = 0; i < roomLength; i++) {
    if (!vacanciesPerRoom[i].userId) {
      vacancies++;
    }
  }
  const roomProps = {
    vacancies: vacancies,
    numberOfBedrooms: roomLength,
  };
  return roomProps;
}

const hotelsService = {
  getAllHotels,
  getSelectedHotelRooms,
  updateRoomVacancy,
  getVacanciesPerRoom,
};

export default hotelsService;
