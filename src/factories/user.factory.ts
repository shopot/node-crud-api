import { UserService, UserRepository } from '../api/user';

const generateInstance = () => {
  const userRepository = new UserRepository();

  return new UserService(userRepository);
};

export const user = { generateInstance };
