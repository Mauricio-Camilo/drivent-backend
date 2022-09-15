import { prisma } from './../../config';
import { CreateCardData } from './../../services/cards-service';

async function createCard(data: CreateCardData) {
  const card = await prisma.card.create({
    data,
  });
  return card.id;
}

async function findCardByNumber(number: string) {
  const checkNumber = await prisma.card.findFirst({ where: { number } });
  return checkNumber;
}

async function findCardById(id: number) {
  const checkCard = await prisma.card.findFirst({ where: { id } });
  return checkCard;
}

const userRepository = {
  createCard,
  findCardByNumber,
  findCardById,
};

export default userRepository;
