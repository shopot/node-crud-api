import process from 'node:process';

import { User } from '../model/User';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { PutUserDto } from '../dto/PutUser.dto';
import { UserRepositoryInterface } from './UserRepositoryInterface';

export type ProcessMessage<T> = {
  data?: T;
  status?: number;
  message: string;
};

export const enum UserActions {
  GET_USERS = 'GET_USERS',
  GET_USER_BY_ID = 'GET_USER_BY_ID',
  ADD_USER = 'ADD_USER',
  UPDATE_USER_BY_ID = 'UPDATE_USER_BY_ID',
  REMOVE_USER_BY_ID = 'REMOVE_USER_BY_ID',
  HAS_USER = 'HAS_USER',
}

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

  public async hasUser(id: string): Promise<boolean> {
    return this.createRequest<boolean>({
      action: UserActions.HAS_USER,
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
