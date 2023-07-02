import { usersFactory } from '../../api/users/factories/users.factory';

const createService = () => {
  return usersFactory.createService(false);
};

export const clusterFactory = { createService };
