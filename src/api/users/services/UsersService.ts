import { validate as validateUUID } from 'uuid';

import { User } from '../model/User';
import { PutUserDto } from '../dto/PutUser.dto';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { validateCreateUserDto, validatePutUserDto } from '../validators/users.validation';
import { Http400Error } from '../../../common/errors/Http400Error';
import { Http500Error } from '../../../common/errors/Http500Error';
import { HTTP404Error } from '../../../common/errors/Http404Error';
import { ErrorMessage } from '../../../common/errors/ErrorMessage';
import { UserRepositoryInterface } from '../repositories/UserRepositoryInterface';

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
      throw new Http400Error(ErrorMessage.INVALID_REQUEST_PAYLOAD);
    }

    return await this.usersRepository.addUser(resource);
  }

  public async putById(id: string, resource: PutUserDto): Promise<User | null> {
    if (!validateUUID(id)) {
      throw new Http400Error(ErrorMessage.INVALID_REQUEST_PARAM_ID);
    }

    if (!validatePutUserDto(resource)) {
      throw new Http400Error(ErrorMessage.INVALID_REQUEST_PAYLOAD);
    }

    if (!(await this.hasUser(id))) {
      throw new HTTP404Error(ErrorMessage.USER_NOT_EXISTS);
    }

    return await this.usersRepository.updateUserById(id, resource);
  }

  public async readById(id: string): Promise<User | null> {
    if (!validateUUID(id)) {
      throw new Http400Error(ErrorMessage.INVALID_REQUEST_PARAM_ID);
    }

    if (!(await this.hasUser(id))) {
      throw new HTTP404Error(ErrorMessage.USER_NOT_EXISTS);
    }

    return await this.usersRepository.getUserById(id);
  }

  public async deleteById(id: string): Promise<string> {
    if (!validateUUID(id)) {
      throw new Http400Error(ErrorMessage.INVALID_REQUEST_PARAM_ID);
    }

    if (!(await this.hasUser(id))) {
      throw new HTTP404Error(ErrorMessage.USER_NOT_EXISTS);
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
