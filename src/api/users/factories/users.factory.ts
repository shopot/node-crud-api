import { UsersRepository } from '../repositories/UsersRepository';
import { UsersService } from '../services/UsersService';

const createService = () => {
  const userRepository = new UsersRepository();

  return new UsersService(userRepository);
};

export const usersFactory = { createService };
