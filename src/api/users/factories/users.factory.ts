import { UsersRepository } from '../repositories/UsersRepository';
import { UsersService } from '../services/UsersService';
import { UserSharedRepository } from '../repositories/UserSharedRepository';

const createService = (isCluster: boolean) => {
  const userRepository = isCluster ? new UserSharedRepository() : new UsersRepository();

  return new UsersService(userRepository);
};

export const usersFactory = { createService };
