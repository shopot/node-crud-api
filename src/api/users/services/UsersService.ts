import { validate as validateUUID } from 'uuid';

import { UsersRepository } from '../repositories/UsersRepository';
import { User } from '../model/User';
import { PutUserDto } from '../dto/PutUser.dto';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { validateCreateUserDto, validatePutUserDto } from '../user.validation';
import { Http400Error } from '../../../common/errors/Http400Error';
import { Http500Error } from '../../../common/errors/Http500Error';
import { HTTP404Error } from '../../../common/errors/Http404Error';

export class UsersService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async list(): Promise<User[]> {
    return await this.usersRepository.getUsers();
  }

  public async create(resource: CreateUserDto): Promise<User> {
    if (!validateCreateUserDto(resource)) {
      throw new Http400Error();
    }

    return await this.usersRepository.addUser(resource);
  }

  public async putById(id: string, resource: PutUserDto): Promise<User | null> {
    if (!validateUUID(id) || !validatePutUserDto(resource)) {
      throw new Http400Error();
    }

    const isUserExists = await this.usersRepository.hasUser(id);

    if (!isUserExists) {
      throw new HTTP404Error('user not exists');
    }

    return await this.usersRepository.updateUserById(id, resource);
  }

  public async readById(id: string): Promise<User | null> {
    if (!validateUUID(id)) {
      throw new Http400Error();
    }

    if (!(await this.hasUser(id))) {
      throw new Http400Error('user not exists');
    }

    return await this.usersRepository.getUserById(id);
  }

  public async deleteById(id: string): Promise<string> {
    if (!validateUUID(id)) {
      throw new Http400Error('required parameter missing or invalid: id');
    }

    if (!(await this.hasUser(id))) {
      throw new Http400Error('user not exists');
    }

    const user = await this.usersRepository.removeUserById(id);

    if (user === null) {
      throw new Http500Error();
    }

    return user.id.toString();
  }

  private async hasUser(id: string): Promise<boolean> {
    return await this.usersRepository.hasUser(id);
  }
}
