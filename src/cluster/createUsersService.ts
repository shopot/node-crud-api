import { usersFactory } from '../api/users/factories/users.factory';

export const createUsersService = () => {
  return usersFactory.createService(false);
};
