import { UsersService } from '../api/users/services/UsersService';
import { UsersRepository } from '../api/users/repositories/UsersRepository';

const generateInstance = () => {
  const userRepository = new UsersRepository();

  return new UsersService(userRepository);
};

export const user = { generateInstance };
