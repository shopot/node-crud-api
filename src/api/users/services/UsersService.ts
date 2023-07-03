import { validate as validateUUID } from 'uuid';

import { UserRepositoryInterface } from '../repositories/UserRepositoryInterface';
import { User } from '../model/User';
import { PutUserDto } from '../dto/PutUser.dto';
import { validateCreateUserDto } from '../validators/validateCreateUserDto';
import { validatePutUserDto } from '../validators/validatePutUserDto';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { Http400Error } from '../../../common/errors/Http400Error';
import { Http500Error } from '../../../common/errors/Http500Error';
import { Http404Error } from '../../../common/errors/Http404Error';
import { ErrorMessage } from '../../../common/errors/ErrorMessage';

export class UsersService {
  usersRepository: UserRepositoryInterface;

  constructor(usersRepository: UserRepositoryInterface) {
    this.usersRepository = usersRepository;
  }

  public async list(): Promise<User[]> {
    return await this.usersRepository.getUsers();
  }

  public async create(resource: CreateUserDto): Promise<User> {
    if (!validateCreateUserDto(resource)) {
      throw new Http400Error();
    }

    try {
      return await this.usersRepository.addUser(resource);
    } catch {
      throw new Http500Error();
    }
  }

  public async putById(id: string, resource: PutUserDto): Promise<User | null> {
    if (!validateUUID(id)) {
      throw new Http400Error(ErrorMessage.INVALID_REQUEST_PARAM_ID);
    }

    if (!validatePutUserDto(resource)) {
      throw new Http400Error();
    }

    const user = await this.usersRepository.updateUserById(id, resource);

    if (user === null) {
      throw new Http404Error(ErrorMessage.USER_NOT_FOUND);
    }

    return user;
  }

  public async readById(id: string): Promise<User | null> {
    if (!validateUUID(id)) {
      throw new Http400Error(ErrorMessage.INVALID_REQUEST_PARAM_ID);
    }

    const user = await this.usersRepository.getUserById(id);

    if (user === null) {
      throw new Http404Error(ErrorMessage.USER_NOT_FOUND);
    }

    return user;
  }

  public async deleteById(id: string): Promise<string> {
    if (!validateUUID(id)) {
      throw new Http400Error(ErrorMessage.INVALID_REQUEST_PARAM_ID);
    }

    const user = await this.usersRepository.removeUserById(id);

    if (user === null) {
      throw new Http404Error(ErrorMessage.USER_NOT_FOUND);
    }

    return String(user.id);
  }
}
