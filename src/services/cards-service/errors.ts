import { ApplicationError } from '@/protocols';

export function duplicatedCardError(): ApplicationError {
  return {
    name: 'ConflictError',
    message: 'Duplicated card number',
  };
}

export function invalidCredentialsError(): ApplicationError {
  return {
    name: 'InvalidCredentialsError',
    message: 'Invalid expiry date',
  };
}

export function expiredError(): ApplicationError {
  return {
    name: 'InvalidCredentialsError',
    message: 'Card already expired',
  };
}
