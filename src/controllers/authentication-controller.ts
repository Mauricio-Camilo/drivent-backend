/* eslint-disable no-console */
import authenticationService, { SignInParams } from '@/services/authentication-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  const result = await authenticationService.signIn({ email, password });
  console.log('result of authcontroller signin: ' + result);
  res.status(httpStatus.OK).send(result);
}
