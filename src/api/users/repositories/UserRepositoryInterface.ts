import { User } from '../model/User';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { PutUserDto } from '../dto/PutUser.dto';

export interface UserRepositoryInterface {
  getUsers: () => Promise<User[]>;

  getUserById: (id: string) => Promise<User | null>;

  addUser: (fields: CreateUserDto) => Promise<User>;

  updateUserById: (id: string, fields: PutUserDto) => Promise<User | null>;

  removeUserById: (id: string) => Promise<User | null>;

  hasUser: (id: string) => Promise<boolean>;
}
