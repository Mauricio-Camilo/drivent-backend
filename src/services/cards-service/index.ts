import cardsRepository from '@/repositories/cards-repository';
import { invalidCredentialsError, expiredError, duplicatedCardError } from './errors';

export type CreateCardData = {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  userId: number;
};

async function createCard(card: CreateCardData) {
  await cardService.validateUniqueCardNumber(card.number);

  const formattedExpiryDate = await cardService.getTodaysMonthAndYear(card.expiry);

  card.expiry = formattedExpiryDate;

  const cardId = await cardsRepository.createCard(card);

  return cardId;
}

async function validateUniqueCardNumber(number: string) {
  const userWithSameCard = await cardsRepository.findCardByNumber(number);
  if (userWithSameCard) throw duplicatedCardError();
}

function getTodaysMonthAndYear(expiry: string) {
  const expiryMonth = parseInt(expiry.substring(0, 2));
  const expiryYear = parseInt(expiry.substring(2, 4));
  const today = new Date();
  const year = parseInt(today.getFullYear().toString().substring(2, 4));
  const month = today.getMonth() + 1;

  const formattedExpiryDate = cardService.validateExpiryDate(expiry, expiryMonth, expiryYear, year, month);

  return formattedExpiryDate;
}

async function validateExpiryDate(
  expiry: string,
  expiryMonth: number,
  expiryYear: number,
  year: number,
  month: number,
) {
  if (expiryMonth > 12) throw invalidCredentialsError();

  if (expiryYear < year) throw expiredError();
  else if (expiryYear === year && expiryMonth < month) throw expiredError();
  else {
    const formattedExpiryDate = expiry.substring(0, 2) + '/' + expiry.substring(2, 4);
    return formattedExpiryDate;
  }
}

const cardService = {
  createCard,
  validateUniqueCardNumber,
  getTodaysMonthAndYear,
  validateExpiryDate,
};

export default cardService;
