import Joi from 'joi';
import { CreateCardData } from './../services/cards-service';

export const createCardSchema = Joi.object<CreateCardData>({
  number: Joi.string().pattern(/^[0-9]{16}$/),
  name: Joi.string().required(),
  expiry: Joi.string().required(),
  cvc: Joi.string().min(3).max(3),
  userId: Joi.number().required(),
});
