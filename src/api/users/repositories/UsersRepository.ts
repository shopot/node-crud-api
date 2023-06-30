import { User } from '../model/User';
import { PutUserDto } from '../dto/PutUser.dto';
import { CreateUserDto } from '../dto/CreateUser.dto';

export class UsersRepository {
  store: User[];

  constructor() {
    this.store = [];
  }

  async getUsers(): Promise<User[]> {
    return this.store;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.store.find((user) => (user.id = id)) || null;
  }

  async addUser(fields: CreateUserDto): Promise<User> {
    const user = new User(fields);

    this.store.push(user);

    return user;
  }

  async updateUserById(id: string, fields: PutUserDto): Promise<User | null> {
    const editIndex = this.store.findIndex((user) => user.id === id);

    if (editIndex === -1) {
      return null;
    }

    this.store[editIndex] = { ...this.store[editIndex], ...fields };

    return this.store[editIndex];
  }

  async removeUserById(id: string): Promise<User | null> {
    const removeIndex = this.store.findIndex((user) => user.id === id);

    if (removeIndex === -1) {
      return null;
    }

    const removedUser = { ...this.store[removeIndex] };

    this.store.splice(removeIndex, 1);

    return removedUser;
  }
}
