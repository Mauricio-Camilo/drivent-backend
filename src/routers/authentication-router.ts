/* eslint-disable no-console */
import { singInPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';
import axios from 'axios';
import { Router } from 'express';
import qs from 'query-string';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);
authenticationRouter.post('/login', async (req, res) => {
  try {
    const token = await exchangeCodeForAccessToken(req.body.code);
    console.log('token: ' + token);
    const user = await fetchUser(token.toString());
    res.send(user);
  } catch (err) {
    console.log('error: ' + err.response.data);
    res.sendStatus(500);
  }
});

async function exchangeCodeForAccessToken(code: string) {
  const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
  const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
  const params = {
    code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URL,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };
  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
    headers: { 'Content-Type': 'application/json' },
  });
  const parsedData = qs.parse(data);
  return parsedData.access_token;
}

async function fetchUser(token: string) {
  const response = await axios.get('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('github response backend: ' + response.data);
  return response.data;
}

export { authenticationRouter };
