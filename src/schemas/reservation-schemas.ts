import Joi from 'joi';

export const createReservationSchema = Joi.object({
  ticket: Joi.string().required().equal('Presencial', 'Online'),
  accommodation: Joi.string().required(),
  userId: Joi.number().required(),
  cardId: Joi.number().required(),
});
