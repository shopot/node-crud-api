import { UserRepository } from './user.repository';
import { User } from './user.entity';

export class UserService {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async create(data: User): Promise<User> {
    return this.userRepository.create(data);
  }

  async edit(data: User) {
    return this.userRepository.edit(data);
  }

  async delete(id: string) {
    return this.userRepository.deleteById(id);
  }
}
