import Joi from 'joi';
import { CreateTicketData } from './../services/reservations-service'

export const createReservationSchema = Joi.object<CreateTicketData>({
  userId: Joi.number().required(),
  ticket: Joi.string().required().equal('Presencial', 'Online'),
  accommodation: Joi.string().required().equal('Sem Hotel', 'Com Hotel'),
  price: Joi.number().required()
});
