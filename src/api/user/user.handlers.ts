import { HandleParams } from '../../types';
import { DEFAULT_HEADER, parseRequestUuid } from '../../util';
import { UserService } from './user.service';
import { APP_USERS_ENDPOINT } from '../../config';
import { IncomingMessage } from 'http';

const getUsers = async ({
  request,
  response,
  userService,
}: HandleParams & { userService: UserService }): Promise<void> => {
  response.writeHead(200, DEFAULT_HEADER);

  const results = await userService.find();

  response.end(JSON.stringify(results));
};

const getUserById = async ({
  request,
  response,
  userService,
}: HandleParams & { userService: UserService }): Promise<void> => {
  response.writeHead(200, DEFAULT_HEADER);

  const { url } = request as IncomingMessage;

  const id = parseRequestUuid(APP_USERS_ENDPOINT, url || '');

  const results = await userService.findById(id);

  if (results) {
  }

  response.end(JSON.stringify(results));
};

export const userHandlers = {
  getUsers,
  getUserById,
};
