import process from 'node:process';

import { User } from '../model/User';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { PutUserDto } from '../dto/PutUser.dto';
import { UserRepositoryInterface } from './UserRepositoryInterface';
import { UserActions } from '../types/UserActions';
import { ProcessMessage } from '../types/ProcessMessage';

export class UserSharedRepository implements UserRepositoryInterface {
  public async getUsers(): Promise<User[]> {
    return this.createRequest<User[]>({
      action: UserActions.GET_USERS,
    });
  }

  public async getUserById(id: string): Promise<User | null> {
    return this.createRequest<User | null>({
      action: UserActions.GET_USER_BY_ID,
      payload: { id },
    });
  }

  public async addUser(fields: CreateUserDto): Promise<User> {
    return this.createRequest<User>({
      action: UserActions.ADD_USER,
      payload: { fields },
    });
  }

  public async updateUserById(id: string, fields: PutUserDto): Promise<User | null> {
    return this.createRequest<User | null>({
      action: UserActions.UPDATE_USER_BY_ID,
      payload: { id, fields },
    });
  }

  public async removeUserById(id: string): Promise<User | null> {
    return this.createRequest<User | null>({
      action: UserActions.REMOVE_USER_BY_ID,
      payload: { id },
    });
  }

  private async createRequest<T>(action: { [key: string]: string | object }): Promise<T> {
    return new Promise((resolve, reject) => {
      process.send?.(action);

      process.once('message', (message: ProcessMessage<T>) => {
        if (message.data) {
          resolve(message.data);
        } else {
          reject(message.message);
        }
      });
    });
  }
}
