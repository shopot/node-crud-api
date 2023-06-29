import { User } from './user.entity';

export class UserRepository {
  store: User[];

  constructor() {
    this.store = [];
  }

  async find(): Promise<User[]> {
    return this.store;
  }

  async findById(id: string): Promise<User | null> {
    return this.store.find((user) => (user.id = id)) || null;
  }

  async create(data: User): Promise<User> {
    this.store.push(data);

    return data;
  }

  async edit(data: User): Promise<boolean> {
    const { id } = data;

    const editIndex = this.store.findIndex((user) => user.id === id);

    if (editIndex === -1) {
      return false;
    }

    this.store[editIndex] = { ...data };

    return true;
  }

  async deleteById(id: string): Promise<boolean> {
    const removeIndex = this.store.findIndex((user) => user.id === id);

    if (removeIndex === -1) {
      return false;
    }

    this.store.splice(removeIndex, 1);

    return true;
  }
}
