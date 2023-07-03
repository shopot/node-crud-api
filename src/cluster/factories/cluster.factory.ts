import { usersFactory } from '../../api/users/factories/users.factory';

const createUsersService = () => {
  return usersFactory.createService(false);
};

export const clusterFactory = { createUsersService };
